import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Box, Heading, ScrollView, VStack, Center, Image, HStack, Button, Pressable, Text } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'


const Cartscreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total =
    cart.map((item) => item.harga * item.quantity)
      .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center>
        <Text fontSize={30}>Keranjang</Text>
      </Center>
      {cart.length <= 0 ? (
        <Heading px={3} paddingTop={5}>Keranjang anda masih kosong</Heading>
      ) : (
        <Heading px={3} paddingTop={5}>Pesanan </Heading>
      )}
      <Center>
      </Center>
      <View>
        {cart.map((item, index) => (
          <HStack key={index} paddingTop={3}>
            <Box w={40} h="100" backgroundColor={"white"} px={3} borderWidth={3} rounded={20}
              marginLeft={3}
            >
              <Center>
                <Image
                  source={{ uri: item.image }}
                  w="full"
                  h={"full"}
                  alt="Image Data"
                />
              </Center>
            </Box>
            <VStack px={3}>
              <Text fontSize={25}>{item.name}</Text>
              <Text>Rp.{item.harga} </Text>
              <Box h={"20"} w={"40"}>
                <HStack alignItems={"center"} justifyContent={"space-between"} p={3}>
                  <Pressable onPress={() => deleteItem(item)}>
                    < Ionicons name="trash" size={25}
                    ></ Ionicons>
                  </Pressable>
                  <Pressable onPress={() => decreaseQuantity(item)} >
                    < Ionicons name="remove-circle" size={25}
                    ></ Ionicons>
                  </Pressable>
                  <Text size={25}>{item.quantity}</Text>
                  <Pressable onPress={() => increaseQuantity(item)}>
                    < Ionicons name="add-circle" size={25}
                    ></ Ionicons>
                  </Pressable>

                </HStack>
              </Box>
            </VStack>
          </HStack>
        ))}
      </View>

      {cart.length <= 0 ? (
        <Text p={25}></Text>
      ) : (
        <VStack p={3} >
          <Heading>Detail Pembayaran</Heading>
          <HStack justifyContent={"space-between"}>
            <Text>Total Harga</Text>
            <Text>Rp.{total}</Text>
          </HStack>
        </VStack>
      )}
      {cart.length <= 0 ? (
        <Text p={25}></Text>
      ) : (

        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <Box p={3} >
            <Button rounded={40} backgroundColor={"green.400"} onPress={() =>
              navigation.navigate("Pembayaran")
            }>
              <Heading size={"sm"} p={5}>Checkout {cart.length} Item

              </Heading>

            </Button>
          </Box>
        </View>
      )}


    </SafeAreaView>
  )
}

export default Cartscreen

const styles = StyleSheet.create({})