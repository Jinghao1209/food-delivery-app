import { Dimensions, Platform } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    isAndroid: Platform.OS === "android",
    isIOS: Platform.OS === "ios",
};
