import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

const app = express();

// database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to database"));

// middleware

// converting api req to json
app.use(express.json());
// security
app.use(cors());
// routes
app.use("/api/my/user", myUserRoute);

app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

// server
app.listen(7000, () => {
  console.log("app started at port 7000");
});
