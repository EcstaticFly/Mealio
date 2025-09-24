import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { MealAPI } from "../../services/mealAPI";

const HomeScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [apiCategories, randomMeals, featuredMeals] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);
      const transformedCategories = apiCategories.map((cat, i) => ({
        id: i + 1,
        name: cat.strCategory,
        image: cat.strCategoryThumb,
        description: cat.strCategoryDescription,
      }));

      setCategories(transformedCategories);

      const transformedMeals = randomMeals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => meal !== null);

      setRecipes(transformedMeals);

      const transformedFeatured = MealAPI.transformMealData(featuredMeals);
      setFeaturedRecipe(transformedFeatured);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals
        .map((meal) => MealAPI.transformMealData(meal))
        .filter((meal) => meal !== null);
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error loading category data:", error);
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
