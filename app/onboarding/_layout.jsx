import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const AuthLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: "#000",
          },
          presentation: "transparentModal",
          animationDuration: 200,
          animationEnabled: true,
          detachInactiveScreens: false,
          transitionSpec: {
            open: {
              animation: "spring",
              config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
              },
            },
            close: {
              animation: "spring",
              config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
              },
            },
          },
          // Enhanced cardStyleInterpolator for both directions
          cardStyleInterpolator: ({ current, next, layouts, closing }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
              opacity: current.progress,
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
            containerStyle: {
              opacity: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  })
                : 1,
            },
          }),
        }}
      >
        <Stack.Screen
          name="signin"
          options={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#000000" style="light" translucent={true} />
    </View>
  );
};

export default AuthLayout;
