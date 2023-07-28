import { MEALS } from "../data/dummy-data";
import { useContext } from "react";
import MealsList from "../components/mealsList/MealsList";
import { FavoritesContext } from "../store/context/Favorites-Context";

const FavoriteScreen = () => {
  const FavoritesMealsContext = useContext(FavoritesContext);
  const FavoriteMeals = MEALS.filter((meal) =>
    FavoritesMealsContext.ids.includes(meal.id)
  );

  return <MealsList items={FavoriteMeals} />;
};

export default FavoriteScreen;
