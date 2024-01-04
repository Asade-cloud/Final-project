import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Modal, Button, HStack, VStack, Box, Center } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from "@expo/vector-icons/Ionicons";


const Hubungikami = () => {
    const [selectedOption, setSelectedOption] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState(false);


    return (
        <SafeAreaView>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Email</Text>

                < Ionicons
                    size={30}
                    onPress={() => {
                        setSelectedOption(!selectedOption);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>
            <View>
                {selectedOption && selectedOption && (
                    <Box h={10} backgroundColor={"gray.300"}>
                        <Center>
                            <Text >     
                            </Text>
                            <Text>
                              Sayoor@gmail.com
                            </Text>
                        
                        </Center>
                    </Box>
                )}
            </View>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Instagram</Text>

                < Ionicons
                    size={30}
                    onPress={() => {
                        setSelectedOption2(!selectedOption2);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>
            <View>
                {selectedOption2 && selectedOption2 && (
                    <Box h={10} backgroundColor={"gray.300"}>
                        <Center>
                            <Text >
                            
                            </Text>
                            <Text>
                                @Djuragan_Sayoor
                            </Text>
                        </Center>
                    </Box>
                )}
            </View>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>WhatsApp</Text>

                < Ionicons
                    size={30}
                    onPress={() => {
                        setSelectedOption3(!selectedOption3);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>
            <View>
                {selectedOption3 && selectedOption3 && (
                    <Box h={10} backgroundColor={"gray.300"}>
                        <Center>
                            <Text >       
                            </Text>
                            <Text>
                                +62 813-3373-7037 
                            </Text>
                        </Center>
                    </Box>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Hubungikami

const styles = StyleSheet.create({})