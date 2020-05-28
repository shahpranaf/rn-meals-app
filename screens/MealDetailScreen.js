import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Image, Text, Button, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";

import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealDetailScreen = (props) => {
	const mealId = props.navigation.getParam("mealId");
	const availableMeals = useSelector((state) => state.meals.meals);
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

	const dispatch = useDispatch();

	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(mealId));
	}, [dispatch, mealId]);

	useEffect(() => {
		/* this method loads after component loads. So header loads a bit late */
		//props.navigation.setParams({mealTitle: selectedMeal.title})
		props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
	}, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal.ingredients.map((ingredient) => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map((step) => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	);
};

MealDetailScreen.navigationOptions = (navigationData) => {
	const mealId = navigationData.navigation.getParam("mealId");
	const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const isFav = navigationData.navigation.getParam("isFav");

	return {
		headerTitle: mealTitle,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName={isFav ? "ios-star" : "ios-star-outline" }
					onPress={toggleFav}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 200,
	},
	details: {
		flexDirection: "row",
		padding: 15,
		justifyContent: "space-around",
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		textAlign: "center",
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 10,
	},
});

export default MealDetailScreen;
