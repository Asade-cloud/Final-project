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
        axios.put(`http://192.168.0.50:8000/profileupdate/${userId}`
            , { name, email })
            .then(res => {
                Alert.alert(
                    "Edit Berhasil",
                    "You have been registered Successfully"
                  );
                  
                console.log(res);
            })
            .catch(err => console.log(err))
            Alert.alert(
                "Registration Error",
                "An error occurred while kons"
              );
    }

    return (
        <View>
            <Text>{route.params.id} asdasd</Text>
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
                p={4} placeholder={route.params.id} />
            <Button onPress={handleUpdate}> Login</Button>

        </View>
    )
}

export default Editprofil

const styles = StyleSheet.create({})