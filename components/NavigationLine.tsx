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
        marginHorizontal: string | number;
        textMarginHorizontal?: string | number;
        iconMarginHorizontal?: string | number;
    }
) {
    return (
        <TouchableOpacity
            className="justify-center m-1 rounded-xl bg-white"
            onPress={options.onPress}
        >
            <View className="flex-row items-center justify-center min-w-max p-2">
                <Text
                    className="text-blue-500 text-base"
                    style={{
                        marginHorizontal: options.textMarginHorizontal ?? options.marginHorizontal,
                    }}
                >
                    {options.text}
                </Text>
                <ChevronRightIcon
                    style={{
                        marginHorizontal: options.iconMarginHorizontal ?? options.marginHorizontal,
                    }}
                    color={Colors.blue.link}
                />
            </View>
        </TouchableOpacity>
    );
}
