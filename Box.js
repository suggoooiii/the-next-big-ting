import Animated, {
  useSharedValue,
  useAnimatedStyle
} from "react-native-reanimated"
import { Button, StyleSheet } from "react-native"
import { View } from "moti"

export const Box = () => {
  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }]
    }
  })

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={() => (offset.value = Math.random())} title="Move" />
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    color: "red",
    backgroundColor: "#fff",
    borderWidth: 1
  }
})
