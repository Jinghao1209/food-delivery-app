import axios from "axios";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { NavigationProp } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

import { RootTabParamList } from "../../typings/types";
import CustomTextInput from "../../components/CustomTextInput";
import API from "../../constants/API";
import { useUserStore } from "../../store/userStore";
import Layout from "../../constants/Layout";

export default function CreateShopModal({
    navigation,
}: {
    navigation: NavigationProp<RootTabParamList>;
}) {
    const client = useUserStore((state) => state.data);
    const defaultImage = require("../../assets/images/image_not_available.png");

    const [image, setImage] = useState<string>("");
    const [shopName, setShopName] = useState("");
    const [categoriesSelected, setCategoriesSelected] = useState<any[]>([]);
    const [categoriesSelectDropdownOpen, setCategoriesSelectDropdownOpen] =
        useState(false);
    const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");
    const [description, setDescription] = useState("");

    const shopCategories = [
        { label: "1", value: "1", disabled: true },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4", disabled: true },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
    ];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const createShop = () => {
        console.log({
            photo: image,
            name: shopName,
            estimatedDeliveryTime,
            description,
            category: categoriesSelected,
        });

        axios
            .post(
                API.POST_ADD_SHOP,
                {
                    userId: client.user?.id,
                    photo: image,
                    name: shopName,
                    estimatedDeliveryTime,
                    description,
                    category: categoriesSelected.join(","),
                },
                {
                    headers: {
                        Authorization: `Bearer ${client.token}`,
                    },
                }
            )
            .then((response) => {
                let res = response.data;

                if (res.code === 200) {
                    Alert.alert("操作成功！");
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                        navigation.navigate("MerchantPage");
                    }
                } else {
                    console.log("screens/merchant/CreateShopModal.tsx", res);
                }
            });
    };

    return (
        <View className="flex-1 justify-center items-center text-center">
            <View className="justify-center w-[70%]">
                <View className="items-center p-8">
                    <TouchableOpacity className="p-2" onPress={pickImage}>
                        <Image
                            source={
                                image.length === 0
                                    ? defaultImage
                                    : { uri: image }
                            }
                            className="w-28 h-28 rounded-lg"
                        />
                    </TouchableOpacity>
                </View>
                <CustomTextInput.Parent>
                    <CustomTextInput.Child
                        placeholderText="商店店名"
                        value={shopName}
                        setValue={setShopName}
                    />
                    {/* <MultipleSelectList
                        setSelected={(val: any) => setCategoriesSelected(val)}
                        data={shopCategories}
                        save="value"
                        label="商店类别"
                        searchPlaceholder="搜索 商店类别"
                        notFoundText="没有此类别"
                    /> */}
                    <View>
                        <DropDownPicker
                            style={{
                                marginBottom: categoriesSelectDropdownOpen
                                    ? Layout.window.height * 0.2
                                    : 0,
                                backgroundColor: "transparent",
                                borderColor: "rgba(0, 0, 0, 0.3)",
                            }}
                            open={categoriesSelectDropdownOpen}
                            setOpen={setCategoriesSelectDropdownOpen}
                            items={shopCategories}
                            value={categoriesSelected}
                            setValue={setCategoriesSelected}
                            disabledItemLabelStyle={{ opacity: 0.3 }}
                            multiple={true}
                            placeholder="选择类别"
                            multipleText={`已选择 ${categoriesSelected.length} 个类别`}
                        />
                    </View>
                    {!categoriesSelectDropdownOpen && (
                        <CustomTextInput.Child
                            placeholderText="配送时间"
                            value={estimatedDeliveryTime}
                            setValue={setEstimatedDeliveryTime}
                        />
                    )}
                    {!categoriesSelectDropdownOpen && (
                        <CustomTextInput.Child
                            placeholderText="商店描述"
                            value={description}
                            setValue={setDescription}
                        />
                    )}
                </CustomTextInput.Parent>
                {!categoriesSelectDropdownOpen && (
                    <View className="mt-5 items-center justify-center">
                        <TouchableOpacity onPress={createShop}>
                            <Text className="text-xl text-blue-600 px-[8%]">
                                创建
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}
