// import { StyleSheet, Text, View } from "react-native";
// import React, { useEffect } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// const webClientId =
//   "383563567180-d8cbikc6k3akpmbjcfipr31qa6nrv4m2.apps.googleusercontent.com";
// const androidClientId =
//   "383563567180-crq3913hoqbjho6g621u05jb809tno2j.apps.googleusercontent.com";

// const config = {
//   webClientId,
//   androidClientId,
// };
// const  = () => {
//   const [request, response, promptAsync] = Google.useAuthRequest(config);

//   const handleToken = () => {
//     try {
//       if (response?.type === "success") {
//         const { authentication } = response;
//         const token = authentication?.accessToken;
//         console.log("Accesstoken: ", token);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     handleToken();
//   }, [response]);
//   return (
//     <View>
//       <Text>Signin with Google</Text>
//     </View>
//   );
// };
// //
// export default GoogleButton;

// const styles = StyleSheet.create({});
