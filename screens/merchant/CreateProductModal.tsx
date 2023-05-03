import axios from "axios";
import { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";

import { RootStackScreenProps } from "../../typings/types";
import CustomTextInput from "../../components/CustomTextInput";
import API from "../../constants/API";
import { useUserStore } from "../../store/userStore";
import { Product } from "../../typings/api";
import Colors from "../../constants/Colors";

export default function CreateProductModal({
    navigation,
    route,
}: RootStackScreenProps<"CreateProductModal">) {
    const client = useUserStore((state) => state.data);
    const defaultImage = require("../../assets/images/image_not_available.png");

    const [image, setImage] = useState<string>("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productName, setProductName] = useState("");

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

    const createProduct = () => {
        axios
            .post(
                API.POST_ADD_PRODUCT,
                {
                    description,
                    name: productName,
                    photo: image,
                    price,
                    shopId: route.params.shop.id,
                } as Product & { shopId: string },
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
                        navigation.navigate("ManageShopPage", {
                            shop: route.params.shop,
                        });
                    }
                } else {
                    console.log("screens/merchant/CreateProductModal.tsx", res);
                }
            });
    };

    const continueCreateProduct = () => {
        axios
            .post(
                API.POST_ADD_PRODUCT,
                {
                    description,
                    name: productName,
                    photo: image,
                    price,
                    shopId: route.params.shop.id,
                } as Product & { shopId: string },
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
                    
                    setDescription("");
                    setProductName("");
                    setImage("");
                    setPrice("");
                } else {
                    console.log("screens/merchant/CreateProductModal.tsx", res);
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
                        placeholderText="商品名字"
                        value={productName}
                        setValue={setProductName}
                    />
                    <CustomTextInput.Child
                        placeholderText="商品价格"
                        value={price}
                        setValue={setPrice}
                    />
                    <CustomTextInput.Child
                        placeholderText="商品描述"
                        value={description}
                        setValue={setDescription}
                    />
                </CustomTextInput.Parent>
                <View className="mt-5 items-center justify-center flex-row">
                    <View className="text-center items-center">
                        <Pressable
                            className="m-4 px-10 py-2 bg-white rounded-lg"
                            onPress={createProduct}
                        >
                            <Text
                                className="text-lg"
                                style={{ color: Colors.darkGreen.hex }}
                            >
                                确定
                            </Text>
                        </Pressable>
                    </View>
                    <View className="text-center items-center">
                        <Pressable
                            className="m-4 px-6 py-2 bg-white rounded-lg"
                            onPress={continueCreateProduct}
                        >
                            <Text
                                className="text-lg"
                                style={{ color: Colors.darkGreen.light }}
                            >
                                继续添加
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}
