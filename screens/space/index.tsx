import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ClockIcon from "react-native-heroicons/outline/ClockIcon";
import CreditCardIcon from "react-native-heroicons/outline/CreditCardIcon";
import TruckIcon from "react-native-heroicons/outline/TruckIcon";
import RectangleGroupIcon from "react-native-heroicons/solid/RectangleGroupIcon";
import UserCircleIcon from "react-native-heroicons/solid/UserCircleIcon";

import NavigationLine from "../../components/NavigationLine";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { useUserStore } from "../../store/userStore";
import { RootTabScreenProps } from "../../typings/types";

export default function MySpace({ navigation }: RootTabScreenProps<"MySpace">) {
    const user = useUserStore((state) => state.data);
    const setUserData = useUserStore((state) => state.setData);
    const [isLogin, setIsLogin] = useState(false);

    const logout = () => {
        setUserData({});
    };

    useEffect(() => {
        if (typeof user.token === "undefined") setIsLogin(false);
        else setIsLogin(true);
    }, [user]);

    if (!isLogin) {
        return (
            <View className="flex-1 items-center justify-center">
                <View className="flex-row items-center">
                    <RectangleGroupIcon size={50} color="black" />
                    <View className="ml-2">
                        <Text className="text-xl">这位客官</Text>
                        <Text>你貌似还没有登录哦！</Text>
                    </View>
                </View>

                <Pressable
                    onPress={() => navigation.navigate("Login")}
                    className="m-5"
                >
                    <Text
                        style={{ color: Colors.blue.link }}
                        className="text-base"
                    >
                        点击我登录吧
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView>
            {/* User Info */}
            <View className="bg-white m-2 rounded-xl">
                <View className="flex-row p-3 pl-5">
                    {user.user?.avatar ? (
                        <Image
                            source={{ uri: user.user?.avatar }}
                            className="h-16 w-16 rounded-xl"
                        />
                    ) : (
                        <UserCircleIcon size={66} color="black" />
                    )}
                    <TouchableOpacity
                        className="ml-5 justify-center w-[50vw]"
                        onPress={() => navigation.navigate("EditAccount")}
                    >
                        <Text className="text-lg font-bold">
                            {user.user?.username}
                        </Text>
                        <Text className=" text-xs">修改个人信息 {">"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* List */}
            <View className="m-4 my-1">
                <View className="mx-1 rounded-xl bg-white">
                    <Text className="text-lg p-2 pl-5">我的订单</Text>
                    <View className="flex-row justify-between mx-[7%] mb-4 mt-1">
                        <TouchableOpacity className="items-center w-20">
                            <CreditCardIcon
                                color="black"
                                size={Layout.window.width * 0.07}
                            />
                            <Text>待付款</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center w-20">
                            <TruckIcon
                                color="black"
                                size={Layout.window.width * 0.07}
                            />
                            <Text>待收货</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center w-20">
                            <ClockIcon
                                color="black"
                                size={Layout.window.width * 0.07}
                            />
                            <Text>历史</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Account Info */}
            <View className="m-4">
                <Text className="text-xl pl-3">账号</Text>
                <View className="py-1">
                    <NavigationLine text="修改登录密码" onPress={() => {}} />
                    <NavigationLine text="修改手机号码" onPress={() => {}} />
                </View>
            </View>
            {/* Account Security */}
            <View className="m-4">
                <Text className="text-xl pl-3">安全</Text>
                <View className="py-1">
                    <NavigationLine text="删除账户" onPress={() => {}} />
                    <NavigationLine text="退出登录" onPress={logout} />
                </View>
            </View>
        </ScrollView>
    );
}
