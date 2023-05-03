import { Pressable, ScrollView, Text, View } from "react-native";
import { RootStackScreenProps } from "../../typings/types";
import Colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../constants/API";
import { useUserStore } from "../../store/userStore";
import { API_Response, Product } from "../../typings/api";
import ProductCard from "../../components/ProductCard";
import { useIsFocused } from "@react-navigation/native";

export default function ManageShopPage({
    navigation,
    route,
}: RootStackScreenProps<"ManageShopPage">) {
    const client = useUserStore((state) => state.data);
    const isFocused = useIsFocused();
    const shop = route.params.shop;

    const [products, setProducts] = useState<Product[]>([]);

    const createShop = () => {
        navigation.navigate("CreateProductModal", {
            shop: shop,
        });
    };

    const getProducts = () => {
        axios
            .get(API.GET_PRODUCTS + shop.id, {
                headers: { Authorization: `Bearer ${client.token}` },
            })
            .then((response) => {
                let res = response.data as API_Response<Product[]>;

                if (res.code === 200) {
                    setProducts(() => res.data);
                }
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (isFocused) {
            getProducts();
            console.log("ManageShopPage refreshing....");
        }
    }, [isFocused]);

    useEffect(() => {
        console.log("products", products);
    }, [products]);

    return (
        <ScrollView>
            <View
                className={
                    "bg-white m-5 rounded-xl flex-row items-center p-3 justify-center"
                }
            >
                <View className="px-3 w-[100%]">
                    <Text className="text-xl font-bold">{shop.name}</Text>
                    <Text className="text-base leading-1">
                        {shop.description}
                    </Text>
                    <View className="flex justify-center items-center py-1">
                        <View className="flex-row items-center">
                            <View>
                                <Text>{shop.rating} 分</Text>
                                <Text>
                                    {/* TODO: 距离 */}
                                    100 km, {shop.estimatedDeliveryTime}
                                </Text>
                            </View>
                            <View className="mx-[10%] border-l border-black h-10 bg-black" />
                            {/* TODO: 配送费 */}
                            <Text>
                                配送费 ¥{Math.floor(Math.random() * 5) + 1}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {products.map((p) => (
                <ProductCard
                    key={p.id}
                    product={p}
                    onPress={() => {
                        // TODO: edit product
                    }}
                />
            ))}

            <View className="text-center items-center">
                <Pressable
                    className="m-4 px-6 py-2 bg-white rounded-lg"
                    onPress={createShop}
                >
                    <Text
                        className="text-lg"
                        style={{ color: Colors.darkGreen.original }}
                    >
                        添加商品
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
