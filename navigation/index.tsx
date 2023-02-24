/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import HomeIcon from "react-native-heroicons/solid/HomeIcon";
import UserIcon from "react-native-heroicons/solid/UserIcon";
import ShoppingCartIcon from "react-native-heroicons/solid/ShoppingCartIcon";
import ChatBubbleIcon from "react-native-heroicons/solid/ChatBubbleLeftEllipsisIcon";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
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
import { useUserStore } from "../store";
import ResetPasswordModal from "../screens/modal/ResetPasswordModal";
import Layout from "../constants/Layout";
import ShoppingCart from "../screens/ShoppingCart";
import MyMessage from "../screens/MyMessage";

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
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: "Oops!" }}
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
    const colorScheme = useColorScheme();
    const setAllData = useUserStore((state) => state.setAllData);
    const clientData = useUserStore((state) => state.data);
    const [isUser, setIsUser] = React.useState(false);
    const navigation = useNavigation();

    React.useEffect(() => {
        (async () => {
            await setAllData();
        })();
    }, []);

    // setListener for client in `AsyncStorageKey.CLIENT_DATA` value
    React.useEffect(() => {
        console.log(clientData);
        // add new UI without login
        if (process.env.NODE_ENV === "development") return setIsUser(true);
        if (typeof clientData.token !== "undefined") setIsUser(true);
        else setIsUser(false);
    }, [clientData]);

    if (!isUser) return <Login setIsUser={setIsUser} navigation={navigation} />;
    return (
        <BottomTab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                tabBarActiveTintColor: Colors.darkGreen.hex,
                tabBarInactiveTintColor: Colors.darkGreen.light
                // headerShown: Layout.isAndroid ? false : true
            }}
        >
            <BottomTab.Screen
                name="HomePage"
                component={HomePage}
                options={({ navigation }: RootTabScreenProps<"HomePage">) => ({
                    title: "主页",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                })}
            />
            <BottomTab.Screen
                name="MyMessage"
                component={MyMessage}
                options={{
                    title: "消息",
                    tabBarIcon: ({ color }) => <ChatBubbleIcon color={color} />,
                }}
            />
            <BottomTab.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={{
                    title: "购物车",
                    tabBarIcon: ({ color }) => (
                        <ShoppingCartIcon color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="MySpace"
                component={MySpace}
                options={{
                    title: "我的界面",
                    tabBarIcon: ({ color }) => <UserIcon color={color} />,
                    headerShown: Layout.isAndroid ? false : true
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
