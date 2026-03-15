// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.models";
import ConnectDB from "@/db/db";
import { userSchema, userUpdateSchema } from "@/schema/user.schema";


// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Parse and validate query parameters for pagination
 */
function getPaginationParams(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20"))); // Cap at 100
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Parse and validate sort parameters
 */
function getSortParams(searchParams: URLSearchParams): Record<string, 1 | -1> {
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

  // Whitelist allowed sort fields for security
  const allowedSortFields = ["username", "email", "year", "department", "createdAt", "updatedAt"];
  const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  return { [safeSortBy]: sortOrder as 1 | -1 };
}

/**
 * Build search/filter query
 */
function buildFilterQuery(searchParams: URLSearchParams) {
  const filter: any = {};

  // Search by text (username, email, department)
  const search = searchParams.get("search");
  if (search) {
    filter.$or = [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { department: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by year
  const year = searchParams.get("year");
  if (year) {
    const yearNum = parseInt(year);
    if (!isNaN(yearNum)) {
      filter.year = yearNum;
    }
  }

  // Filter by department
  const department = searchParams.get("department");
  if (department) {
    filter.department = { $regex: department, $options: "i" };
  }

  return filter;
}

/**
 * Format error response
 */
function errorResponse(message: string, status: number = 500, details?: any) {
  const response: any = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (details && process.env.NODE_ENV === "development") {
    response.details = details;
  }

  return NextResponse.json(response, { status });
}

/**
 * Format success response
 */
function successResponse(data: any, status: number = 200, meta?: any) {
  const response: any = {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };

  if (meta) {
    response.meta = meta;
  }

  return NextResponse.json(response, { status });
}

// ============================================
// GET - List Users with Pagination & Filtering
// ============================================

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(req.url);

    // Parse pagination
    const { page, limit, skip } = getPaginationParams(searchParams);

    // Parse sorting
    const sort = getSortParams(searchParams);

    // Build filter query
    const filter = buildFilterQuery(searchParams);

    // Get total count for pagination metadata
    const totalCount = await User.countDocuments(filter);

    // Fetch users with pagination, filtering, and sorting
    // Use lean() for better performance (returns plain JS objects)
    // Select only necessary fields (exclude sensitive data if any)
    const users = await User.find(filter)
      .select("-__v") // Exclude version key
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return successResponse(users, 200, {
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage,
      },
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      sort,
    });

  } catch (error: any) {
    console.error("GET /api/users error:", error);
    return errorResponse(
      "Failed to fetch users",
      500,
      error.message
    );
  }
}

// ============================================
// POST - Create New User
// ============================================

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const body = await req.json();

    // Validate request body with Zod
    const validationResult = userSchema.safeParse(body);

    if (!validationResult.success) {
      return errorResponse(
        "Validation failed",
        400,
        validationResult.error.format()
      );
    }

    const userData = validationResult.data;

    // Check for existing user with same email or idno
    const existingUser = await User.findOne({
      $or: [
        { email: userData.email },
        { idno: userData.idno },
        { username: userData.username }
      ]
    }).lean();

    if (existingUser) {
      if (existingUser.email === userData.email) {
        return errorResponse("A user with this email already exists", 409);
      }
      if (existingUser.idno === userData.idno) {
        return errorResponse("A user with this ID number already exists", 409);
      }
      if (existingUser.username === userData.username) {
        return errorResponse("This username is already taken", 409);
      }
    }

    // Create new user
    const newUser = await User.create(userData);

    // Remove sensitive fields from response if needed
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      year: newUser.year,
      department: newUser.department,
      createdAt: newUser.createdAt,
    };

    return successResponse(
      userResponse,
      201,
      { message: "User created successfully" }
    );

  } catch (error: any) {
    console.error("POST /api/users error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return errorResponse(
        `A user with this ${field} already exists`,
        409
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      return errorResponse(
        "Validation failed",
        400,
        error.errors
      );
    }

    return errorResponse(
      "Failed to create user",
      500,
      error.message
    );
  }
}

// ============================================
// PUT - Update User (Not RESTful - should be PATCH)
// ============================================

export async function PUT(req: NextRequest) {
  try {
    await ConnectDB();

    const body = await req.json();

    // Validate that ID is provided
    if (!body.id) {
      return errorResponse("User ID is required", 400);
    }

    const { id, ...updateData } = body;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return errorResponse("Invalid user ID format", 400);
    }

    // Validate update data with partial schema
    const validationResult = userUpdateSchema.safeParse(updateData);

    if (!validationResult.success) {
      return errorResponse(
        "Validation failed",
        400,
        validationResult.error.format()
      );
    }

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return errorResponse("User not found", 404);
    }

    // Check for duplicate email/username/idno if they're being updated
    if (updateData.email || updateData.username || updateData.idno) {
      const duplicateCheck: any = { _id: { $ne: id } };
      const orConditions = [];

      if (updateData.email) orConditions.push({ email: updateData.email });
      if (updateData.username) orConditions.push({ username: updateData.username });
      if (updateData.idno) orConditions.push({ idno: updateData.idno });

      if (orConditions.length > 0) {
        duplicateCheck.$or = orConditions;

        const duplicate = await User.findOne(duplicateCheck).lean();
        if (duplicate) {
          if (duplicate.email === updateData.email) {
            return errorResponse("This email is already in use", 409);
          }
          if (duplicate.username === updateData.username) {
            return errorResponse("This username is already taken", 409);
          }
          if (duplicate.idno === updateData.idno) {
            return errorResponse("This ID number is already in use", 409);
          }
        }
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      validationResult.data,
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    ).select("-__v");

    if (!updatedUser) {
      return errorResponse("User not found", 404);
    }

    return successResponse(
      updatedUser,
      200,
      { message: "User updated successfully" }
    );

  } catch (error: any) {
    console.error("PUT /api/users error:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return errorResponse(
        `A user with this ${field} already exists`,
        409
      );
    }

    if (error.name === "ValidationError") {
      return errorResponse(
        "Validation failed",
        400,
        error.errors
      );
    }

    if (error.name === "CastError") {
      return errorResponse("Invalid user ID", 400);
    }

    return errorResponse(
      "Failed to update user",
      500,
      error.message
    );
  }
}

// ============================================
// DELETE - Delete User
// ============================================

export async function DELETE(req: NextRequest) {
  try {
    await ConnectDB();

    const body = await req.json();

    if (!body.id) {
      return errorResponse("User ID is required", 400);
    }

    const { id } = body;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return errorResponse("Invalid user ID format", 400);
    }

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return errorResponse("User not found", 404);
    }

    // Delete user
    await User.findByIdAndDelete(id);

    return successResponse(
      { id },
      200,
      { message: "User deleted successfully" }
    );

  } catch (error: any) {
    console.error("DELETE /api/users error:", error);

    if (error.name === "CastError") {
      return errorResponse("Invalid user ID", 400);
    }

    return errorResponse(
      "Failed to delete user",
      500,
      error.message
    );
  }
}