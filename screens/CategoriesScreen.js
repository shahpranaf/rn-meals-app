import React from "react";
import { StyleSheet, View, Text, Button, FlatList, Platform } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";
import CategoryGridTile from "../components/CategoryGridTile";

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = (props) => {
	const renderGridItem = (itemData) => {
		const { title, id, color } = itemData.item;
		return (
			<CategoryGridTile
				title={title}
				color={color}
				onSelect={() => props.navigation.navigate("CategoryMeal", { categoryId: id })}
			/>
		);
	};

	return <FlatList numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />;
};

CategoriesScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Meal Categories",
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
});

export default CategoriesScreen;
