import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import PlusCircleIcon from "react-native-heroicons/outline/PlusCircleIcon";
import API from "../../constants/API";
import { useUserStore } from "../../store/userStore";
import { Shop } from "../../typings/api";
import { RootTabScreenProps } from "../../typings/types";
import ShopCard from "../../components/ShopCard";
import UserType from "../../constants/UserType";

export default function MerchantPage({
    navigation,
}: RootTabScreenProps<"MerchantPage">) {
    const isFocused = useIsFocused();
    const client = useUserStore((state) => state.data);
    const [shops, setShops] = useState<Shop[]>([]);

    const getShop = async () => {
        // console.log(client);

        axios
            .get(API.GET_SHOP_BY_USER_ID + client.user?.id, {
                headers: { Authorization: `Bearer ${client.token}` },
            })
            .then((response) => {
                const res = response.data;

                if (res.code >= 200 && res.code < 300) {
                    let data = res.data;

                    // console.log(data);
                    setShops(data);
                } else {
                    console.warn("getShop", res);
                }
            })
            .catch((err) => {
                console.warn("screens/merchant/index.tsx: get shop by id", err);
            });
    };

    const createShop = () => {
        navigation.navigate("CreateShopModal");
    };

    useEffect(() => {
        getShop();
    }, []);

    useEffect(() => {
        if (typeof client.token === "undefined") {
            setShops([]);
        } else if (
            typeof client.user !== "undefined" &&
            typeof client.user.userType !== "undefined"
        ) {
            if (
                client.user.userType === UserType.MERCHANT ||
                client.user.userType === UserType.ADMINISTRATOR
            ) {
                getShop();
            } else {
                setShops([]);
            }
        }
    }, [client]);

    useEffect(() => {
        if (isFocused) {
            getShop();
            console.log("MerchantPage refresh");
        }
    }, [isFocused]);

    if (shops.length === 0) {
        return (
            <View className="flex-1 justify-center items-center">
                {shops.length === 0 && (
                    <View className="text-center items-center">
                        <TouchableOpacity className="p-2" onPress={createShop}>
                            <PlusCircleIcon color="black" size={30} />
                        </TouchableOpacity>
                        <Text className="text-lg">创建商店</Text>
                    </View>
                )}
            </View>
        );
    }

    return (
        <ScrollView className="flex-1">
            {shops.map((shop) => {
                return (
                    <ShopCard
                        key={shop.id}
                        info={shop}
                        navigate={() => {
                            navigation.navigate("ManageShopPage", { shop });
                        }}
                    />
                );
            })}
            <View className="text-center items-center">
                <TouchableOpacity className="m-8" onPress={createShop}>
                    <PlusCircleIcon color="black" size={40} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
