import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";

/* CONNECT TO DATABASE */
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to database!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* CONFIGURATIONS */
const app = express();
app.use(cors());

app.use(express.json());
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

/* ROUTES */
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);

/* RUN SERVER ON PORT 7000 */
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log("Server started on localhost:7000");
});
