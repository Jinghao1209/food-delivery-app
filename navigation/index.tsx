/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Alert, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import HomeIcon from "react-native-heroicons/solid/HomeIcon";
import UserIcon from "react-native-heroicons/solid/UserIcon";
import ShoppingCartIcon from "react-native-heroicons/solid/ShoppingCartIcon";
import ChatBubbleIcon from "react-native-heroicons/solid/ChatBubbleLeftEllipsisIcon";
import MapPinIcon from "react-native-heroicons/solid/MapPinIcon";
import SearchIcon from "react-native-heroicons/outline/MagnifyingGlassIcon";
import BuildingStorefrontIcon from "react-native-heroicons/solid/BuildingStorefrontIcon";
import InformationCircleIcon from "react-native-heroicons/outline/InformationCircleIcon";

import Colors from "../constants/Colors";
import ModalScreen from "../screens/modal/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomePage from "../screens/HomePage";
import MySpace from "../screens/space";
import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
} from "../typings/types";
import LinkingConfiguration from "./LinkingConfiguration";
import Login from "../screens/Login";
import RegisterModal from "../screens/modal/RegisterModal";
import ResetPasswordModal from "../screens/modal/ResetPasswordModal";
import ShoppingCart from "../screens/ShoppingCart";
import MyMessage from "../screens/MyMessage";
import SearchPage from "../screens/SearchPage";
import MenuSelection from "../screens/MenuSelection";
import { useUserStore } from "../store/userStore";
import { useCartStore } from "../store/useCartStore";
import EditAccount from "../screens/space/EditAccount";
import MerchantPage from "../screens/merchant";
import UserType from "../constants/UserType";
import CreateShopModal from "../screens/merchant/CreateShopModal";
import ManageShopPage from "../screens/merchant/ManageShopPage";
import CreateProductModal from "../screens/merchant/CreateProductModal";
import EditShopInfo from "../screens/merchant/EditShopInfo";
import SelectLocation from "../screens/SelectLocation";

export default function Navigation() {
    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
            />
            {/* TODO: Search Page */}
            <Stack.Screen
                name="SearchPage"
                component={SearchPage}
                options={{ title: "搜索界面" }}
            />
            {/* TODO: Edit Account */}
            <Stack.Screen
                name="EditAccount"
                component={EditAccount}
                options={{ title: "修改个人信息" }}
            />
            {/* TODO: Edit Shop Info */}
            <Stack.Screen
                name="EditShopInfo"
                component={EditShopInfo}
                options={{ title: "修改商店信息" }}
            />
            <Stack.Screen
                name="ManageShopPage"
                component={ManageShopPage}
                options={({ navigation, route }) => ({
                    title: "管理商店",
                    headerRight: (p) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate(
                                    "EditShopInfo",
                                    route.params.shop
                                )
                            }
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <InformationCircleIcon
                                size={30}
                                color={Colors.blue.link}
                            />
                        </Pressable>
                    ),
                })}
            />
            {/* TODO: Select Location */}
            <Stack.Screen
                name="SelectLocation"
                component={SelectLocation}
                options={{ title: "选择地址" }}
            />
            <Stack.Screen
                name="MenuSelection"
                component={MenuSelection}
                options={({ navigation }) => ({
                    title: "选餐界面",
                    headerRight: (p) => (
                        <Pressable
                            onPress={() => navigation.navigate("ShoppingCart")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <ShoppingCartIcon
                                size={30}
                                color={Colors.blue.link}
                            />
                        </Pressable>
                    ),
                })}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
                <Stack.Screen
                    name="RegisterModal"
                    component={RegisterModal}
                    options={{ title: "注册界面" }}
                />
                <Stack.Screen
                    name="ResetPasswordModal"
                    component={ResetPasswordModal}
                    options={{ title: "重设密码" }}
                />
                <Stack.Screen
                    name="CreateShopModal"
                    component={CreateShopModal}
                    options={{ title: "创建商店" }}
                />
                <Stack.Screen
                    name="CreateProductModal"
                    component={CreateProductModal}
                    options={{ title: "添加商品" }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const setAllUserData = useUserStore((state) => state.setAllData);
    const setAllCartData = useCartStore((state) => state.setAllData);
    const clientData = useUserStore((state) => state.data);
    const navigation = useNavigation();

    React.useEffect(() => {
        (async () => {
            await Promise.all([
                setAllUserData(),
                setAllCartData(clientData.token),
            ]);
        })();
    }, []);

    // setListener for client in `AsyncStorageKey.CLIENT_DATA` value
    React.useEffect(() => {
        console.log("clientData", clientData);
    }, [clientData]);

    return (
        <BottomTab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                tabBarActiveTintColor: Colors.darkGreen.hex,
                tabBarInactiveTintColor: Colors.darkGreen.light,
            }}
        >
            <BottomTab.Screen
                name="HomePage"
                component={HomePage}
                options={({ navigation }: RootTabScreenProps<"HomePage">) => ({
                    title: "XX外卖",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("SearchPage")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                            className="mr-3"
                        >
                            <SearchIcon size={30} color={Colors.blue.link} />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="MyMessage"
                component={MyMessage}
                options={{
                    title: "消息",
                    tabBarIcon: ({ color }) => <ChatBubbleIcon color={color} />,
                }}
                listeners={{
                    tabPress: (e) => {
                        // prevent default action
                        e.preventDefault();
                        Alert.alert("未完成项目");
                    },
                }}
            />
            {typeof clientData.user?.userType !== "undefined" &&
                clientData.user?.userType === UserType.MERCHANT && (
                    <BottomTab.Screen
                        name="MerchantPage"
                        component={MerchantPage}
                        options={{
                            title: "商家管理",
                            tabBarIcon: ({ color }) => (
                                <BuildingStorefrontIcon color={color} />
                            ),
                        }}
                    />
                )}
            <BottomTab.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={{
                    title: "购物车",
                    tabBarIcon: ({ color }) => (
                        <ShoppingCartIcon color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("SelectLocation")
                            }
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                            className="mr-3"
                        >
                            <MapPinIcon size={30} color={Colors.blue.link} />
                        </Pressable>
                    ),
                }}
            />
            <BottomTab.Screen
                name="MySpace"
                component={MySpace}
                options={{
                    title: "我的界面",
                    headerTitleAlign: "center",
                    tabBarIcon: ({ color }) => <UserIcon color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}
