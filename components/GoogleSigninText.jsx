import React, { useState } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import { useOkto } from "@okto_web3/react-native-sdk";

export function ManualTokenInput() {
  const [idToken, setIdToken] = useState("");
  const [oktoClient, setOktoClient] = useState(null);
  const [message, setMessage] = useState("");

  const authenticateWithOkto = async () => {
    try {
      const okto = useOkto();
      await okto.loginUsingOAuth({
        idToken: idToken,
        provider: "google",
      });
      setOktoClient(okto);
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
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});
