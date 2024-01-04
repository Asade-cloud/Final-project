import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Modal, Button, HStack, VStack, Box, Center } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from "@expo/vector-icons/Ionicons";


const Faq = () => {
    const [selectedOption, setSelectedOption] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState(false);
    const [selectedOption5, setSelectedOption5] = useState(false);

    return (
        <SafeAreaView>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Bagaimana proses order di sayoor</Text>

                < Ionicons
                    size={30}
                    onPress={() => {
                        setSelectedOption(!selectedOption);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>
            <View>
                {selectedOption && selectedOption && (
                    <Box h={20} backgroundColor={"gray.300"}>
                        <Center>
                            <Text >
                                Proses order dimulai dengan pengguna memilih produk, 
                                kemudian dilanjutkan dengan pilih alamat pengiriman dan diakhiri dengan pembayaran. 
                            </Text>
                            <Text>
                              
                            </Text>
                            <Text>
                              Selamat Berbelanja :)
                            </Text>
                        </Center>
                    </Box>
                )}
            </View>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Apakah kualitas sayur terjamin?</Text>

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
                                Kualitas sayur di aplikasi kami sangat terjaga dan dipilih melalui penyortiran
                                yang dilakukan oleh berbagai pihak.
                            </Text>
                        </Center>
                    </Box>
                )}
            </View>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Bagaimana cara mengubah alamat pengiriman</Text>

                < Ionicons
                    size={30}
                    onPress={() => {
                        setSelectedOption3(!selectedOption3);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>
            <View>
                {selectedOption3 && selectedOption3 && (
                    <Box h={20} backgroundColor={"gray.300"}>
                        <Center>
                            <Text >
                                Pengguna dapat mengubah alamat pengiriman dengan memasukkan alamat pengiriman baru 
                                dengan memasukkan data nama alamat dan juga nomer telepon
                            </Text>
                        </Center>
                    </Box>
                )}
            </View>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Aplikasi ini menerima 
                  pembayaran melalui apa saja</Text>

                < Ionicons
                    size={30}
                    onPress={() => {
                        setSelectedOption4(!selectedOption4);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>
            <View>
                {selectedOption4 && selectedOption4 && (
                    <Box h={20} backgroundColor={"gray.300"}>
                        <Center>
                            <Text >
                                Pengguna dapat melakukan pembayaran dengan menggunakan metode COD 
                                atau Cash On Delivery, maupun Qris yang dapat di scn dengan menggunakan dompet digital pengguna.
                            </Text>
                        </Center>
                    </Box>
                )}
            </View>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Apakah aplikasi ini menjangkau area saya?</Text>

                < Ionicons
                    size={30}
                    onPress={() => {
                        setSelectedOption5(!selectedOption5);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>
            <View>
                {selectedOption5 && selectedOption5 && (
                    <Box h={10} backgroundColor={"gray.300"}>
                        <Center>
                            <Text >
                                Aplikasi ini hanya dapat diakses jika pengguna sedang berada di Surabaya saja.
                            </Text>
                        </Center>
                    </Box>
                )}
            </View>



        </SafeAreaView>
    )
}

export default Faq

const styles = StyleSheet.create({})