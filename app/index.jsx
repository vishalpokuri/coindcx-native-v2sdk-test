import { Button, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as SystemUI from "expo-system-ui";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import WelcomeFlow from "../components/welcomeFlowComps/main";
import { OktoProvider } from "@okto_web3/react-native-sdk";
import { Buffer } from "buffer";

// Make Buffer globally available
global.Buffer = global.Buffer || Buffer;

//mmkv test instance

// Create a storage instance

// Then use it like:
// storage.set('user', JSON.stringify(userData));
// const user = JSON.parse(storage.getString('user'));
// Configure SplashScreen before any component rendering
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const config = {
  environment: "sandbox",
  clientPrivateKey:
    "0x2aaa089f7e26ad3d2da3518e1e945d76804372b6bdd044c7f059598c31fa7dcc", // Replace with your actual private key
  clientSWA: "0xb532926d0dBC2799Cf8BE2d6e2F1ef8Bd27CaA0c", // Replace with your actual SWA
};

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Set system background color
        await SystemUI.setBackgroundColorAsync("#000000");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn("Error preparing app:", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Error hiding splash screen:", e);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <OktoProvider config={config}>
      <SafeAreaView className="bg-[#000] h-full" onLayout={onLayoutRootView}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ height: "100%" }}
        >
          <View className="w-full p-6" />
          <Text className="text-4xl font-bold text-white m-auto">
            Busisassy
          </Text>
          <WelcomeFlow />
          <TouchableOpacity
            className="bg-white rounded-md w-[80%] h-16 mb-4 mx-auto text-black items-center justify-center"
            onPress={() => router.push("/onboarding/signin")}
          >
            <Text className="font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
        </ScrollView>
        <StatusBar backgroundColor="#000000" style="light" />
      </SafeAreaView>
    </OktoProvider>
  );
}
