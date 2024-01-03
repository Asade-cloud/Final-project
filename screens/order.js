import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Box, Center, HStack, VStack, Heading } from 'native-base'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { UserType } from '../UserContext'
import { Image } from 'native-base'



const Order = () => {
    const { userId, setUserId } = useContext(UserType);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrder();
    }, []);
    const fetchOrder = async () => {
        try {
            const response = await axios.get(
                `http://10.214.120.94:8000/orders/${userId}`
            );
            const orders = response.data.orders;
            setOrders(orders);
        } catch (error) {
            console.log("error", error);
        }
    };


    return (
        <ScrollView>
            <SafeAreaView>
                {orders.length <= 0 ? (
                    <Heading>Order Kosong</Heading>
                ) : (
                    <Box p={3} >
                        {orders
                            .map((order, index) => {
                                return (
                                    <Box w={"full"} h={200} p={3} borderWidth={1} borderRadius={20} >
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            key={index}
                                        >
                                            <HStack justifyContent={"space-between"}>
                                                <Text>
                                                    {order.shippingAddress.name}
                                                </Text>

                                                <Text>.</Text>
                                            </HStack>
                                            {order.products.slice(0, 1).map((product) => (
                                                <HStack paddingTop={3} key={product._id}>
                                                    <Box backgroundColor={"amber.200"} w={"40"} >
                                                        <Box backgroundColor={"amber.200"} h={"100"}  >
                                                            <Center>
                                                                <Image
                                                                    source={{ uri: product.image }}
                                                                    w="full"
                                                                    h={"100"}
                                                                    alt="Image Data"
                                                                />
                                                            </Center>
                                                        </Box>
                                                    </Box >
                                                    <Box paddingLeft={3}>
                                                        <Text>{product.name}</Text>
                                                        <Text> Jumlah : {product.quantity}</Text>
                                                    </Box>
                                                </HStack>
                                            ))}
                                            <Box>
                                                <Text>Total Pesanan : Rp.{order.totalPrice}</Text>

                                            </Box>

                                        </TouchableOpacity>

                                    </Box>
                                );
                            })}
                    </Box>
                )}



            </SafeAreaView>
        </ScrollView>
    )
}

export default Order

const styles = StyleSheet.create({})