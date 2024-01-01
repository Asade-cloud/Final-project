
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Text } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./screens/home";
import Kategori from "./screens/Kategori";
import Produkdetail from "./screens/produkdetail";
import Login from "./screens/login";
import Register from "./screens/register";
import Profile from "./screens/profile";
import { Provider } from "react-redux";
import store from "./store";
import Cartscreen from "./screens/cartscreen";
import Pembayaran from "./screens/pembayaran";
import AddressScreen from "./screens/AddressScreen";
import AddAddressScreen from "./screens/AddAddressScreen";
import { UserContext } from "./UserContext";
import Editprofil from "./screens/editprofil";
import Editaddress from "./screens/editaddress";
import Order from "./screens/order";
import Faq from "./screens/Faq";
import Search from "./screens/search";
import About from "./screens/About";

// Navigator Declaration
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const noHead = { headerShown: false };

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Order":
              iconName = "list-outline";
              break;
            case "Cart":
              iconName = "cart-outline";
              break;
            case "Profil":
              iconName = "person-outline";
              break;

          }
          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? "black" : color}
            />


          );
        },
        tabBarIconStyle: { marginTop: 5 },
        tabBarStyle: {
          height: 80,
          borderTopWidth: 0,
        },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text color={focused ? "black" : color} mb={2}>
              {children}
            </Text>
          );
        },
      })}
    >


      <Tab.Screen name="Home" component={Home} options={noHead} />
      <Tab.Screen name="Order" component={Order} options={noHead} />
      <Tab.Screen name="Resep" component={Profile} options={noHead} />
      <Tab.Screen name="Cart" component={Cartscreen} options={noHead} />
      <Tab.Screen name="Profil" component={Profile} options={noHead} />



    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <>
    <NativeBaseProvider>
      <Provider store={store}>
        <UserContext>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={noHead} />
            <Stack.Screen name="Register" component={Register} options={noHead} />

            <Stack.Screen name="Main"
              component={Tabs}
              options={noHead} />
            <Stack.Screen name="Tabs" component={Tabs} options={noHead} />
            <Stack.Screen name="Pembayaran" component={Pembayaran} options={noHead} />
            <Stack.Screen name="Kategori" component={Kategori} />
            <Stack.Screen name="Search" component={Search} />

            <Stack.Screen
              name="Address"
              component={AddAddressScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddressScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Produkdetail" component={Produkdetail} />
            <Stack.Screen name="Editprofil" component={Editprofil} />
            <Stack.Screen name="Editaddress" component={Editaddress} />
            <Stack.Screen name="Faq" component={Faq} />
            <Stack.Screen name="About" component={About} />







          </Stack.Navigator>
        </NavigationContainer>
        </UserContext>
      </Provider>
    </NativeBaseProvider>
    </>
  );
};

export default App;


