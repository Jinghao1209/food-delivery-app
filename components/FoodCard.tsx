import { Image, Text, TouchableOpacity, View } from "react-native";
import PlusIcon from "react-native-heroicons/solid/PlusIcon";

export default function FoodCard(options: FoodCardOptions) {
    return (
        <View
            className={
                "bg-white mx-4 my-1 rounded-xl flex-row h-28 items-center p-4"
            }
        >
            <Image
                source={{ uri: options.image }}
                className="w-20 h-20 rounded-xl"
            />
            <View className="pl-3 w-[75%]">
                <Text className="text-xl font-bold">{options.name}</Text>
                <Text className="text-xs -top-1">
                    {options.info.description}
                </Text>
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-sm font-bold">
                            ¥ {options.info.price}
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="p-3 -m-3"
                        onPress={options.onAdd}
                    >
                        <PlusIcon size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

/** @name INTERFACE.FoodCardOptions */
export interface FoodCardOptions {
    image: string;
    name: string;
    info: {
        description: string;
        price: string;
    };
    onAdd: (() => void) | (() => Promise<void>);
}
