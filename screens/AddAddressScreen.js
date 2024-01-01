import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Box, HStack, VStack } from "native-base";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress,setSelectedAdress] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.6:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Alamat Kamu</Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>


      
        <Pressable>
          {/* all the added adresses */}
          {addresses?.map((item, index) => (
             <Box backgroundColor={"green.300"} h={"120"} w={"full"} key={index} marginTop={3}>
               <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <Ionicons name="ellipse-outline" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAdress(item)}
                    name="circle"
                    size={20}
                    color="black"
                  />
                )}
               <HStack>
                 <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                   {item.name}
                 </Text>
                 <Entypo name="location-pin" size={24} color="red" />
               </HStack>
                 <VStack>
                 <Text style={{ fontSize: 15, color: "#181818" }}>
                   {item.noRumah}
                 </Text>
   
                 <Text style={{ fontSize: 15, color: "#181818" }}>
                   {item.jalan}
                 </Text>
   
                 <Text style={{ fontSize: 15, color: "#181818" }}>
                  No HP : {item.noHp}
                 </Text>
                 <Text style={{ fontSize: 15, color: "#181818" }}>
                   pin code : {item.kodePos}
                 </Text>
                 </VStack>
             </Pressable>
           </Box>
   
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});