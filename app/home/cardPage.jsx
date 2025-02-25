import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BusinessCard from "../../components/businessCard";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

const CardPage = () => {
  const { companyName, name, address, description, email, phoneNumber } =
    useLocalSearchParams();
  return (
    <SafeAreaView>
      <View>
        <Text>CardPage</Text>
        <BusinessCard
          companyName={companyName}
          name={name}
          address={address}
          description={description}
          email={email}
          phoneNumber={phoneNumber}
        />
      </View>
    </SafeAreaView>
  );
};

export default CardPage;

const styles = StyleSheet.create({});
