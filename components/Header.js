import { Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Header = ({ headerText }) => {
	return (
		<View style={{ flexDirection: "row" }}>
			<Text style={{ flex: 2, fontSize: 30, fontWeight: "700" }}>
				{headerText}
			</Text>
		</View>
	);
};

export default Header;