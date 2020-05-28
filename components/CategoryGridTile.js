import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback } from "react-native";

const CategoryGridTile = (props) => {
	const { title, onSelect, color } = props;
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<View style={styles.gridItem}>
			<TouchableCmp style={{ flex: 1 }} onPress={onSelect}>
				<View style={{ ...styles.container, ...{ backgroundColor: color } }}>
					<Text style={styles.title} numberOfLines={2}>
						{title}
					</Text>
				</View>
			</TouchableCmp>
		</View>
	);
};

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 15,
		height: 150,
		borderRadius: 10,
		overflow: Platform.OS === 'android' ? "hidden" : 'visible',
	},
	container: {
		flex: 1,
		borderRadius: 10,
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 10,
		elevation: 3,
		padding: 15,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		textAlign: "right",
	},
});

export default CategoryGridTile;
