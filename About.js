import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, Center, Image } from 'native-base'

const About = () => {
    return (
        <SafeAreaView>
            <Box h={"400"} w={"full"} p={3}>
                <Center>
                <Image backgroundColor={"white.200"}
                    source={require('../assets/logo.png')}
                    w="full"
                    h="full"
                    rounded="lg"
                    alt="imagepn"
                />
                <Box p={3}>
                <Text >Sayoor adalah usaha kami yang terdiri dari 5 sekawan. Kami mendirikan Sayoor dengan motivasi untuk membantu pekerjaan ibu rumah tangga. Kami ter inspirasi dengan melihat ibu kami yang harus bangun pagi untuk berbelanja di pasar.</Text>
                </Box>
                </Center>

            </Box>
        </SafeAreaView>
    )
}

export default About

const styles = StyleSheet.create({})