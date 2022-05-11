import {Pressable} from "native-base";
import PropTypes from "prop-types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);

// eslint-disable-next-line react/prop-types
function AnimatedPressable({children, onPress, style}) {
  //shared scale
  const AnimatedPressableScaleShared = useSharedValue(1);
  //shared style
  const AnimatedPressableStyle = useAnimatedStyle(() => ({
    transform: [{scale: AnimatedPressableScaleShared.value}],
  }));

  function onPressIn() {
    AnimatedPressableScaleShared.value = withTiming(0.9);
  }
  function onPressOut() {
    AnimatedPressableScaleShared.value = withSpring(1);
  }
  return (
    <AnimatedPressableWrapper
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => onPress && onPress()}
      onLongPress={() => null}
      style={[style, AnimatedPressableStyle]}
    >
      {children}
    </AnimatedPressableWrapper>
  );
}
AnimatedPressable.proptypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default AnimatedPressable;
