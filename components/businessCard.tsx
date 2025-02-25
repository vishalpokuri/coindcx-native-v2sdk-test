import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BusinessCardProps {
  companyName: string;
  name: string;
  address: string;
  description: string;
  email: string;
  phoneNumber: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  companyName,
  name,
  address,
  description,
  email,
  phoneNumber,
}) => {
  return (
    <View style={styles.card}>
      {/* Left Section (Name & Company) */}
      <View style={styles.leftSection}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.companyName}>{companyName}</Text>
      </View>

      {/* Right Section (Other Details) */}
      <View style={styles.rightSection}>
        <Text style={styles.detail}>{address}</Text>
        <Text style={styles.detail}>{description}</Text>
        <Text style={styles.detail}>{email}</Text>
        <Text style={styles.detail}>{phoneNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#222", // Dark background for professional look
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
    justifyContent: "center",
  },
  rightSection: {
    flex: 2,
    paddingLeft: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  companyName: {
    fontSize: 16,
    color: "#bbb",
  },
  detail: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 4,
  },
});

export default BusinessCard;
