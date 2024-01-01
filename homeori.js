import { Heading, Image, Text, HStack, Center } from "native-base";
import { Box, ScrollView, Input, } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import datas from "../datas";
import { SafeAreaView } from "react-native-safe-area-context";


const Home = () => {


  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <Box py={3}>
          <Input placeholder="Apa Yang Anda Cari" w="100%" borderWidth={2} />
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

        <Box py={"4"}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {datas.filter
              ((category) => category.kategori == "Bumbu Dapur")

              .map((category, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={index}
                    onPress={() =>
                      navigation.navigate("Produkdetail", { category: category })
                    }
                  >
                    <Box borderWidth={"1"} rounded={20} shadow={5} p={3} w={"48"} mr={"4"} ml={index == 0 ? "4" : "0"}>
                      <Image
                        source={{ uri: category.image }}
                        w="full"
                        h="24"
                        alt="Image Data"
                        mb={"2"}
                        rounded={20}
                      />
                      <Text fontSize={"xs"}>
                        Rp.
                        {category.harga}
                      </Text>
                      <Heading
                        fontSize={"sm"}
                        lineHeight={"xs"}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                      >
                        {category.nama}
                      </Heading>
                    </Box>

                  </TouchableOpacity>

                );
              })}
          </ScrollView>

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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("Produkdetail", { category: category })
          }
        >
        </TouchableOpacity>

        <Box py={"4"} >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {datas.filter
              ((category) => category.kategori == "Sayur Hijau")

              .map((category, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={index}
                    onPress={() =>
                      navigation.navigate("Produkdetail", { category: category })
                    }
                  >
                    <Box borderWidth={"1"} rounded={20} shadow={5} p={3} w={"48"} mr={"4"} ml={index == 0 ? "4" : "0"}>
                      <Image
                        source={{ uri: category.image }}
                        w="full"
                        h="24"
                        alt="Image Data"
                        mb={"2"}
                        rounded={20}
                      />
                      <Text fontSize={"xs"}>
                        Rp.
                        {category.harga}
                      </Text>
                      <Heading
                        fontSize={"sm"}
                        lineHeight={"xs"}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                      >
                        {category.nama}
                      </Heading>
                    </Box>

                  </TouchableOpacity>

                );
              })}
          </ScrollView>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;