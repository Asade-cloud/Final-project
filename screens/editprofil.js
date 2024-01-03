import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { Input } from 'native-base';
import { useState, useContext } from 'react';
import { Button } from 'native-base';
import { UserType } from "../UserContext";
import axios from 'axios';
import { Alert } from 'react-native';


const Editprofil = () => {
    const route = useRoute();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();


    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`http://10.217.21.121:8000/profileupdate/${userId}`
            , { name, email })
            .then(res => {
                Alert.alert(
                    "Edit Berhasil",
                  );
                  navigation.navigate("Profil")

                console.log(res);
            })
              .catch((error) => {
                Alert.alert("");
                console.log(error);
            });
    }

    return (
        <View>
            <Input
                value={name}
                onChangeText={(text) => setName(text)}
                w={{
                    base: "75%",
                    md: "25%",

                }}
                marginTop={3}
                p={4} placeholder={route.params.name} />
            <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                w={{
                    base: "75%",
                    md: "25%",

                }}
                marginTop={3}
                p={4} placeholder={route.params.email} />
            <Button 
            backgroundColor={"green.400"}
            onPress={handleUpdate}> Ganti Data</Button>

        </View>
    )
}

export default Editprofil

const styles = StyleSheet.create({})