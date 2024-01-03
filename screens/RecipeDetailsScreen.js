import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  HStack,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const RecipeDetailsScreen = ({ route }) => {
  const { item } = route.params || {};

  return (
    <SafeAreaView bg={item.color} flex={1}>
      <View
        bg="#fff"
        flex={1}
        mt={140}
        borderTopLeftRadius={56}
        borderTopRightRadius={56}
        alignItems="center"
        px={4}
      >
        <Image
          source={item.image}
          alt="recipe-image"
          w={300}
          h={300}
          resizeMode="contain"
          mt={-150}
        />
        <Text fontSize={28} fontWeight="bold" mt={150}>
          {item.name}
        </Text>

        <ScrollView>
          <Text fontSize={20} my={4}>
            {item.description}
          </Text>

          <HStack justifyContent="space-between">
            <VStack
              bg="rgba(255, 0, 0, 0.38)"
              py={8}
              borderRadius={8}
              alignItems="center"
              width={100}
              mr={2}
            >
              <Text fontSize={40}>⏰</Text>
              <Text fontSize={20} fontWeight="400">
                {item.time}
              </Text>
            </VStack>
            <VStack
              bg="rgba(135, 206, 235, 0.8)"
              py={8}
              borderRadius={8}
              alignItems="center"
              width={100}
              mx={2}
            >
              <Text fontSize={40}>🥣</Text>
              <Text fontSize={20} fontWeight="400">
                {item.difficulty}
              </Text>
            </VStack>
            <VStack
              bg="rgba(255, 165, 0, 0.48)"
              py={8}
              borderRadius={8}
              alignItems="center"
              width={100}
              ml={2}
            >
              <Text fontSize={40}>👨‍👨‍👦‍👦</Text>
              <Text fontSize={20} fontWeight="400">
                {item.portion}
              </Text>
            </VStack>
          </HStack>

          <VStack alignSelf="flex-start" my={6}>
            <Text fontSize={22} fontWeight="600" mb={2}>
              Ingredients:
            </Text>
            {item.ingredients.map((ingredient, index) => (
              <HStack alignItems="center" my={2} key={index}>
                <View
                  bg="red.500"
                  h={2}
                  w={2}
                  borderRadius="full"
                  mr={2}
                ></View>
                <Text fontSize={18}>{ingredient}</Text>
              </HStack>
            ))}
          </VStack>

          <VStack alignSelf="flex-start" my={6}>
            <Text fontSize={22} fontWeight="600" mb={2}>
              Steps:
            </Text>
            {item.steps.map((step, index) => (
              <Text fontSize={18} mb={2} key={index}>
                {`${index + 1}) ${step}`}
              </Text>
            ))}
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RecipeDetailsScreen;