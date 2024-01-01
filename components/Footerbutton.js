import { Heading, Center, Text, Button, Box, Image, VStack } from "native-base";

import React from 'react'

const footerbutton = () => {
  return (
        <Box p={3} >
            <Button rounded={30} onPress={() => addItemToCart}>
                <Heading size={"sm"} p={5}>Tambahkan Ke Keranjang

                </Heading>

            </Button>
        </Box>
  )
}

export default footerbutton