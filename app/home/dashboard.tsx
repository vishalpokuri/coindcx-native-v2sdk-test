import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useOkto, getAccount } from "@okto_web3/react-native-sdk";
import { getItem } from "../../utils/asyncStorage";
import BlackInput from "../../components/Input";
import { router } from "expo-router";

interface Account {
  caipId: string;
  networkName: string;
  address: string;
}
interface FormState {
  companyName: string;
  name: string;
  address: string;
  phoneNumber: string;
  description: string;
  email: string;
  position: string;
}
export default function Dashboard() {
  const oktoClient = useOkto();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [form, setForm] = useState<FormState>({
    companyName: "",
    name: "",
    address: "",
    description: "",
    email: "",
    phoneNumber: "",
    position: "",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      setIsLoading(true);
      setError("");

      try {
        // Get user's accounts
        const idToken = await getItem("idToken");

        await oktoClient.loginUsingOAuth({
          idToken: idToken,
          provider: "google",
        });

        console.log("Login successful, fetching accounts...");

        const userAccounts = await getAccount(oktoClient);

        if (isMounted) {
          // Verify the data structure and log it for debugging
          setAccounts(
            userAccounts.filter(
              (account: Account) => account.networkName === "BASE_TESTNET"
            )
          );
        } else {
          console.log("Invalid accounts data format");
          setError("Invalid accounts data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setError(`Error: ${(error as Error).message || "Unknown error"}`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          console.log("Loading completed");
        }
      }
    }

    fetchUserData();

    return () => {
      isMounted = false;
      console.log("Dashboard component unmounted");
    };
  }, []);

  // Debugging renders

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#bbbbbb" />
        <Text style={styles.loadingText}>Loading your accounts...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Text>Check the console for more details</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Account</Text>
        {accounts && accounts.length > 0 ? (
          accounts.map((account, index) => (
            <View key={account.caipId || index} style={styles.accountCard}>
              <Text>Network: {account.networkName || "Unknown"}</Text>
              <Text>Address: {account.address || "Unknown"}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyState}>No accounts found</Text>
        )}

        <View style={styles.divider}></View>
        <View style={styles.business}>
          <Text style={styles.title}>Add your Business Details</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "./cardPage",
                params: {
                  ...form,
                },
              })
            }
          >
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
        <BlackInput
          label="Company name"
          placeholder="John Doe Co."
          value={form.companyName}
          onChangeText={(e: string) => setForm({ ...form, companyName: e })}
        />
        <BlackInput
          label="Your name"
          placeholder="John Doe"
          value={form.name}
          onChangeText={(e: string) => setForm({ ...form, name: e })}
        />
        <BlackInput
          label="Position"
          placeholder="CEO"
          value={form.position}
          onChangeText={(e: string) => setForm({ ...form, position: e })}
        />
        <BlackInput
          label="Address"
          placeholder="XYZ st"
          value={form.address}
          onChangeText={(e: string) => setForm({ ...form, address: e })}
        />
        <BlackInput
          label="Description"
          placeholder="A good company"
          value={form.description}
          onChangeText={(e: string) => setForm({ ...form, description: e })}
        />
        <BlackInput
          label="Email"
          placeholder="abc@example.com"
          value={form.email}
          onChangeText={(e: string) => setForm({ ...form, email: e })}
        />
        <BlackInput
          label="Phone Number"
          placeholder="xxxxxxxxxx"
          value={form.phoneNumber}
          onChangeText={(e: string) => setForm({ ...form, phoneNumber: e })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    padding: 6,
  },
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  business: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 20,

    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    padding: 6,
    borderRadius: 10,
    color: "black",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  accountCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  emptyState: {
    fontStyle: "italic",
    color: "#666",
    marginVertical: 10,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth, // Creates a thin line
    borderBottomColor: "#ccc", // Light gray color
    marginVertical: 10,
  },

  debug: {
    fontSize: 10,
    color: "#999",
    marginTop: 5,
  },
});
