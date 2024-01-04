import { Heading, Image, Text, HStack, Center } from "native-base";
import { Box, ScrollView, Input, } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";



const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const { userId, setUserId } = useContext(UserType)
  const [searchResult, setSearchResult] = useState([])
  const [key, setKey] = useState("")

  useEffect(() => {
    const search = async () => {
      try {
        if (!key.trim()) {
          setSearchResult([])
          return
        }
        const res = await axios.get("http://192.168.18.242:8000/search-products",{ params: { key: key, limit: 5 } })
        setSearchResult(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    search()
  }, [key])



  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://192.168.18.242:8000/get-products");
        setProducts(response.data);
      } catch (error) {
        console.log("error fetching produk", error);
      }
    };
    fetchProduct();
  }, []);


  return (
    <>

      <SafeAreaView>
        <ScrollView px={3}>


          <Box py={3}>


            <Input placeholder="Apa Yang Anda Cari"
              w="100%"
              borderWidth={2}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            {searchResult && searchResult.length > 0 && (
              <Box>
                {searchResult.map(p => (
                  <Box key={p._id}>
                    <Text>{p.name}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Box
            w="full"
            rounded="lg"
            h="300"
          >
            <Center>
              <Image
                source={require('../assets/haha.jpg')}
                w="full"
                h="full"
                rounded="lg"
                alt="imagepn"
              />
            </Center>
          </Box>
          <HStack p={3} justifyContent={"space-between"}>
            <Heading>Sayur Hijau</Heading>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Kategori")
              }
            >
              <Text fontSize="15" color="amber.500"> Lihat Semua</Text>
            </TouchableOpacity>
          </HStack>
          <Box py={"4"} p={3} >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

              {products.filter
                ((item) => item.kategori == "Sayur Hijau")

                .map((item, index) => {
                  return (
                    <TouchableOpacity
                      item={item}
                      activeOpacity={0.5}
                      key={index}
                      onPress={() =>
                        navigation.navigate("Produkdetail", {
                          id: item._id,
                          name: item.name,
                          harga: item.harga,
                          deskripsi: item.deskripsi,
                          image: item.image,
                          deskripsi: item.deskripsi,

                          item: item,

                        })
                      }
                    >
                      <Box borderWidth={"1"} rounded={20} p={3} w={"250"} mr={"4"} h={"220"} >
                        <Box backgroundColor={"amber.200"} h={'150'} w={"full"} >
                          <Center>
                            <Image
                              source={{ uri: item.image }}
                              w="full"
                              h={"full"}
                              alt="Image Data"
                            />
                          </Center>
                        </Box>
                        <Text fontSize={"xs"}>
                          Rp.
                          {item.harga}
                        </Text>
                        <Heading
                          fontSize={"sm"}
                          lineHeight={"xs"}
                        >
                          {item.name}
                        </Heading>
                      </Box>
                    </TouchableOpacity>

                  );
                })}
            </ScrollView>
          </Box>
          <HStack p={3} justifyContent={"space-between"}>
            <Heading>Bumbu Dapur</Heading>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Kategori")
              }
            >
              <Text fontSize="15" color="amber.500"> Lihat Semua</Text>
            </TouchableOpacity>
          </HStack>

          <Box py={"4"} p={3} >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {products.filter
                ((item) => item.kategori == "Bumbu Dapur")
                .map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      key={index}
                      onPress={() =>
                        navigation.navigate("Produkdetail", {
                          id: item.id,
                          name: item.name,
                          harga: item.harga,
                          deskripsi: item.deskripsi,
                          item: item,

                        })
                      }
                    >
                      <Box borderWidth={"1"} rounded={20} p={3} w={"250"} mr={"4"} h={"220"} >
                        <Box backgroundColor={"amber.200"} h={'150'} w={"full"} >

                          <Image
                            source={{ uri: item.image }}
                            w="full"
                            h={"full"}
                            alt="Image Data"
                          />
                        </Box>
                        <Text fontSize={"xs"}>
                          Rp.
                          {item.harga}
                        </Text>
                        <Heading
                          fontSize={"sm"}
                          lineHeight={"xs"}
                        >
                          {item.name}
                        </Heading>
                      </Box>

                    </TouchableOpacity>

                  );
                })}
            </ScrollView>
          </Box>



        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;