import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const {height, width} = Dimensions.get('screen')
const SIZE = width * 0.7

export default function Page({ title, index, translateX }) {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        )

        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP
        )

        return {
            borderRadius,
            transform: [
                {scale}
            ]
        }
    })

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(translateX.value, inputRange, [height/2,0,-height/2], Extrapolate.CLAMP)
        const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolate.CLAMP)
        return {
            opacity,
            transform: [
                {translateY}
            ]
        }
    })

    return (
        <View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,256, 0.${index + 2})` }]}>
            <Animated.View style={[styles.square, rStyle]} />
            <Animated.View style={[rTextStyle, { position: 'absolute' }]}>
                <Text style={styles.textTitle}>{title}</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        width, height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'rgba(0,0,256, 0.4)'
    },
    textTitle: {
        fontSize: 70,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: '700'
    }
})
