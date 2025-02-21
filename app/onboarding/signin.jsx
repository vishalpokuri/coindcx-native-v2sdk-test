import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import { BASE_API_URL } from "../../constants/ngrokRoute";
import { setItem } from "../../utils/asyncStorage";
import CustomModal from "../../components/modal/customModal";
import { ManualTokenInput } from "../../components/GoogleSigninText";

export default function Signin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleClose = () => {
    setVisible(false);
  };
  const submit = async () => {
    try {
      await setItem("email", form.email);
      setIsSubmitting(true);
      const response = await fetch(`${BASE_API_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          router.push(`./signup/otp?otpToken=${data.otpToken}`);
          setIsSubmitting(false);
        }, 500);
      } else {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 1600);
      }
    } catch (err) {
      console.error("Error logging in: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Log in</Text>
          <ManualTokenInput />
        </View>
        <CustomModal
          animSource="fail"
          title="Email and Password doesn't match, Try again!"
          isVisible={visible}
          onClose={toggleClose}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    width: "100%",
    padding: 24,
    minHeight: "85%",
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
    textAlign: "left",
    fontWeight: "600",
    color: "white",
  },
});
