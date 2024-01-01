import { StyleSheet, View } from 'react-native'
import { Box, TouchableOpacity, Text, Heading, Pressable, Center, HStack } from 'native-base'
import { ScrollView } from 'native-base'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../redux/CartReducer';
import { decrementQuantity, incrementQuantity } from "../redux/ProductReducer";

const MenuItem = (item) => {

    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        dispatch(addToCart(item)); // cart array being used
        dispatch(incrementQuantity(item)); // product array being used
    };
    const cart = useSelector((state) => state.cart.cart);
    return (
        <View>

        <TouchableOpacity
            item={item}
            key={index}
            activeOpacity={0.5}
            onPress={() =>
                navigation.navigate("Produkdetail", {
                    id: item._id,
                    name: item.name,
                    harga: item.harga,
                    deskripsi: item.deskripsi,
                    item: item,

                })
            }
        >
            <Box borderWidth={"1"} rounded={20} p={3} w={"250"} mr={"4"} h={"150"} >


                <Text fontSize={"xs"}>
                    Rp.
                    {item.harga}
                </Text>
                <Heading
                    fontSize={"sm"}
                    lineHeight={"xs"}
                >
                    {item.name}
                </Heading>
                <Pressable
                    onPress={() => addItemToCart(item)}
                    borderWidth={"1"}
                    p={3}
                    backgroundColor={"amber.100"}
                >
                    <Center>
                        {cart.some((valu) => valu._id === item._id) ? (
                            <Box >

                                <HStack justifyContent={"space-between"} >


                                    <Text >{item.quantity}</Text>

                                </HStack>
                            </Box>
                        ) : (
                            <Text>Tambahkan Ke Keranjang</Text>
                        )}
                    </Center>
                </Pressable>
            </Box>
        </TouchableOpacity>
        </View>
    )
}

export default MenuItem

const styles = StyleSheet.create({})