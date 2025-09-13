import express from "express";
import * as ApiController from "../controllers/apiController.js";

const router = express.Router();

router.get("/health", ApiController.getHealth);

router.get("/favorites/:userId", ApiController.getFavorites);

router.post("/favorites", ApiController.addFavorite);

router.delete("/favorites/:userId/:recipeId", ApiController.deleteFavorite);

export default router;
