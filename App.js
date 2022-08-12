import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from './components/Page';

const WORDS = ["What's", "up", "mobile", "dev"]

export default function App() {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  })

  return (
    <SafeAreaView>
      <Animated.ScrollView
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal
        styles={styles.container}
      >
        {WORDS.map((title, index) => {
          return <Page key={index.toString()} title={title} index={index} translateX={translateX} />
        })}
      </Animated.ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
