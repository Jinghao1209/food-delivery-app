import axios, { isAxiosError } from "axios";
import { useState, useEffect } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import SignalSlashIcon from "react-native-heroicons/solid/SignalSlashIcon";

import ShopCard from "../components/ShopCard";
import Loading from "../components/Loading";
import RootSeparator from "../components/RootSeparator";
import RowView from "../components/RowView";
import API from "../constants/API";
import Colors from "../constants/Colors";
import { Shop } from "../typings/api";
import { RootTabScreenProps } from "../typings/types";

export default function HomePage({
    navigation,
}: RootTabScreenProps<"HomePage">) {
    const [shop, setShop] = useState<Shop[]>([]);
    const [isGetComplete, setIsGetComplete] = useState(false);
    const [isNetworkError, setIsNetworkError] = useState(0);

    const loadData = async () => {
        await axios
            .get(API.GET_SHOPS)
            .then((res) => {
                let data = res.data as { code: number; data: Shop[] };
                setShop(data.data);

                setIsNetworkError(0);
            })
            .catch((e) => {
                if (isAxiosError(e) && e.message === "Network Error") {
                    setIsNetworkError((i) => i + 1);
                    console.log(`tried ${isNetworkError}`);
                } else {
                    console.warn(e);
                }
            })
            .finally(() => {
                setIsGetComplete(true);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (isNetworkError) {
            setTimeout(() => {
                // try to reacquire information
                loadData();
            }, 3000);
        }
    }, [isNetworkError]);

    if (!isGetComplete) return <Loading />;
    if (isNetworkError) {
        return (
            <View className="flex-1 items-center justify-center">
                <View className="flex-row items-center">
                    <SignalSlashIcon size={50} color="red" />
                    <View className="ml-2">
                        <Text className="text-xl">网络连接失败</Text>
                        <Text>是不是网络出现问题啦！</Text>
                    </View>
                </View>

                <Pressable onPress={() => loadData()} className="m-5">
                    <Text
                        style={{ color: Colors.blue.link }}
                        className="text-lg"
                    >
                        点击我重试
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView className="bg-gray-200">
            {/* header */}
            {/* <View className="flex-row items-center px-4 pb-4 pt-2 space-x-2 justify-between border-b border-gray-200 bg-gray-100">
                <View className="flex-row items-center space-x-2">
                    <Image
                        source={require("../assets/images/react.png")}
                        className="h-10 w-10 p-4 rounded-lg"
                    />
                    <Text className="text-xl font-bold">XX外卖</Text>
                </View>
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-md">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SearchPage")}
                    >
                        <SearchIcon size={25} color={Colors.blue.link} />
                    </TouchableOpacity>
                    <TextInput placeholder="搜索" />
                </View>
            </View> */}

            {/* Main */}
            {shop.map((v, i) => {
                return (
                    <ShopCard
                        key={v.id}
                        info={v}
                        navigate={() => {
                            navigation.navigate("MenuSelection", {
                                shop: v,
                            });
                        }}
                    />
                );
            })}
            {/* <View>
                    <RowView.Parent className="flex-row">
                        <RowView.Child
                            source={require("../assets/images/react.png")}
                            title="www"
                            color="white"
                        />
                        <RowView.Child
                            source={require("../assets/images/react.png")}
                            title="www"
                            color="white"
                        />
                        <RowView.Child
                            source={require("../assets/images/react.png")}
                            title="www"
                            color="white"
                        />
                        <RowView.Child
                            source={require("../assets/images/react.png")}
                            title="www"
                            color="white"
                        />
                        <RowView.Child
                            source={require("../assets/images/react.png")}
                            title="www"
                            color="white"
                        />
                    </RowView.Parent>
                </View> */}
            <RootSeparator />
        </ScrollView>
    );
}
