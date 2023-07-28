import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { useLayoutEffect, useContext } from "react";
import { MEALS } from "../data/dummy-data";
import MealDetail from "../components/MealDetail";
import Subtitle from "../components/aboutMeal/Subtitle";
import List from "../components/aboutMeal/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/Favorites-Context";

const MealDetailScreen = ({ route, navigation }) => {
  const FavoritesMealsContext = useContext(FavoritesContext);
  console.log(FavoritesContext);

  const mealId = route.params.mealId;
  const selectedMeals = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = FavoritesMealsContext.ids.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      FavoritesMealsContext.removeFavorite(mealId);
    } else {
      FavoritesMealsContext.addFavorite(mealId);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color={"white"}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeals.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeals.title}</Text>
      <MealDetail
        duration={selectedMeals.duration}
        affordability={selectedMeals.affordability}
        complexity={selectedMeals.complexity}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeals.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeals.steps}></List>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },

  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "#254038",
  },
  detailText: {
    color: "#254038",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});

export default MealDetailScreen;
