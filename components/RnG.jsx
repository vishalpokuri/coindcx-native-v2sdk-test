import {
  GoogleOneTapSignIn,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RnG = () => {
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
};

export default RnG;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000", // Setting background color to black
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "#fff", // Text color white for better contrast
    backgroundColor: "#222", // Darker background for input
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  message: {
    color: "#fff",
    marginTop: 10,
  },
});
