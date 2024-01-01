import { Heading, Image, Text, HStack, VStack, Center } from "native-base";
import { Box, ScrollView, Input, Icon, Pressable, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const [show, setShow] = React.useState(false);
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.replace("Main");
                }
            } catch (err) {
                console.log("error message", err);
            }
        };
        checkLoginStatus();
    }, []);
    
    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        };
        
        axios.post("http://192.168.100.114:8000/login", user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.replace("Main")
            }).catch((error) => {
                Alert.alert("Login Error", "Invalid Email");
                console.log(error);
            });
    };




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack>
                <Center >
                    <Box w="full" h="400" backgroundColor={"amber.100"}>
                        <Center>
                            <Image
                                source={require('../assets/logo.png')}
                                w="full"
                                h="full"
                                rounded="lg"
                                alt="imagepn"
                            />
                        </Center>
                    </Box>
                    <Heading>Login Ke Akunmu</Heading>
                    <Input
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        w={{
                            base: "75%",
                            md: "25%",

                        }}
                        marginTop={3}
                        p={4} InputLeftElement={
                            <Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />} placeholder="Email" />

                    <Input
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        w={{
                            base: "75%",
                            md: "25%"
                        }}
                        marginTop={3} p={4} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                        </Pressable>} placeholder="Password" />
                    <Box marginTop={3}>
                        <Button onPress={handleLogin}> Login</Button>
                        <Button onPress={() =>
                            navigation.navigate("Register")}> Blm punya akun cuy</Button>
                    </Box>
                </Center>
            </VStack>






        </SafeAreaView>
    );
};

export default Login;