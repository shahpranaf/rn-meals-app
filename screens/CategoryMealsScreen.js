import React from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import {useSelector} from 'react-redux';
import MealList from "../components/MealList";

const CategoryMealsScreen = (props) => {
	const catId = props.navigation.getParam("categoryId");
	const availableMeals = useSelector(state => state.meals.filteredMeals);
	const displayedMeals = availableMeals.filter((meal) => meal.categoryIds.indexOf(catId) !== -1);

	const renderMealItem = (itemData) => {
		const { title, imageUrl, duration, complexity, affordability, id } = itemData.item;

		return (
			<MealList listData={displayedMeals} navigation={props.navigation} />
			// <MealItem
			// 	title={title}
			// 	image={imageUrl}
			// 	duration={duration}
			// 	complexity={complexity}
			// 	affordability={affordability}
			// 	onSelectMeal={() => props.navigation.navigate("MealDetail", { mealId: id, mealTitle: title })}
			// />
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList data={displayedMeals} renderItem={renderMealItem} />
		</View>
	);
};

CategoryMealsScreen.navigationOptions = ({ navigation }) => {
	const catId = navigation.getParam("categoryId");

	return {
		headerTitle: CATEGORIES.find((cat) => cat.id === catId).title,
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default CategoryMealsScreen;
