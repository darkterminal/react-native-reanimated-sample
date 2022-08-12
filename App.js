import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

const SIZE = 100.0

export default function App() {

  const progress = useSharedValue(1)
  const scale = useSharedValue(1)

  const handleRotation = (progress) => {
    'worklet'
    return `${progress.value * 2 * Math.PI}rad`
  }

  const ranimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [
        { scale: scale.value },
        { rotate: handleRotation(progress) }
      ]
    }
  }, [])

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 3, true)
    scale.value = withRepeat(withSpring(2), 3, true)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[{  height: SIZE, width: SIZE, backgroundColor: 'blue' }, ranimatedStyle]}></Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
