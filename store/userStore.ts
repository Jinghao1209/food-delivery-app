import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { AsyncStorageUserData, Unsure } from "../typings/types";
import AsyncStorageKey from "../constants/AsyncStorageKey";
import axios from "axios";
import API from "../constants/API";
import { API_Response } from "../typings/api";
import { getUserAvatar } from "../hooks/getUserAvatar";

export const useUserStore = create<{
    data: Unsure<AsyncStorageUserData>;
    setAllData: () => Promise<void>;
    addData: (data: Unsure<AsyncStorageUserData>) => Promise<void>;
    setData: (data: Unsure<AsyncStorageUserData>) => Promise<void>;
}>((set, get) => ({
    data: {},
    async setAllData() {
        const storeData = await AsyncStorage.getItem(
            AsyncStorageKey.CLIENT_DATA
        );
        if (storeData) {
            try {
                let data = JSON.parse(
                    storeData
                ) as Unsure<AsyncStorageUserData>;

                if (
                    typeof data.token === "undefined" ||
                    typeof data.user === "undefined"
                )
                    return;

                let avatar = await getUserAvatar(data.token, data.user.id);
                if (avatar.success) {
                    data.user.avatar = avatar.data
                }

                // let res = await axios.post(API.POST_LOGIN, {
                //     token: "", // TODO: ask for valid token
                // });

                // TODO： get user data
                // axios
                //     .get(API.GET_USER + clientData.user?.id, {
                //         headers: {
                //             Authorization: "Bearer " + clientData.token,
                //         },
                //     })
                //     .then((res) => {
                //         const data = res.data as API_Response<User>;

                //         setUserData({
                //             token: clientData.token,
                //             user: data.data,
                //         });
                //     });
            } catch (e) {
                console.warn(e);
            }
        }
    },
    async addData(data: Unsure<AsyncStorageUserData>) {
        set({ data: { ...get().data, ...data } });
        // TODO: set token
        // await AsyncStorage.setItem(AsyncStorageKey.CLIENT_DATA, get().data);
    },
    async setData(data) {
        set({ data });
    },
}));
