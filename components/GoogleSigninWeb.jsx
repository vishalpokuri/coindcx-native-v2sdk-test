import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useOkto } from "@okto_web3/react-native-sdk";

WebBrowser.maybeCompleteAuthSession();
// const webClientId =
//   "1097484439666-0pq2i05v213kld7difn3trnko19to6uo.apps.googleusercontent.com";
// // const webClientId =
// //   "383563567180-d8cbikc6k3akpmbjcfipr31qa6nrv4m2.apps.googleusercontent.com";
// const androidClientId =
//   "383563567180-crq3913hoqbjho6g621u05jb809tno2j.apps.googleusercontent.com";

// const config = {
//   webClientId,
//   androidClientId,
// };
export function GoogleWeb() {
  const oktoClient = useOkto();
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "383563567180-d8cbikc6k3akpmbjcfipr31qa6nrv4m2.apps.googleusercontent.com", //for web & Expo Go
    // iosClientId: "YOUR_IOS_CLIENT_ID", //for ios
    androidClientId:
      "383563567180-crq3913hoqbjho6g621u05jb809tno2j.apps.googleusercontent.com", //for android
    scopes: ["openid", "profile", "email"],
  });

  const handleAuthenticate = async (idToken) => {
    try {
      const response = await oktoClient.loginUsingOAuth({
        idToken: idToken,
        provider: "google",
      });
      console.log("Authenticated with Okto", response);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  useEffect(() => {
    console.log(response);
    if (response?.type === "success" && response.authentication) {
      const { authentication } = response;
      const token = authentication.accessToken;
      console.log("Access Token:", token);
      handleAuthenticate(token); // Call authentication function with token
    } else if (response?.type === "success" && !response.authentication) {
      console.log("Authentication object not ready yet, retrying...");
    } else {
      console.log("Unable to get the access token");
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Okto</Text>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: "#4285F4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
