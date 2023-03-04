import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import StopCircleIcon from "react-native-heroicons/outline/StopCircleIcon";
import CheckCircleIcon from "react-native-heroicons/solid/CheckCircleIcon";
import PlusIcon from "react-native-heroicons/solid/PlusIcon";
import MinusIcon from "react-native-heroicons/solid/MinusIcon";
import RectangleGroupIcon from "react-native-heroicons/solid/RectangleGroupIcon";
import RootSeparator from "../components/RootSeparator";
import Colors from "../constants/Colors";
import { useCartStore } from "../store/useCartStore";
import { CartData, CartItemsData } from "../typings/store";

export default function ShoppingCart() {
    const cartData = useCartStore((state) => state.data);
    const setCartData = useCartStore((state) => state.setData);
    const [selected, setSelected] = useState<{
        [K in string]: boolean;
    }>({});
    const [allSelected, setAllSelected] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const addCount = (shopId: string, id: string) => {
        let products = cartData[shopId].items;
        let product = products.find((t) => t.product.id === id);

        if (products && product) {
            product.count++;
            setCartData(Object.assign({}, cartData));
        }
    };

    const minusCount = (shopId: string, id: string) => {
        let products = cartData[shopId].items;
        let product = products.find((t) => t.product.id === id);

        if (products && product && product.count > 1) {
            product.count--;
            setCartData(Object.assign({}, cartData));
        }
    };

    useEffect(() => {
        console.log("SC cartData", cartData);

        setSelected((v) => Object.assign({}, v)); // refresh to let it recount
    }, [cartData]);

    useEffect(() => {
        let selectedId = Object.keys(selected);
        let x = 0;

        selectedId.forEach((v) => {
            let [shopId, productId] = v.split("-");
            let product = cartData[shopId].items.find(
                (t) => t.product.id === productId
            );

            if (product) {
                x += parseFloat(product.product.price) * product.count;
            }
        });

        setTotalCount(x);

        // set all selected
        let shopIds = Object.keys(cartData);
        let y = 0;

        shopIds.forEach((shopId) => {
            y += cartData[shopId].items.length;
        });

        setAllSelected(y === selectedId.length);
    }, [selected]);

    // if cart is empty
    if (Object.keys(cartData).length === 0) {
        return (
            <View className="flex-1 items-center justify-center">
                <View className="flex-row items-center">
                    <RectangleGroupIcon size={50} color="black" />
                    <View className="ml-2">
                        <Text className="text-xl">这位客官</Text>
                        <Text>你的购物车是空的哦！</Text>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1">
            {/* TODO: create location modal */}
            {/* expo-location */}
            {/* https://docs.expo.dev/versions/latest/sdk/location/ */}
            {/* https://docs.expo.dev/versions/latest/sdk/map-view/ */}
            {/* https://github.com/react-native-maps/react-native-maps */}
            <ScrollView className="w-[100%]">
                <CartView
                    addCount={addCount}
                    minusCount={minusCount}
                    data={cartData}
                    setSelected={setSelected}
                    selected={selected}
                    allSelected={allSelected}
                />
                <RootSeparator />
            </ScrollView>
            <View className="absolute bottom-0 w-[100%] flex-row justify-between items-center bg-white py-4">
                <TouchableOpacity
                    className="flex-row items-center pl-4"
                    onPress={() =>
                        setAllSelected((v) => {
                            if (v) {
                                setSelected({}); // set to empty
                                setTotalCount(0);
                            } else {
                                let IDs = Object.keys(cartData),
                                    x = 0,
                                    object = {} as any;

                                IDs.forEach((id) => {
                                    cartData[id].items.forEach((z) => {
                                        x +=
                                            parseFloat(z.product.price) *
                                            z.count;
                                        object[id + "-" + z.product.id] = true;
                                    });
                                });

                                setSelected(object);
                                setTotalCount(x);
                            }

                            return !v;
                        })
                    }
                >
                    {allSelected ? (
                        <CheckCircleIcon size={20} color={Colors.blue.link} />
                    ) : (
                        <StopCircleIcon size={20} color="gray" />
                    )}
                    <Text className="text-sm pl-1">全选</Text>
                </TouchableOpacity>
                <View className="flex-row items-center pr-4">
                    <View className="flex-row items-center">
                        <Text className="text-sm">合计：</Text>
                        <Text className="text-xs -bottom-1">¥</Text>
                        <Text className="text-xl font-bold">
                            {totalCount.toFixed(2)}
                        </Text>
                    </View>
                    {/* TODO: settlement */}
                    <TouchableOpacity
                        className="p-2 px-6 ml-2 rounded-full bg-[#669572]"
                        onPress={() => Alert.alert("结算成功", "请前往付款")}
                    >
                        <Text className="text-white">结算</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View className="absolute bottom-0 bg-black h-12">
            </View> */}
        </View>
    );
}

function CartView({
    addCount,
    minusCount,
    data,
    selected,
    allSelected,
    setSelected,
}: {
    addCount: (shopId: string, id: string) => void;
    minusCount: (shopId: string, id: string) => void;
    data: CartData;
    allSelected: boolean;
    selected: {
        [x: string]: boolean;
    };
    setSelected: React.Dispatch<
        React.SetStateAction<{
            [x: string]: boolean;
        }>
    >;
}) {
    return (
        <View>
            {Object.keys(data).map((v) => {
                return (
                    <View key={v} className="bg-white my-2 mx-4 rounded-xl p-2">
                        <Text className="text-2xl font-extrabold p-2">
                            {data[v].shop.name}
                        </Text>
                        {data[v].items.map((c, i) => (
                            <CategoryCard
                                key={c.product.id}
                                value={c}
                                selected={selected}
                                allSelected={allSelected}
                                setSelected={setSelected}
                                addCount={addCount}
                                minusCount={minusCount}
                            />
                        ))}
                    </View>
                );
            })}
        </View>
    );
}

function CategoryCard({
    addCount,
    allSelected,
    minusCount,
    selected,
    setSelected,
    value,
}: {
    addCount: (shopId: string, id: string) => void;
    minusCount: (shopId: string, id: string) => void;
    value: CartItemsData;
    allSelected: boolean;
    selected: {
        [x: string]: boolean;
    };
    setSelected: React.Dispatch<
        React.SetStateAction<{
            [x: string]: boolean;
        }>
    >;
}) {
    return (
        <View key={Math.random()}>
            <View className="flex-row justify-between items-center py-3 border-y border-gray-200 mx-2">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="p-2"
                        onPress={() => {
                            setSelected((v) => {
                                if (allSelected) {
                                    delete v[
                                        value.product.shopId +
                                            "-" +
                                            value.product.id
                                    ];
                                } else {
                                    let self =
                                        v[
                                            value.product.shopId +
                                                "-" +
                                                value.product.id
                                        ];

                                    if (self) {
                                        delete v[
                                            value.product.shopId +
                                                "-" +
                                                value.product.id
                                        ];
                                    } else {
                                        v[
                                            value.product.shopId +
                                                "-" +
                                                value.product.id
                                        ] = true;
                                    }
                                }

                                return Object.assign({}, v);
                            });
                        }}
                    >
                        {selected[
                            value.product.shopId + "-" + value.product.id
                        ] ? (
                            <CheckCircleIcon
                                size={20}
                                color={Colors.blue.link}
                            />
                        ) : (
                            <StopCircleIcon size={20} color="gray" />
                        )}
                    </TouchableOpacity>
                    <Image
                        source={{ uri: value.product.photo }}
                        className="w-16 h-16 rounded-xl"
                    />
                    <View className="ml-2">
                        <Text className="text-xl font-bold">
                            {value.product.name}
                        </Text>
                        <Text>单价 ¥{value.product.price}</Text>
                    </View>
                </View>
                <View className="items-center pr-2">
                    <View className="flex-row items-center">
                        <Text className="text-xs -bottom-1">x</Text>
                        <Text className="text-xl font-bold">{value.count}</Text>
                    </View>
                    <View className="flex-row items-baseline">
                        <Text className="text-xs -bottom-1">¥</Text>
                        <Text className="text-sm font-bold">
                            {(
                                parseFloat(value.product.price) * value.count
                            ).toFixed(2)}
                        </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity
                            className="p-1"
                            onPress={() =>
                                minusCount(
                                    value.product.shopId,
                                    value.product.id
                                )
                            }
                        >
                            <MinusIcon
                                size={15}
                                color={value.count === 1 ? "gray" : "black"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="p-1"
                            onPress={() =>
                                addCount(value.product.shopId, value.product.id)
                            }
                        >
                            <PlusIcon size={15} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
