import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Modal, Button, HStack, VStack } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from "@expo/vector-icons/Ionicons";


const Faq = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView>
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Bagaimana proses order di sayoor</Text>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Body>
                        Yo mbo
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={() => {
                            setModalVisible(false);
                        }}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
                < Ionicons
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>


            {/* 2 */}
            <HStack justifyContent={"space-between"} p={3}>
                <Text>Apakah kualitas sayur terjamin?</Text>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Body>
                        Yo mbo
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={() => {
                            setModalVisible(false);
                        }}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
                < Ionicons
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>

             {/* 3 */}
             <HStack justifyContent={"space-between"} p={3}>
                <Text>Apakah aplikasi ini menjangkau seluruh area?</Text>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Body>
                        Yo mbo
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={() => {
                            setModalVisible(false);
                        }}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
                < Ionicons
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    name="arrow-forward" ></ Ionicons>
            </HStack>

        </SafeAreaView>
    )
}

export default Faq

const styles = StyleSheet.create({})