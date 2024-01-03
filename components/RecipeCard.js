import React from "react";
import {
  FlatList,
  View,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Text, HStack } from "native-base";
import { recipeList , colors} from "./Constant";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
    <FlatList
      data={recipeList}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate("RecipeDetail", { item: item })
          }
          style={{
            backgroundColor: colors.COLOR_LIGHT,
            borderRadius: 16,
            marginVertical: 16,
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 26,
          }}
        >
          <Image
            source={item.image}
            style={{ width: 150, height: 150, resizeMode: "center" }}
          />
          <Text>{item.name}</Text>
          <HStack marginTop={2}>
            <Text>{item.time}</Text>
            <Text mx={1}>|</Text>
            <HStack>
              <Text mr={1}>{item.rating}</Text>
              <FontAwesome
                name="star"
                size={16}
                color={colors.COLOR_PRIMARY}
              />
            </HStack>
          </HStack>
        </Pressable>
      )}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
    />
  </SafeAreaView>
  );
};

export default RecipeCard;