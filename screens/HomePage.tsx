import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { RootTabScreenProps } from "../typings/types";

export default function HomePage({
    navigation,
}: RootTabScreenProps<"HomePage">) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HI!</Text>
            <View style={styles.separator} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
