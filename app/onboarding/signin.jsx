import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomModal from "../../components/modal/customModal";
import { GoogleWeb } from "../../components/GoogleSigninWeb";
export default function Signin() {
  const [visible, setVisible] = useState(false);
  const toggleClose = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Log in</Text>
          <GoogleWeb />
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
