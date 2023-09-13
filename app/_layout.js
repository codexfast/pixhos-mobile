import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useCallback } from "react";

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        ManropeBold: require('../assets/fonts/Manrope-Bold.ttf'),
        ManropeRegular: require('../assets/fonts/Manrope-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }

    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null;
    }

    return <Stack />
}

export default Layout;