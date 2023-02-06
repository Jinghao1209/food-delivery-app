import {
    Image,
    ImageSourcePropType,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ViewProps,
} from "react-native";

export default {
    Parent: RowViewParent,
    Child: RowViewChild,
};

function RowViewParent(props: ViewProps) {
    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <View {...props} />
        </ScrollView>
    );
}

function RowViewChild(props: {
    source: ImageSourcePropType;
    title: string;
    color: string;
}) {
    return (
        <TouchableOpacity className="mr-2">
            <Image source={props.source} className="h-20 w-20 rounded" />
            <Text
                className="absolute bottom-1 left-1 text-white font-bold"
                style={{ color: props.color }}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}
