//TODO: Imports

import { WEB_CLIENT } from "@/constants/keys";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";
import { setItem, getItem } from "../utils/asyncStorage";
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export function GoogleWeb() {
  const [state, setState] = useState({});
  /*
  //WARNING:
  For GoogleSignin, you still need the androidClientId for Android apps
  Make sure you get the right SHA-1 key for the Android Client to initialise in Google Cloud
  Steps to follow:
  1. If you are using eas to build the production app - @react-native-google-signin/google-signin package doesnt allow you to use eas credentials's SHA 1 key, you have to generate the key using "keytool -keystore path/to/keystore.keystore -list -v" 
  Other wise, you will get the infamous DEVELOPER_ERROR or status code 10 error. This is the most important thing. 
  You can refer to this solution https://github.com/react-native-google-signin/google-signin/issues/1358
  2. If it didnt resolve the problem, make sure you followed all the steps in this doc: https://react-native-google-signin.github.io/docs/troubleshooting#developer_error
  */
  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId: WEB_CLIENT,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        offlineAccess: true,
        forceCodeForRefreshToken: false,
        accountName: "",
      });
      console.log("Configured successfully");
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response.data);
      await setItem("idToken", response.data?.idToken);

      if (isSuccessResponse(response)) {
        setState({ userInfo: response.data });
        router.push("/home/dashboard");
      } else {
        console.log("Signin cancelled by user");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        console.log(error);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Okto</Text>
      <TouchableOpacity style={styles.googleButton} onPress={signIn}>
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
