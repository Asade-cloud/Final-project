import { StyleSheet, View, ScrollView, Pressable, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, HStack, Text, VStack } from "native-base";

const Pembayaran = () => {
  const steps = [
    { title: "Alamat", content: "Address Form" },
    { title: "Pengantaran", content: "Delivery Options" },
    { title: "Pembayaran", content: "Payment Details" },
    { title: "Detail Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.harga * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(cart)
  useEffect(() => {
    fetchAddresses();
  }, []);


  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.242:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");



  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
        status : "Terbayar",
      };
      console.log(orderData)
      const response = await axios.post(
        "http://192.168.18.242:8000/orders",
        orderData
      );
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Box h={"10"} w={"full"}>
            <HStack justifyContent={"space-between"}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Pilih Alamat Untuk Diantar
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Add")
                }
              >
                <Text
                  color="amber.500"
                >Tambah Alamat</Text>
              </TouchableOpacity>
            </HStack>
          </Box>

          <Pressable>
            {addresses.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress._id === item._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo
                    key={index}
                    onPress={() => setSelectedAdress(item)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item.noRumah}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item.jalan}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Surabaya, Indonesia
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    No Hp : {item.noHp}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Kode Pos : {item.kodePos}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Kode Pos : {item._id}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                  </View>

                  <View>
                    {selectedAddress && selectedAddress._id === item._id && (

                      <Button
                        onPress={() => setCurrentStep(1)}
                        backgroundColor={"green.400"}
                        style={{
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >

                        <Text style={{ textAlign: "center", color: "white" }}>
                          Antarkan Ke Alamat Ini
                        </Text>
                      </Button>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>

        </View>


      )}



      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Pilih Pengantaran
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Gratis
              </Text>{" "}
              - Gratis Hemat
            </Text>
          </View>

          <Button

            onPress={() => setCurrentStep(2)}
            backgroundColor={"green.400"}
            style={{
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Button>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Pilih Pembayaran
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Cash on Delivery</Text>
          </View>

          {/* Payment 2 Qris */}

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "qris" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("qris")}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Qris</Text>
          </View>


          <Button
            onPress={() => setCurrentStep(3)}
            backgroundColor={"green.400"}
            style={{
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Lanjut</Text>
          </Button>
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order </Text>



          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Kirim Ke {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Jumlah Item
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>{cart.length}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Pengiriman
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>Rp.0</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Total
              </Text>

              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >Rp.
                {total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Bayar Dengan</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Cash on delivery
            </Text>
          </View>

          <Button
            onPress={handlePlaceOrder}
            backgroundColor={"green.400"}
            style={{
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Lanjutkan order</Text>
          </Button>
        </View>
      )}

      {currentStep === 3 && selectedOption === "qris" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order </Text>



          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Kirim Ke {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Jumlah Item
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>{cart.length}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Pengiriman
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>Rp.0</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Total
              </Text>

              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >Rp.
                {total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Bayar Dengan</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Qris
            </Text>
          </View>

          <Button
            onPress={handlePlaceOrder}
            backgroundColor={"green.400"}
            style={{
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Lanjutkan order</Text>
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

export default Pembayaran;

const styles = StyleSheet.create({});