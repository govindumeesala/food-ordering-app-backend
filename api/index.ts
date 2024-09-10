import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "../src/routes/MyUserRoute";
import myRestaurantRoute from "../src/routes/MyRestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import restaurantRoute from "../src/routes/RestaurantRoute";
import orderRoute from "../src/routes/OrderRoute";

const app = express();

// Database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Database connection error:", error));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware

// Security
app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

// Converting API requests to JSON
app.use(express.json());

// Routes
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

// Export the app as a Vercel serverless function handler
export default app;
