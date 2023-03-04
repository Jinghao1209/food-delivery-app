import { NavigationProp } from "@react-navigation/native";
import axios, { isAxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";

import CustomTextInput from "../components/CustomTextInput";
import API from "../constants/API";
import Layout from "../constants/Layout";
import { useUserStore } from "../store/userStore";
import { API_Response } from "../typings/api";

export default function Login({
    navigation,
}: {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}) {
    return (
        <SafeAreaView className="flex-auto justify-center items-center text-center">
            <LoginPage navigation={navigation} />
            <StatusBar />
        </SafeAreaView>
    );
}

const LoginPage = ({
    navigation,
}: {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}) => {
    const setUserData = useUserStore((state) => state.addData);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginError, setIsLoginError] = useState(false);

    // TODO: handle login
    const handleLogin = async () => {
        try {
            let res = await axios.post(API.POST_LOGIN, {
                username,
                password,
            });

            let data = res.data as API_Response<{
                token: string;
                userId: string;
                userType: string;
            }>;

            if (data.code === 200) {
                Alert.alert("登录成功", `${username}，欢迎回来！`);
                setUserData({
                    token: data.data.token,
                    user: {
                        id: data.data.userId,
                        userType: data.data.userType,
                        username,
                    },
                });

                if (navigation.canGoBack()) navigation.goBack();
                else navigation.navigate("Root");

                setIsLoginError(false);
            } else {
                console.log(data); // check login error
                setIsLoginError(true);
            }
        } catch (e) {
            if (isAxiosError(e) && e.name === "Network Error") {
                Alert.alert("网络错误", "请检查网路后再试");
            } else {
                setIsLoginError(true);
                console.warn(e);
            }
        }
    };

    const handleRegister = () => {
        navigation.navigate("RegisterModal");
    };

    const forgotPassword = () => {
        navigation.navigate("ResetPasswordModal");
    };

    return (
        <View className="min-w-[78%] max-w-[78%] justify-center">
            <View className="items-center p-8">
                <View className="w-[60%] border-b-2 items-center border-gray-300">
                    <Text
                        className="p-2 text-gray-800"
                        style={{ fontSize: Layout.window.width * 0.07 }}
                    >
                        欢迎登录
                    </Text>
                </View>
            </View>
            <CustomTextInput.Parent>
                <CustomTextInput.Child
                    placeholderText="用户名"
                    value={username}
                    setValue={setUsername}
                />
                <CustomTextInput.Child
                    placeholderText="密码"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />
                {isLoginError && (
                    <View className="ml-1">
                        <Text className="text-red-600 ">
                            用户名或密码错误！
                        </Text>
                    </View>
                )}
            </CustomTextInput.Parent>
            <View className="mt-5 items-center justify-center">
                <TouchableOpacity onPress={handleLogin}>
                    {/* `bg-gray-300` for debug */}
                    <Text
                        className="text-xl text-blue-600"
                        style={{ paddingHorizontal: "8%" }}
                    >
                        登录
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="mt-5 flex items-center justify-center">
                <View className="flex-row items-center">
                    <View className="border w-[40%] h-[1px] bg-black" />
                    <Text className="m-2">或者</Text>
                    <View className="border w-[40%] h-[1px] bg-black" />
                </View>
            </View>
            <View className="flex-row items-center justify-center mt-4">
                <TouchableOpacity
                    onPress={handleRegister}
                    style={{ marginHorizontal: "30%" }}
                >
                    <Text className="text-blue-600">注册</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={forgotPassword}
                    style={{ marginHorizontal: "30%" }}
                >
                    <Text className="text-red-500">忘记密码?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
