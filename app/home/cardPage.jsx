import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import BusinessCard from "../../components/businessCard";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PINATA_API_KEY,
  PINATA_API_SECRET,
  PINATA_JWT,
} from "../../constants/keys";
import ViewShot from "react-native-view-shot";
// const { PinataSDK } = require("pinata-web3");

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

  const viewShotRef = useRef();
  // const pinataSDK = new PinataSDK({
  //   pinataJwt: PINATA_JWT,
  //   pinataGateway: "https://gateway.pinata.cloud/ipfs/",
  // });
  const captureCard = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      console.log(uri);
      return uri;
    } catch (error) {
      Alert.alert("Error", "Failed to capture business card");
      console.error(error);
      return null;
    }
  };
  // const uploadToIPFS = async (imageUri, name, position, company) => {
  //   try {
  //     const formData = new FormData();
  //     const id = Math.floor(Math.random() * 100000);
  //     formData.append("file", {
  //       uri: imageUri,
  //       type: "image/png",
  //       name: `businessCard-${id}.png`,
  //     });

  //     // Upload Image to Pinata
  //     const response = await fetch(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       {
  //         method: "POST",
  //         headers: {
  //           pinata_api_key: PINATA_API_KEY,
  //           pinata_secret_api_key: PINATA_API_SECRET,
  //         },
  //         body: formData,
  //       }
  //     );

  //     const newResponse = await response.json();
  //     if (!newResponse.IpfsHash) throw new Error("Image upload failed.");

  //     const imageCid = newResponse.IpfsHash;
  //     console.log("Uploaded Image CID:", imageCid);

  //     // Create and Upload Metadata
  //     const metadata = {
  //       name: `${name}'s Business Card`,
  //       description: `Business card for ${name} at ${company}`,
  //       image: `ipfs://${imageCid}`,
  //       attributes: [
  //         { trait_type: "Name", value: name },
  //         { trait_type: "Position", value: position },
  //         { trait_type: "Company", value: company },
  //       ],
  //     };

  //     const metadataResponse = await fetch(
  //       "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           pinata_api_key: PINATA_API_KEY,
  //           pinata_secret_api_key: PINATA_API_SECRET,
  //         },
  //         body: JSON.stringify(metadata), // Stringify metadata before sending
  //       }
  //     );

  //     const newMetadataResponse = await metadataResponse.json();
  //     if (!newMetadataResponse.IpfsHash)
  //       throw new Error("Metadata upload failed.");

  //     console.log("Uploaded Metadata CID:", newMetadataResponse.IpfsHash);

  //     return `ipfs://${newMetadataResponse.IpfsHash}`;
  //   } catch (error) {
  //     console.error("Error uploading to IPFS:", error);
  //     return null;
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mint your Business Card</Text>

      <View style={styles.cardContainer}>
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
          <BusinessCard
            companyName={companyName}
            position={position}
            name={name}
            address={address}
            description={description}
            email={email}
            phoneNumber={phoneNumber}
          />
        </ViewShot>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.mintButton}
          onPress={() => {
            const uri = captureCard();
            if (uri) {
              const ipfsHash = uploadToIPFS(uri, name, position, companyName);
              console.log(ipfsHash);
            } else {
              console.log(error);
            }
          }}
        >
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
