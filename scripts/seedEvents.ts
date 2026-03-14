import mongoose from "mongoose";
import dotenv from "dotenv";

// Adjust path as needed based on where you run this script
dotenv.config();

const EventSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  image: String,
  overview: String,
  date: String,
  time: String,
  mode: String,
  venue: String,
  location: String,
  agenda: [String],
  audience: String,
  organizer: String,
  tags: [String],
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const seedEvents = [
  {
    title: "Web Development Workshop",
    slug: "web-development-workshop",
    description: "Learn modern web development using Next.js and Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    overview: "This is a comprehensive workshop covering React basics, Server Components, styling strategies, and deployment.",
    date: "14 April 2026",
    time: "10:00 AM - 4:00 PM",
    mode: "hybrid",
    venue: "Main Auditorium",
    location: "Campus Block A",
    agenda: ["Introduction to React", "Diving deep with Next.js", "Lunch Break", "Building the UI", "Deployment on Vercel"],
    audience: "Beginners to intermediate web devs",
    organizer: "Computer Science Dept",
    tags: ["React", "NextJS", "Tailwind", "Frontend"]
  }
];

async function runSeeder() {
  const URI = process.env.MONGODB_URI;

  if (!URI) {
    console.error("MONGODB_URI is required in your .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(URI);
    console.log("Connected to database...");
    
    for (const data of seedEvents) {
      const existing = await Event.findOne({ slug: data.slug });
      if (existing) {
        console.log(`Event ${data.slug} already exists. Skipping.`);
      } else {
        await Event.create(data);
        console.log(`Successfully created event: ${data.slug}`);
      }
    }

  } catch (error) {
    console.error("Seeding failed: ", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

runSeeder();
