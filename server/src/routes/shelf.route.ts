import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import { createShelf, deleteShelf, getShelf, listShelves, updateShelf } from "../controllers/shelf.controller.js";

export const shelfRoutes = Router()

shelfRoutes.use(requireAuth)

shelfRoutes.get("/", asyncHandler(listShelves))
shelfRoutes.post("/", asyncHandler(createShelf))
shelfRoutes.get("/:shelfId", asyncHandler(getShelf))
shelfRoutes.patch("/:shelfId", asyncHandler(updateShelf))
shelfRoutes.delete("/:shelfId", asyncHandler(deleteShelf))