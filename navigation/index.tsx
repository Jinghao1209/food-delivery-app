/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    NavigationContainer,
    useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";
import HomeIcon from "react-native-heroicons/solid/HomeIcon";
import CogIcon from "react-native-heroicons/solid/CogIcon";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/modal/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomePage from "../screens/HomePage";
import SettingsScreen from "../screens/SettingsScreen";
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
                <Stack.Screen name="RegisterModal" component={RegisterModal} />
                <Stack.Screen
                    name="ResetPasswordModal"
                    component={ResetPasswordModal}
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

    React.useEffect(() => {
        console.log(clientData);
        if (typeof clientData.token !== "undefined") setIsUser(true);
        else setIsUser(false);
    }, [clientData]);

    if (!isUser) return <Login setIsUser={setIsUser} navigation={navigation} />;
    return (
        <BottomTab.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
        >
            <BottomTab.Screen
                name="HomePage"
                component={HomePage}
                options={({ navigation }: RootTabScreenProps<"HomePage">) => ({
                    title: "Home",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("Modal")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <CogIcon color={color} />,
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
