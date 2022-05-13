/* eslint-disable react/prop-types */
import "react-native-reanimated";
import {useEffect, memo} from "react";
import {Pressable, Text, HStack, Box} from "native-base";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor,
} from "react-native-reanimated";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

// props from TaskItem
const AnimatedTaskLabel = memo(props => {
  // textcolor === activeTextColor
  const {strikethrough, textColor, inactiveTextColor, onPress, children} =
    props;

  // xAxis-shared value for swiping
  const hstackOffset = useSharedValue(0);
  const hstackAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [{translateX: hstackOffset.value}],
    }),
    [strikethrough]
  );

  // animated-shared value for Text Color
  const textColorProgress = useSharedValue(0);
  const textColorAnimatedStyles = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value, //value
        [0, 1], // input range
        [textColor, inactiveTextColor] // output range
      ),
    }),
    [strikethrough, textColor, inactiveTextColor]
  );

  // animated-shared value for strikethrough
  const strikethroughWidth = useSharedValue(0);
  const strikethroughAnimatedStyles = useAnimatedStyle(
    () => ({
      width: `${strikethroughWidth.value * 100}%`,
      borderBottomColor: interpolateColor(
        textColorProgress.value, // val
        [0, 1], // input range
        [textColor, inactiveTextColor] // output range
      ),
    }),
    [strikethrough, textColor, inactiveTextColor]
  );

  // lifecycle
  useEffect(() => {
    // easing fn
    const easing = Easing.out(Easing.quad);
    if (strikethrough) {
      hstackOffset.value = withSequence(
        /*WithTimingConfig ==> duration, easing(fn) **/
        withTiming(4, {duration: 200, easing}),
        withTiming(0, {duration: 200, easing})
      );
      strikethroughWidth.value = withTiming(1, {duration: 400, easing});
      textColorProgress.value = withDelay(
        1000,
        withTiming(1, {duration: 400, easing})
      );
    } else {
      strikethroughWidth.value = withTiming(0, {duration: 400, easing});
      textColorProgress.value = withTiming(0, {duration: 400, easing});
    }
  });
  return (
    <Pressable onPress={onPress}>
      <AnimatedHStack alignItems="center" style={[hstackAnimatedStyles]}>
        <AnimatedText
          fontSize={19}
          noOfLines={1}
          isTruncated // render an ellipsis if true && exceeds length
          px={1}
          style={[textColorAnimatedStyles]}
        >
          {children}
        </AnimatedText>
        <AnimatedBox
          position="absolute"
          h={1}
          borderBottomWidth={1}
          style={[strikethroughAnimatedStyles]}
        />
      </AnimatedHStack>
    </Pressable>
  );
});

export default AnimatedTaskLabel;
