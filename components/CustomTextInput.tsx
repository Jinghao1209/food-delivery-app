import { useState } from "react";
import { Text, TextInput, TextInputProps, View, ViewProps } from "react-native";

export default {
    Child: TextInputChild,
    Parent: TextInputParent,
};

function TextInputParent(props: ViewProps) {
    return <View {...props} className="relative"></View>;
}

function TextInputChild(
    props: TextInputProps & {
        placeholderText: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
    }
) {
    const endFocusClassName = "absolute left-1 top-2 text-gray-600 text-sm";
    const onFocusClassName = "absolute left-1 -top-3.5 text-gray-600 text-sm";
    const [className, setClassName] = useState(endFocusClassName);

    const onFocus = () => {
        setClassName(onFocusClassName);
    };

    const endFocus = () => {
        if (props.value === "") setClassName(endFocusClassName);
    };

    return (
        <View style={{ marginVertical: "5%" }}>
            <Text className={className}>{props.placeholderText}</Text>
            <TextInput
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-black"
                onFocus={onFocus}
                onEndEditing={endFocus}
                onChangeText={props.setValue}
                {...props}
            />
        </View>
    );
}
