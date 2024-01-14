import express from "express";
import { createUser, getAllUsers, updateUser, updateLocation, navigation } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.patch("/:id", updateLocation);

router.post('/location', navigation);

export default router;
