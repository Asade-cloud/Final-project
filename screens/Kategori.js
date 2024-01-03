import React, { useState, useMemo } from "react";
import { Text, ScrollView, HStack, Center, Input, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard";
import datas from "../datas";
import { useEffect } from "react";
import { SearchBar } from "react-native-screens";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";


const Kategori = () => {
  const [category, setCategory] = useState('NONE');
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://10.217.21.121:8000/get-products");
        setProducts(response.data);

      } catch (error) {
        console.log("error fetching produk", error);
      }
    };
    fetchProduct();
  }, []);

  


  const filteredList = useMemo(
    () => {
      if (category === 'NONE') return products
      return products.filter(item => category === item.kategori)
    },
    [category, products]
  )

  const onClick = (category) => () => {
    setCategory(category)
  }
  return (
    <ScrollView>
      <HStack p={2} justifyContent={"space-between"} space={2}>
      

        <TouchableOpacity onPress={onClick("NONE")}>
          <Center backgroundColor={"amber.500"} height={10} p={2} borderRadius={8} shadow={3}>
            <Text color={"white"}>Semua</Text>
          </Center>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClick("Sayur Hijau")}>
          <Center backgroundColor={"amber.500"} height={10} p={2} borderRadius={8} shadow={3}>
            <Text color={"white"}>Sayur Hijau</Text>
          </Center>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClick("Bumbu Dapur")}>
          <Center backgroundColor={"amber.500"} height={10} p={2} borderRadius={8} shadow={3}>
            <Text color={"white"}>Bumbu Dapur</Text>
          </Center>
        </TouchableOpacity>

      </HStack>
      <HStack flexWrap={'wrap'} justifyContent={'space-between'} p={3}>
        {filteredList.map((category) => {
          return (
            <ProductCard category={category} key={category.id} />
          )
        })}
      </HStack>
    </ScrollView>
  );
};

export default Kategori;