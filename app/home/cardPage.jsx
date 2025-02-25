import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import BusinessCard from "../../components/businessCard";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
const CardPage = () => {
  const {
    companyName,
    name,
    address,
    description,
    email,
    phoneNumber,
    position,
  } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mint your Business Card</Text>

      <View style={styles.cardContainer}>
        <BusinessCard
          companyName={companyName}
          position={position}
          name={name}
          address={address}
          description={description}
          email={email}
          phoneNumber={phoneNumber}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.mintButton}>
          <Text style={styles.mintButtonText}>Mint your NFT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.faucetButton}>
          <Text style={styles.faucetButtonText}>Get Funds from Faucet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-between",
    paddingVertical: 24,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%", // Ensure full width
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20, // Add spacing around the card
  },
  buttonContainer: {
    marginTop: 20,
    gap: 16,
  },
  mintButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mintButtonText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  faucetButton: {
    backgroundColor: "#3b82f6", // Blue color
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faucetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
