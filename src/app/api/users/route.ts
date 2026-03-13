import { NextResponse } from "next/server"
import { User } from "@/models/user.models"
import ConnectDB from "@/db/db"

export const GET = async () => {
  try {
    await ConnectDB()

    const users = await User.find()

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    )
  }
}

export const POST = async (req: Request) => {
  try {
    await ConnectDB()

    const body = await req.json()

    const { username, email, year, mobileno, idno, github, department } = body

    const newUser = await User.create({
      username,
      email,
      year,
      mobileno,
      idno,
      github,
      department,
    })

    return NextResponse.json(
      { message: "User created", data: newUser },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
}

export const PUT = async (req: Request) => {
  try {
    await ConnectDB()

    const body = await req.json()

    const { id, ...data } = body

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: Request) => {
  try {
    await ConnectDB()

    const body = await req.json()

    const { id } = body

    await User.findByIdAndDelete(id)

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    )
  }
}