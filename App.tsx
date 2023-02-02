import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import Loading from "./components/Loading";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return <Loading />;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}
