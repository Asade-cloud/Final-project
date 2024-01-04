import { Box, HStack, Heading, Image, VStack, Text, Center } from 'native-base';
import React from 'react';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductCard = ({ category }) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("Produkdetail", { 
                        id: category._id,
                        name: category.name,
                        harga: category.harga,
                        deskripsi: category.deskripsi,
                        image: category.image,
                        category: category
                    })
                }
            >
                <Box h="280" w="180" backgroundColor="white" rounded="md" shadow={5} borderWidth={2}>
                    <Center w="full" h="40" rounded="md" shadow={3} >
                        <Image source={{ uri: category.image }}
                            size="full"
                            alt="img"
                            rounded="md"

                        />
                    </Center>
                    <Box p={2}>
                        <Text fontSize={20}>{category.nama}</Text>
                        <Text color="amber.300">Rp.{category.harga}/Kg</Text>

                    </Box>

                </Box>


            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProductCard