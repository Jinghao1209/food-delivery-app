import axios, { isAxiosError } from "axios";
import API from "../constants/API";

interface GetAvatarResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export async function getUserAvatar(
    token: string,
    userId: string
): Promise<GetAvatarResponse> {
    try {
        const response = await axios.get(API.GET_AVATAR + userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // error
        if (response.data.code < 200 || response.data.code >= 400) {
            return {
                success: false,
                data: response.data.msg,
            }
        };

        return {
            success: true,
            data: response.data.msg,
        };
    } catch (error) {
        if (isAxiosError(error)) {
            const message =
                error.response?.data?.message ?? "Failed to get avatar";
            return {
                success: false,
                message,
            };
        }

        return {
            success: false,
            message: "Unknown Error",
        };
    }
}
