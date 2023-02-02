import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { AsyncStorageData } from "../typings/types";

/**
 * 
 * @returns [isLoadingComplete, data]
 */
export default function useCachedStorage<K extends keyof AsyncStorageData>(
    key: K
): [boolean, AsyncStorageData[K]] {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load User Data
                let data = await AsyncStorage.getItem(key);
                if (data) setData(data);
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return [isLoadingComplete, data];
}
