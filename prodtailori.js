import { Heading, Center, Text, ScrollView, Box, Image, VStack, View,Button, Pressable } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";


const Produkdetail = ({ route }) => {
  // Get the params
  const params = route.params.item;

  const navigation = useNavigation
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch;
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Box>
          <Center>
            <Image source={{ uri: params.image }}
              w="full"
              h="300"
              alt="imgproduk"
            />
          </Center>
        </Box>
        <VStack p={3}>
          <Heading size={"lg"}>{params.nama}</Heading>
          <Heading fontSize="12" color="gray.400" >Harga/1kg</Heading>
          <Heading size={"md"} color={"amber.500"}>Rp.{params.harga}</Heading>
        </VStack>
        <VStack p={3}>
          <Box>
            <Heading size={"sm"}>Deskripsi</Heading>
            <Text>{params.deskripsi}</Text>
          </Box>
        </VStack>
        <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      </ScrollView>
     
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
      <Box p={3} >
            <Button rounded={30} onPress={() => addItemToCart(route?.params?.item)}>
                <Heading size={"sm"} p={5}>Tambahkan Ke Keranjang

                </Heading>

            </Button>
        </Box>
      </View>
    </SafeAreaView>


  );
};

export default Produkdetail;