import { Image, Text, TouchableOpacity, View } from "react-native";
import { Shop } from "../typings/api";

export default function ShopCard(
    options: CategoryCardOptions & { disabled?: boolean }
) {
    return (
        <TouchableOpacity
            className={
                "bg-white mx-4 my-1 rounded-xl flex-row h-28 items-center p-3"
            }
            onPress={options.navigate}
            disabled={options.disabled}
        >
            <Image
                source={{ uri: options.info.photo }}
                className="w-20 h-20 rounded-xl"
            />
            <View className="pl-3 w-[75%]">
                <Text className="text-xl font-bold">{options.info.name}</Text>
                <View className="flex-row items-center justify-between py-1">
                    <View>
                        <Text className="text-xs">{options.info.rating} 分</Text>
                        <Text className="text-xs">
                            {options.info.monthlySale}
                        </Text>
                    </View>

                    <Text className="text-xs">{options.info.estimatedDeliveryTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

/** @name INTERFACE.CategoryCardOptions */
export interface CategoryCardOptions {
    info: Shop;
    navigate: () => void;
}
