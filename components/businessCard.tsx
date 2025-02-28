import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // Assuming you're using Expo

interface FormState {
  companyName: string;
  name: string;
  address: string;
  phoneNumber: string;
  description: string;
  email: string;
  position: string;
}
const PremiumBusinessCard: React.FC<FormState> = ({
  companyName,
  name,
  position,
  address,
  description,
  email,
  phoneNumber,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Top accent bar */}
        <View style={styles.accentBar} />

        <View style={styles.contentContainer}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.position}>{position}</Text>
            <View style={styles.companyContainer}>
              <Text style={styles.companyName}>{companyName}</Text>
            </View>
          </View>

          {/* Vertical divider */}
          <View style={styles.divider} />

          {/* Right Section */}
          <View style={styles.rightSection}>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Feather
                  name="map-pin"
                  size={16}
                  color="#D97706"
                  style={styles.icon}
                />
                <Text style={styles.detailText}>{address}</Text>
              </View>

              <View style={styles.detailRow}>
                <Feather
                  name="mail"
                  size={16}
                  color="#D97706"
                  style={styles.icon}
                />
                <Text style={styles.detailText}>{email}</Text>
              </View>

              <View style={styles.detailRow}>
                <Feather
                  name="phone"
                  size={16}
                  color="#D97706"
                  style={styles.icon}
                />
                <Text style={styles.detailText}>{phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 12,
    alignItems: "center",
  },
  card: {
    width: "100%",
    minWidth: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  accentBar: {
    height: 6,
    backgroundColor: "#D97706", // Amber-600
  },
  contentContainer: {
    flexDirection: "row",
    padding: 16,
  },
  leftSection: {
    width: "35%",
    justifyContent: "center",
    paddingRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937", // Gray-800
    marginBottom: 4,
  },
  position: {
    fontSize: 12,
    color: "#D97706", // Amber-600
    fontWeight: "500",
    marginBottom: 12,
  },
  companyContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB", // Gray-200
  },
  companyName: {
    fontSize: 14,
    color: "#4B5563", // Gray-600
    fontWeight: "600",
  },
  divider: {
    width: 1,
    backgroundColor: "#E5E7EB", // Gray-200
    marginHorizontal: 8,
  },
  rightSection: {
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: "#6B7280", // Gray-500
    marginBottom: 16,
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  detailText: {
    fontSize: 13,
    color: "#4B5563", // Gray-600
    flex: 1,
  },
});

export default PremiumBusinessCard;
