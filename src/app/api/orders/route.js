import { authOptions, isAdmin } from "../auth/[...nextauth]/route.js";
import { Order } from "../models/Order.js";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
// after payment we have to show user his order so this is for his route
export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();


  // with this we can do query and get id from url
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id")
  if (_id) {
    return Response.json(await Order.findById(_id));
  }





  if (admin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}
