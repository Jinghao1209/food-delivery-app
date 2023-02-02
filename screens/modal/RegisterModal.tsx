import { useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomTextInput from "../../components/CustomTextInput";
import axios from "axios";
import { useUserStore } from "../../store";
import { NavigationProp, StackActions } from "@react-navigation/native";

export default function RegisterModal({
    navigation,
}: {
    navigation: NavigationProp<ReactNavigation.RootParamList>;
}) {
    const setData = useUserStore((state) => state.setData);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    // 商家, 骑手, 用户
    const [userType, setUserType] = useState("用户");
    const [isConfirmUserType, setIsConfirmUserType] = useState(false);
    const [registerStatus, setRegisterStatus] = useState({
        usernameEmpty: false,
        usernameEmptyMessage: "",
        passwordEmpty: false,
        passwordEmptyMessage: "",
        passwordNotSame: false,
        passwordNotSameMessage: "密码不相同！",
        phoneNumberEmpty: false,
        phoneNumberEmptyMessage: "",
    });

    const updateRegisterStatus = (newStatus: {
        usernameEmpty?: boolean;
        usernameEmptyMessage?: string;
        passwordEmpty?: boolean;
        passwordEmptyMessage?: string;
        passwordNotSame?: boolean;
        passwordNotSameMessage?: string;
        phoneNumberEmpty?: boolean;
        phoneNumberEmptyMessage?: string;
    }) => {
        setRegisterStatus((status) => ({ ...status, ...newStatus }));
    };

    const handleRegister = () => {
        let c = true;
        if (username === "") {
            c = false;
            updateRegisterStatus({
                usernameEmpty: true,
                usernameEmptyMessage: "用户名不能为空！",
            });
        } else updateRegisterStatus({ usernameEmpty: false });
        if (password === "") {
            c = false;
            updateRegisterStatus({
                passwordEmpty: true,
                passwordEmptyMessage: "密码不能为空！",
            });
        } else updateRegisterStatus({ passwordEmpty: false });
        if (phoneNumber === "") {
            c = false;
            updateRegisterStatus({
                phoneNumberEmpty: true,
                phoneNumberEmptyMessage: "手机号码不能为空！",
            });
        } else updateRegisterStatus({ phoneNumberEmpty: false });
        if (password !== confirmPassword) {
            c = false;
            updateRegisterStatus({ passwordNotSame: true });
        } else updateRegisterStatus({ passwordNotSame: false });

        if (!c) return;

        Alert.alert(
            "确认注册",
            `【${userType}注册】\n用户名：${username}\n手机号码：${phoneNumber}\n`,
            [
                {
                    text: "取消",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "确认",
                    onPress: confirmRegister,
                },
            ],
            { cancelable: false }
        );
    };

    const confirmRegister = () => {
        // TODO: handle api
        // axios.post("/api/user/register", {
        //     username,
        //     password,
        //     phone: phoneNumber,
        //     gender,
        //     userType
        // });

        setData({ token: "this is a token" });
        navigation.dispatch(StackActions.pop(1));
    };

    if (!isConfirmUserType) {
        return (
            <SafeAreaView className="flex-auto justify-center items-center text-center">
                <View className="min-w-[78%] max-w-[78%] justify-center">
                    <Picker
                        selectedValue={userType}
                        onValueChange={(itemValue, itemIndex) =>
                            setUserType(itemValue)
                        }
                    >
                        <Picker.Item label="商家注册" value="商家" />
                        <Picker.Item label="用户注册" value="用户" />
                        <Picker.Item label="骑手注册" value="骑手" />
                    </Picker>
                    <View className="mt-10 items-center justify-center">
                        <TouchableOpacity
                            onPress={() => setIsConfirmUserType(true)}
                        >
                            <Text
                                className="text-xl text-blue-600"
                                style={{ paddingHorizontal: "8%" }}
                            >
                                确认
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView className="flex-auto justify-center items-center text-center">
                <View className="min-w-[78%] max-w-[78%] justify-center">
                    <View className="items-center p-8">
                        <View className="w-[60%] border-b-2 items-center border-gray-300">
                            <Text className="text-4xl p-2 text-gray-800">
                                {userType}注册
                            </Text>
                        </View>
                    </View>
                    <CustomTextInput.Parent>
                        <CustomTextInput.Child
                            value={username}
                            setValue={setUsername}
                            placeholderText="用户名"
                            secureTextEntry={false}
                            autoCorrect={false}
                        />
                        {registerStatus.usernameEmpty && (
                            <View className="ml-1">
                                <Text className="text-red-600 ">
                                    {registerStatus.usernameEmptyMessage}
                                </Text>
                            </View>
                        )}
                        <CustomTextInput.Child
                            value={password}
                            setValue={setPassword}
                            placeholderText="密码"
                            secureTextEntry={true}
                            autoCorrect={false}
                        />
                        {registerStatus.passwordEmpty && (
                            <View className="ml-1">
                                <Text className="text-red-600 ">
                                    {registerStatus.passwordEmptyMessage}
                                </Text>
                            </View>
                        )}
                        <CustomTextInput.Child
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            placeholderText="确认密码"
                            secureTextEntry={true}
                            autoCorrect={false}
                        />
                        {registerStatus.passwordNotSame && (
                            <View className="ml-1">
                                <Text className="text-red-600 ">
                                    {registerStatus.passwordNotSameMessage}
                                </Text>
                            </View>
                        )}
                        <CustomTextInput.Child
                            value={phoneNumber ?? ""}
                            setValue={setPhoneNumber}
                            placeholderText="手机号码"
                            secureTextEntry={false}
                            keyboardType={
                                Platform.OS === "ios" ? "number-pad" : "numeric"
                            }
                        />
                        {registerStatus.phoneNumberEmpty && (
                            <View className="ml-1">
                                <Text className="text-red-600 ">
                                    {registerStatus.phoneNumberEmptyMessage}
                                </Text>
                            </View>
                        )}
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue)
                            }
                        >
                            <Picker.Item label="男" value="男" />
                            <Picker.Item label="女" value="女" />
                        </Picker>
                    </CustomTextInput.Parent>
                    <View className="mt-5 items-center justify-center">
                        <TouchableOpacity onPress={handleRegister}>
                            <Text
                                className="text-xl text-blue-600"
                                style={{ paddingHorizontal: "8%" }}
                            >
                                注册
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
