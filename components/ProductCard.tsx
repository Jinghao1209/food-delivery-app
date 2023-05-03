import { Image, Pressable, Text, View } from "react-native";
import { Product } from "../typings/api";
import ChevronRightIcon from "react-native-heroicons/solid/ChevronRightIcon";
import Colors from "../constants/Colors";

export default function ProductCard(options: ProductCardOptions) {
    return (
        <View
            className={
                "bg-white mx-4 my-1 rounded-xl flex-row h-28 items-center p-4"
            }
        >
            <Image
                source={{ uri: options.product.photo }}
                className="w-20 h-20 rounded-xl"
            />
            <View className="pl-3 w-[75%]">
                <Text className="text-xl font-bold">
                    {options.product.name}
                </Text>
                <Text className="text-xs -top-1">
                    {options.product.description}
                </Text>
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-sm font-bold">
                            ¥ {options.product.price}
                        </Text>
                    </View>
                    <Pressable
                        className="p-3 -m-3 flex-row items-center justify-between "
                        onPress={options.onPress}
                    >
                        <Text style={{ color: Colors.darkGreen.original }}>
                            修改
                        </Text>
                        <ChevronRightIcon
                            color={Colors.darkGreen.original}
                            size={20}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

/** @name INTERFACE.ProductCardOptions */
export interface ProductCardOptions {
    product: Product;
    onPress: (() => void) | (() => Promise<void>);
}
