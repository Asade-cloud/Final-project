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
                `http://192.168.100.114:8000/orders/${userId}`
            );
            const { orders } = response.data;
            setOrders(orders);

            console.log(orders)
        } catch (error) {
            console.log("error", error);
        }
    };


    return (
        <SafeAreaView>

            <Text>asdasd</Text>
            <Box py={"4"} p={3} >
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {orders
                        .map((item, index) => {
                            return (
                                <TouchableOpacity
                                    item={item}
                                    activeOpacity={0.5}
                                    key={index}
                                >
                                    <Box borderWidth={"1"} rounded={20} p={3} w={"250"} mr={"4"} h={"150"} >
                                        <Box backgroundColor={"amber.200"} h={'70'} w={"full"} >
                                            <Center>
                                                <Image
                                                    source={{ uri: item.products }}
                                                    w="full"
                                                    h={"full"}
                                                    alt="Image Data"
                                                />

                                            </Center>
                                        </Box>
                                        <Text fontSize={"xs"}>
                                            Rp.
                                            {item.totalPrice}
                                        </Text>
                                        <Heading
                                            fontSize={"sm"}
                                            lineHeight={"xs"}
                                        >
                                            {item.shippingAddress.name}
                                        </Heading>
                                    </Box>
                                </TouchableOpacity>

                            );
                        })}
                </ScrollView>
            </Box>
        </SafeAreaView>
    )
}

export default Order

const styles = StyleSheet.create({})