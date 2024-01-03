import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Icon } from 'native-base';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';



    const Search = () => {
        const [key, setKey] = useState("");
        const [products, setProducts] = useState([]);
        const [searchResult, setSearchResult] = useState([]);
    
        useEffect(() => {
            const search = async () => {
              try {
                if(!key.trim()){
                    setSearchResult([])
                    return
                }
                const response = await axios.get("http://192.168.0.50:8000/get-products",{params:{key,limit:5}});
                console.log(response)
            } catch (error) {
                console.log("error fetching produk", error);
              }
            };
            search();
          }, [key]);





    return (
        <View>
            <Text>Search</Text>
            <Input placeholder="Search" variant="filled" width="100%"
                borderRadius="10" py="1" px="2"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                InputLeftElement={
                    <Icon ml="2" size="4" color="gray.400"
                        as={<Ionicons name="ios-search" />}
                    />} />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})