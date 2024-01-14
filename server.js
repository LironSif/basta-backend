import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

app.use(cors());
// app.use(cors({
//   origin: "link"
// })); // Solving cors
app.use(express.json()); // Body parser middleware

// User Routes - create user, get users , update user status
app.use("/api/v1/users", usersRoutes);

// Item routes
app.use("/api/v1/items", itemRoutes);

app.use(errorHandler); // Error handler middleware

const PORT = process.env.PORT || 3000; // takes port from .env or just put 3000

connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})
