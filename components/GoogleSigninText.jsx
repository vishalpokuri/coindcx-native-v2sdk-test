import React, { useState } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import { useOkto } from "@okto_web3/react-native-sdk";

export function ManualTokenInput() {
  const [idToken, setIdToken] = useState("");
  const [oktoClient, setOktoClient] = useState(null);
  const [message, setMessage] = useState("");

  const okto = useOkto();
  const authenticateWithOkto = async () => {
    try {
      await okto.loginUsingOAuth({
        idToken: idToken.toString(),
        provider: "google",
      });
      console.log("Login success");
      setOktoClient(okto);
      console.log(oktoClient);
      setMessage("Authentication successful!");
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage("Authentication failed. Check console for details.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter ID Token:</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste ID Token here"
        value={idToken}
        onChangeText={setIdToken}
      />
      <Button title="Authenticate with Okto" onPress={authenticateWithOkto} />
      {message ? (
        <>
          <Text>{message}</Text>
        </>
      ) : null}
    </View>
  );
}

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
