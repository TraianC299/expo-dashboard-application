import React, { useRef } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Animated, Easing, View } from 'react-native';
import { WINDOW_HEIGHT } from '../../constants/Layout';

const LoadingSpinner = ({color}) => {
    let spinValue = useRef(new Animated.Value(0)).current;

// First set up animation 
Animated.loop(Animated.timing(
    spinValue,
  {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true  // To make use of native driver for performance
  }
)).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
  return (
    <Animated.View style={{transform: [{rotate: spin}] }}>
        <FontAwesome5 name="spinner" size={WINDOW_HEIGHT*0.025} color={color} />
    </Animated.View>
  )
}

export default LoadingSpinner