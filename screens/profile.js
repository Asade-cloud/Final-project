import { Heading, Image, Text, HStack, VStack, Avatar } from "native-base";
import { Box, ScrollView, Input, Icon, Pressable, Button } from "native-base";
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import "core-js/stable/atob"
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";


const Profile = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.50:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView>
      <HStack p={3}>
        <Avatar bg="green.500"
          size="2xl"
          alignSelf="center"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }}>
        </Avatar>
        <VStack p={5}>
          <Heading>{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </VStack>

      </HStack>
      <Box w="100%" h={20} backgroundColor="amber.200" p={3} marginTop={8}>
        <Heading>Edit Profile</Heading>
        <HStack justifyContent={"space-between"}>
          <Text>Ubah Nama, Kata Sandi, Email</Text>
          < Ionicons
            onPress={() =>
              navigation.navigate("Editprofil", {
                id: user._id,
                name: user.name,
                email: user.email

              })
            }
            name="arrow-forward" ></ Ionicons>
        </HStack>
      </Box>
      <Box w="100%" h={20}  p={3} marginTop={8}>
        <HStack justifyContent={"space-between"}>
        <Heading>FAQ</Heading>
          <TouchableOpacity
          onPress={() =>
            navigation.navigate("Faq")
          }>

          < Ionicons
            name="arrow-forward" ></ Ionicons>
          </TouchableOpacity>
        </HStack>
      </Box>
      <Box w="100%" h={20} backgroundColor="amber.200" p={3} marginTop={8}>
        <HStack justifyContent={"space-between"}>
        <Heading>About Us</Heading>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("About")
          }>

          < Ionicons
            name="arrow-forward" ></ Ionicons>
          </TouchableOpacity>
        </HStack>
      </Box>
      <Box w="100%" h={20} backgroundColor="amber.200" p={3} marginTop={8}>
        <HStack justifyContent={"space-between"}>
          <Pressable
            onPress={logout}
            style={{
              padding: 10,
              backgroundColor: "#E0E0E0",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Logout</Text>
          </Pressable>

        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default Profile;