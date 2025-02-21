import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useOkto, getAccount, getPortfolio } from "@okto_web3/react-native-sdk";
import { getItem } from "../../utils/asyncStorage";

export default function Dashboard() {
  const oktoClient = useOkto();
  const [accounts, setAccounts] = useState([]);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Get user's accounts
        const idToken = await getItem("idToken");
        await oktoClient.loginUsingOAuth({
          idToken: idToken,
          provider: "google",
        });
        const userAccounts = await getAccount(oktoClient);
        setAccounts(userAccounts.data);
        console.log(userAccounts.data);

        // Get user's portfolio
        const userPortfolio = await getPortfolio(oktoClient);
        setPortfolio(userPortfolio);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Accounts</Text>
      {accounts.map((account) => (
        <View key={account.caip_id} style={styles.accountCard}>
          <Text>Network: {account.network_name}</Text>
          <Text>Address: {account.address}</Text>
        </View>
      ))}

      <Text style={styles.title}>Portfolio</Text>
      <Text>{JSON.stringify(portfolio, null, 2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  accountCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
});
