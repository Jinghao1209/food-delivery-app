import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { AsyncStorageUserData, Unsure } from "../typings/types";
import AsyncStorageKey from "../constants/AsyncStorageKey";

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
                set({ data: JSON.parse(storeData) });
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
