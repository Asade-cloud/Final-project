import { Heading, Image, Text, HStack, VStack, Center } from "native-base";
import { Box, ScrollView, Input, Icon, Pressable, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";



const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [show, setShow] = React.useState(false);
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };


        //axios
        axios.post("http://10.217.21.121:8000/register", user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration successful",
                    "You have been registered Successfully"
                );
                setName("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occurred while kons"
                );
                console.log("registration failed", error);
            });

    }

    //api


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack>
                <Center >
                    <Box w="full" h="400" >
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
                    <Heading paddingTop={5}>Daftar Akun</Heading>
                    <Input
                        value={name}
                        onChangeText={(text) => setName(text)}
                        w={{
                            base: "75%",
                            md: "25%",

                        }}
                        marginTop={3}
                        p={4} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Nama" />
                    <Input
                        value={email}
                        onChangeText={(text) => setEmail(text)}

                        w={{
                            base: "75%",
                            md: "25%",

                        }}
                        marginTop={3}
                        p={4} InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />} placeholder="Email" />
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
                    <Box marginTop={3}
                    >
                        <Button onPress={handleRegister}
                            backgroundColor={"green.400"}
                            borderRadius={20}
                            w={80}
                        > Daftar</Button>
                    </Box>
                    <Pressable
                        onPress={() => navigation.goBack()}
                    >
                        <Text> Sudah Punya Akun ? Login </Text>
                    </Pressable>
                </Center>
            </VStack>






        </SafeAreaView>
    );
};

export default Register;