import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { AsyncStorageUserData, Unsure } from "../typings/types";

export const useUserStore = create<{
    data: Unsure<AsyncStorageUserData>;
    setAllData: () => Promise<void>;
    setData: (data: Unsure<AsyncStorageUserData>) => Promise<void>;
}>((set, get) => ({
    data: {},
    async setAllData() {
        const storeData = await AsyncStorage.getItem("client.key");
        if (storeData) {
            try {
                set({ data: JSON.parse(storeData) });
            } catch (e) {
                console.warn(e);
            }
        }
    },
    async setData(data: Unsure<AsyncStorageUserData>) {
        set({ data: { ...get().data, ...data } });
        // TODO: set token
        // await AsyncStorage.setItem("client.key", get().data);
    },
}));
