import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import { FinalCTA } from "./template";

import Animated, { FadeIn } from "react-native-reanimated";
import WelcomeScreen from "./WelcomeScreen";
const { width } = Dimensions.get("window");

const WelcomeFlow = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / width);
    setCurrentPage(currentIndex);
  };

  return (
    <Animated.View
      entering={FadeIn.duration(500).delay(500)}
      style={styles.container}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {/* Window 5: Final CTA */}
        <View style={[styles.screen, { width }]}>
          <WelcomeScreen />
        </View>
      </ScrollView>

      {/* Dot Indicator */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "80%",
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default WelcomeFlow;
