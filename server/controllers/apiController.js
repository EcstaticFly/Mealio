import { and, eq } from "drizzle-orm";
import { db } from "../configs/db.js";
import { favoritesTable } from "../db/schema.js";

export const getHealth = (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
};

export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ status: "FAILED", error: "Missing required fields" });
    }
    const userFavorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json({ status: "SUCCESS", userFavorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ status: "FAILED", error: "Internal Server Error" });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;
    if (!userId || !recipeId || !title) {
      return res
        .status(400)
        .json({ status: "FAILED", error: "Missing required fields" });
    }
    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning();

    res.status(201).json({ status: "SUCCESS", newFavorite: newFavorite[0] });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ status: "FAILED", error: "Internal Server Error" });
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, parseInt(recipeId))
        )
      );

    res
      .status(200)
      .json({ status: "SUCCESS", message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing a favorite:", error);
    res.status(500).json({ status: "FAILED", error: "Internal Server Error" });
  }
};
