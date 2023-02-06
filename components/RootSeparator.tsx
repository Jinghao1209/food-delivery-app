import { View, ViewProps } from "react-native";

export default function RootSeparator(props: ViewProps) {
    return (
        <View
            {...props}
            style={{
                marginVertical: 30,
                height: 1,
                width: "80%",
            }}
        />
    );
}
