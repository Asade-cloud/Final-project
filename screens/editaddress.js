import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { Input } from 'native-base';
import { useState, useContext } from 'react';
import { Button } from 'native-base';
import { UserType } from "../UserContext";
import axios from 'axios';

const Editaddress = () => {
    const route = useRoute();
    const [noHp, setNoHp] = useState("");
    const [name, setName] = useState("");
    const [noRumah, setnoRumah] = useState("");
    const [kodePos, setkodePos] = useState("");
    const [jalan, setJalan] = useState("");
    const { userId, setUserId } = useContext(UserType);


    const navigation = useNavigation();
    console.log(route)

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.delete(`http://192.168.0.6:8000/addressesedit/${userId}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }



    return (
        <View>
            <Text>{route.params.id}</Text>
            <Text>{route.params.name} asdasd</Text>
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
                value={noHp}
                onChangeText={(text) => setNoHp(text)}
                w={{
                    base: "75%",
                    md: "25%",

                }}
                marginTop={3}
                p={4} placeholder={route.params.noRumah} />
            <Input
                value={noRumah}
                onChangeText={(text) => setnoRumah(text)}
                w={{
                    base: "75%",
                    md: "25%",

                }}
                marginTop={3}
                p={4} placeholder={route.params.noRumah} />
            <Input
                value={jalan}
                onChangeText={(text) => setJalan(text)}
                w={{
                    base: "75%",
                    md: "25%",

                }}
                marginTop={3}
                p={4} placeholder={route.params.noHp} />
            <Input
                value={kodePos}
                onChangeText={(text) => setkodePos(text)}
                w={{
                    base: "75%",
                    md: "25%",

                }}
                marginTop={3}
                p={4} placeholder={route.params.noHp} />
            <Button onPress={handleUpdate}> Login</Button>

        </View>
    )
}

export default Editaddress

const styles = StyleSheet.create({})