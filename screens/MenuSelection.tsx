import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import ProductCard from "../components/ProductCard";
import API from "../constants/API";
import { useCartStore } from "../store/useCartStore";
import { API_Response, Product } from "../typings/api";
import { RootStackScreenProps } from "../typings/types";

export default function MenuSelection({
    navigation,
    route,
}: RootStackScreenProps<"MenuSelection">) {
    const cart = useCartStore((state) => state);
    const [products, setProducts] = useState<Product[]>([]);
    const [isGetComplete, setIsGetComplete] = useState(false);
    const params = route.params;

    const onAdd = async (product: Product) => {
        // TODO: add to cart
        cart.addData({ product, count: 1 }, params.shop);

        Alert.alert("添加成功", "餐品 " + product.name + " 添加成功");
    };

    useEffect(() => {
        axios
            .get(API.GET_PRODUCTS + params.shop.id)
            .then((res) => {
                let data = res.data as API_Response<Product[]>;
                setProducts(data.data);
            })
            .catch((e) => {
                console.warn(e);
            })
            .finally(() => {
                setIsGetComplete(true);
            });
    }, [params]);

    if (!isGetComplete) return null;

    return (
        <ScrollView className="mb-4">
            <View
                className={
                    "bg-white m-5 rounded-xl flex-row items-center p-3 justify-center"
                }
            >
                <View className="px-3 w-[100%]">
                    <Text className="text-xl font-bold">
                        {params.shop.name}
                    </Text>
                    <Text className="text-base leading-1">
                        {params.shop.description}
                    </Text>
                    <View className="flex justify-center items-center py-1">
                        <View className="flex-row items-center">
                            <View>
                                <Text>{params.shop.rating} 分</Text>
                                <Text>
                                    {/* TODO: 距离 */}
                                    100 km, {params.shop.estimatedDeliveryTime}
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

            <View>
                <Text className="text-2xl font-bold ml-4 mt-4">为你推荐</Text>
                <View>
                    {products.map((v, i) => {
                        return (
                            <ProductCard
                                key={v.id}
                                image={v.photo}
                                name={v.name}
                                info={{
                                    description: v.description,
                                    price: v.price,
                                }}
                                onAdd={() => onAdd(v)}
                            />
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}
