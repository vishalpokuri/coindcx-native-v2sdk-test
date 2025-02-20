import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
      //future use
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
        //Modal with custom display
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
    <SafeAreaView className="bg-[#000000] h-full">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ height: "100%" }}
      >
        <View className="w-full p-6 min-h-[85vh]">
          <Text className="text-3xl my-6 text-left font-semibold text-white">
            Log in
          </Text>
          {/* <TouchableOpacity
            className="bg-white rounded-md w-[80%] h-16 mb-4 mx-auto text-black items-center justify-center"
            onPress={() => router.push("/onboarding/signin")}
          >
            <Text className="font-bold text-lg">Continue with google</Text>
          </TouchableOpacity> */}
          {/* <GoogleSignInButton /> */}

          <ManualTokenInput />

          {/* Or section, login with google and Login with Solana */}
        </View>
        <CustomModal
          animSource="fail"
          title="Email and Password doesnt match, Try again!"
          isVisible={visible}
          onClose={toggleClose}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
