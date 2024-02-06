import mongoose from "mongoose";
import { MenuItem } from "../models/MenuItem.js";
import { isAdmin } from "../auth/[...nextauth]/route.js";

// POST
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  if (isAdmin()) {
    const newMenuItem = await MenuItem.create(data);
    return Response.json(newMenuItem);
  } else {
    Response.json({});
  }
}

// UPDATE
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

// GET
export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  return Response.json(
    await MenuItem.find()
    );
}

// DELETE
export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (isAdmin()) {
    await MenuItem.deleteOne({ _id });
  }
  return Response.json(true);
}
