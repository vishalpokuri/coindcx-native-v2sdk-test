import {
  Button,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as SystemUI from "expo-system-ui";
import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import WelcomeFlow from "../components/welcomeFlowComps/main";
import { OktoProvider } from "@okto_web3/react-native-sdk";
import { Buffer } from "buffer";
import { CLIENT_SWA, CLIENT_PRIVATE_KEY } from "../constants/keys";

// Make Buffer globally available
global.Buffer = global.Buffer || Buffer;

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });

const config = {
  environment: "sandbox",
  clientPrivateKey: CLIENT_PRIVATE_KEY,
  clientSWA: CLIENT_SWA,
};

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
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
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.spacer} />
          <WelcomeFlow />
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("./onboarding/signin")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </ScrollView>
        <StatusBar backgroundColor="#000000" style="light" />
      </SafeAreaView>
    </OktoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "100vh",
    flex: 1,
    backgroundColor: "#000",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    width: "100%",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "80%",
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
