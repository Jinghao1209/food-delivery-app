import axios from "axios";
import { useEffect } from "react";
import { Text, View } from "react-native";
import API from "../../constants/API";
import { getUserAvatar } from "../../hooks/getUserAvatar";
import { useUserStore } from "../../store/userStore";

interface MultipartFile {
    name: string;
    size: number;
    type: string;
    data: any;
}

type UploadAvatarResponse = {
    success: true;
    message: string;
    avatarUrl: string;
};

type ErrorResponse = {
    success: false;
    message: string;
};

export default function EditAccount() {
    const userData = useUserStore((state) => state.data);

    const uploadAvatar = async (
        userId: string,
        file: any
    ): Promise<UploadAvatarResponse | ErrorResponse> => {
        try {
            const fileType = file.name.split(".").pop()?.toLowerCase();
            if (!(fileType === "jpg" || fileType === "jpeg")) {
                return {
                    success: false,
                    message: "图片仅支持jpg/jpeg格式",
                };
            }
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("file", file);
            const response = await axios.post(API.POST_AVATAR, formData, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });

            if (response.data.code >= 200 && response.data.code < 400) {
                return {
                    success: true,
                    message: response.data.msg,
                    avatarUrl: response.data.data,
                };
            } else {
                return {
                    success: false,
                    message: response.data.msg,
                };
            }
        } catch (error) {
            console.warn(error);
            return {
                success: false,
                message: "头像上传失败",
            };
        }
    };

    useEffect(() => {
        const dataURI =
            "data:image/png;base64,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";

        let avatar = getUserAvatar(userData.token!, userData.user?.id!);

        avatar.then((v) => {
            if (v.success) {
                let url = v.data.msg;
                console.log(`[EA] ${url}`);
            } else {
                // failed
                console.log("[EA]: failed to get user avatar");
            }
        });

        let res = uploadAvatar(userData.user?.id!, {
            uri: dataURI,
            type: "image/jpeg",
            name: "avatar.jpg",
        });

        res.then((v) => {
            if (v.success) {
                // TODO: handle success
            }
            console.log("[EA]: " + v.message);
        });
    }, []);

    return (
        <View>
            <Text>Edit acc</Text>
        </View>
    );
}
