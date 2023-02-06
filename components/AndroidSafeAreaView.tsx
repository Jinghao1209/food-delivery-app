import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AndroidSafeAreaView(
    props: ViewProps
) {
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View {...props} style={{ top: safeAreaInsets.top }} />
    );
}
