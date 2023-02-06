import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ClockIcon from "react-native-heroicons/outline/ClockIcon";
import CreditCardIcon from "react-native-heroicons/outline/CreditCardIcon";
import TruckIcon from "react-native-heroicons/outline/TruckIcon";

import NavigationLine from "../components/NavigationLine";
import Layout from "../constants/Layout";

export default function MySpace() {
    return (
        <ScrollView>
            {/* User Info */}
            <View className="bg-white m-2 rounded-md">
                <View className="flex-row p-3 pl-5">
                    <Image
                        source={require("../assets/images/react.png")}
                        className="h-20 w-20 rounded-xl"
                    />
                    <TouchableOpacity className="ml-5 justify-center w-[50vw]">
                        <Text className="text-xl font-bold">USERNAME</Text>
                        <Text className="text-xs">修改个人信息 {">"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* List */}
            <View className="p-4">
                <View className="mx-1 rounded-xl bg-white">
                    <Text className="text-xl p-3 pl-5">我的订单</Text>
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
            <View className="p-4">
                <Text className="text-xl pl-3">账号</Text>
                <View className="py-1">
                    <NavigationLine
                        marginHorizontal={Layout.window.width * 0.25}
                        text="修改登录密码"
                        onPress={() => {}}
                    />
                    <NavigationLine
                        marginHorizontal={Layout.window.width * 0.25}
                        text="修改手机号码"
                        onPress={() => {}}
                    />
                </View>
            </View>
            {/* Account Security */}
            <View className="p-4">
                <Text className="text-xl pl-3">安全</Text>
                <View className="py-1">
                    <NavigationLine
                        marginHorizontal={Layout.window.width * 0.29}
                        iconMarginHorizontal={Layout.window.width * 0.29}
                        text="删除账户"
                        onPress={() => {}}
                    />
                    <NavigationLine
                        marginHorizontal={Layout.window.width * 0.29}
                        text="退出登录"
                        onPress={() => {}}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
