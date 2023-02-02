import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import { useUserStore } from "../store";

export default function Login({
    setIsUser,
    navigation,
}: {
    setIsUser: any;
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}) {
    return (
        <SafeAreaView className="flex-auto justify-center items-center text-center">
            <LoginPage setIsUser={setIsUser} navigation={navigation} />
            <StatusBar />
        </SafeAreaView>
    );
}

const LoginPage = ({
    setIsUser,
    navigation,
}: {
    setIsUser: any;
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}) => {
    // const clientData = useUserStore((state) => state.data);
    // marginvertical
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginError, setIsLoginError] = useState(false);

    // TODO: handle login
    const handleLogin = async () => {
        try {
            let res = await axios.post("/api/auth/login", {
                username,
                password,
            });

            if (res) return setIsLoginError(true);
            setIsLoginError(false);
            setIsUser(true);
        } catch (e) {
            setIsLoginError(true);
            console.warn(e);
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
                    <Text className="text-4xl p-2 text-gray-800">欢迎登录</Text>
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
                    <View className="border-gray-500 border w-[40%] h-[1px]" />
                    <Text className="m-2">或者</Text>
                    <View className="border-gray-500 border w-[40%] h-[1px]" />
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
