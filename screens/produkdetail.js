import { Heading, Center, Text, ScrollView, Box, Image, VStack, View, Button, Pressable, HStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";


const Produkdetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));

  };
  const cart = useSelector((state) => state.cart.cart);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Box>
          <Center>
            <Image
              source={{ uri: route.params.item.image }}

              w="full"
              h="300"
              alt="imgproduk"
            />
          </Center>
        </Box>
        <VStack p={3}>
          <Heading size={"lg"}>{route.params.name}</Heading>
          <Heading fontSize="12" color="gray.400" >Harga/1kg</Heading>
          <Heading size={"md"} color={"amber.500"}>Rp.{route.params.harga}</Heading>
        </VStack>
        <VStack p={3}>
          <Box>
            <Heading size={"sm"}>Deskripsi</Heading>
            <Text>{route.params.deskripsi}</Text>
          </Box>
        </VStack>


      </ScrollView>


      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <Box p={3} >
          <Pressable
            onPress={() => addItemToCart(route.params.item)}
            borderWidth={"1"}
            p={3}
            borderRadius={20}
            backgroundColor={"green.400"}
          >
            <Center>
              {addedToCart ? (
                <Box >

                  <HStack justifyContent={"space-between"} >


                    <Text >Barang Telah Ditambahkan Kekeranjang</Text>

                  </HStack>
                </Box>
              ) : (
                <Text>Tambahkan Ke Keranjang</Text>
              )}
            </Center>
          </Pressable>
        </Box>
      </View>
    </SafeAreaView>


  );
};

export default Produkdetail;