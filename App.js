import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

const SIZE = 100.0
const CIRCLE_RADIUS = SIZE * 2

export default function App() {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const panGestureEnvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    },
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ]
    }
  })

  return (
    <GestureHandlerRootView style={styles.container}>
        <View style={styles.circle}>
          <PanGestureHandler onGestureEvent={panGestureEnvent}>
              <Animated.View style={[styles.box, rStyle]} />
          </PanGestureHandler>
        </View>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256, 0.5)',
    borderRadius: 20
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)'
  }
});
