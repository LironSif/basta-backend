import express from "express";
import { createItem, getAllItems, updateItem, deleteItem} from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItem);

router.get("/", getAllItems);

router.patch("/:id", updateItem);

router.delete("/:id",deleteItem);

export default router;
