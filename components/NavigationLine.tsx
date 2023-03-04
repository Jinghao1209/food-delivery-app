import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import ChevronRightIcon from "react-native-heroicons/solid/ChevronRightIcon";
import Colors from "../constants/Colors";

export default function NavigationLine(
    options: TouchableOpacityProps & {
        text: string;
    }
) {
    return (
        <TouchableOpacity
            className="justify-center m-1 rounded-xl bg-white"
            onPress={options.onPress}
        >
            <View className="flex-row items-center justify-between min-w-max p-2 px-4">
                <Text className="text-blue-500">{options.text}</Text>
                <ChevronRightIcon color={Colors.blue.link} size={20} />
            </View>
        </TouchableOpacity>
    );
}
