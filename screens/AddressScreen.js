import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import axios from "axios";
import { Button, HStack, Heading, Input, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"
import { SafeAreaView } from "react-native-safe-area-context";



const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [noRumah, setNoRumah] = useState("");
    const [jalan, setJalan] = useState("");
    const [noHp, setNoHP] = useState("");
    const [kodePos, setKodePos] = useState("");
    const { userId, setUserId } = useContext(UserType)
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId)
        }

        fetchUser();
    }, []);
    console.log(userId)
    const handleAddAddress = () => {
        const address = {
            name,
            noRumah,
            noHp,
            jalan,
            kodePos
        }

        axios.post("http://192.168.100.114:8000/addresses", { userId, address }).then((response) => {
            Alert.alert("Success", "Alamat Telah Ditambahkan");
            setName("");
            setNoRumah("");
            setNoHP("");
            setJalan("");
            setKodePos("");
            setTimeout(() => {
                navigation.goBack();
            }, 500)
        }).catch((error) => {
            Alert.alert("Error", "Gagal")
            console.log("error", error)
        })
    }
    return (
        <SafeAreaView style={{ p: 3 }}>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    Tambahkan Alamat Baru
                </Text>
                <VStack p={3}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Nama Lengkap
                    </Text>
                    <Input
                        value={name}
                        onChangeText={(text) => setName(text)}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        marginTop={3}
                        p={4} placeholder="Nama"
                        isRequired />
                </VStack>

                <VStack p={3}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Nomor Hp
                    </Text>
                    <Input
                        value={noHp}
                        onChangeText={(text) => setNoHP(text)}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        marginTop={3}
                        p={4} placeholder="Nomor Hp"
                        isRequired />
                </VStack>
                <VStack p={3}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Alamat Lengkap
                    </Text>
                    <Input
                        value={noRumah}
                        onChangeText={(text) => setNoRumah(text)}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        marginTop={3}
                        p={4} placeholder="Alamat Rumah"
                        isRequired />
                </VStack>
                <VStack p={3}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Nama Jalan
                    </Text>
                    <Input
                        value={jalan}
                        onChangeText={(text) => setJalan(text)}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        marginTop={3}
                        p={4} placeholder="Nama Jalan"
                        isRequired />
                </VStack>
                <VStack p={3}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Kode Pos
                    </Text>
                    <Input
                        value={kodePos}
                        onChangeText={(text) => setKodePos(text)}
                        w={{
                            base: "75%",
                            md: "25%",
                        }}
                        marginTop={3}
                        p={4} placeholder="Alamat Rumah"
                        isRequired />
                </VStack>
                <Button
                    backgroundColor={"green.400"}
                    onPress={handleAddAddress}
                    style={{

                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontWeight: "bold" }}>Tambahkan Alamat</Text>
                </Button>
            </View>
        </SafeAreaView>

    );
};

export default AddressScreen;

const styles = StyleSheet.create({});