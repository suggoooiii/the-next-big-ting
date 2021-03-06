/* eslint-disable react/prop-types */
import {Box, Heading, Text} from "native-base";
import {memo, useEffect} from "react";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const AnimatedTextComponent = Animated.createAnimatedComponent(Heading);

function AnimatedText({text = "", delay, ...props}) {
  const TextArray = text.split(" ");
  const TextJSX = TextArray.map((word, index) => {
    return (
      <Box key={index} overflow="hidden" flexDirection="row">
        <EachWord
          word={word}
          index={index}
          wordIndex={index}
          delay={delay}
          {...props}
        />
        <Text>{index === TextArray.length - 1 ? "" : "   "}</Text>
      </Box>
    );
  });
  return (
    <Box flexWrap="wrap" flexDirection="row">
      {TextJSX}
    </Box>
  );
}

export default memo(AnimatedText);

function EachWord({word, wordIndex, delay, ...props}) {
  const EachChar = word.split("");
  const TextJSX = EachChar.map((t, index) => {
    return (
      <Box key={index} overflow="hidden" flexDirection="row">
        <EachLetter
          char={t}
          index={index}
          wordIndex={wordIndex}
          delay={delay}
          {...props}
        />
      </Box>
    );
  });
  return <Box flexDirection="row">{TextJSX}</Box>;
}

function EachLetter({char, index, wordIndex, delay, ...props}) {
  const transitionY = useSharedValue(0);
  const styles = useAnimatedStyle(() => ({
    opacity: transitionY.value,
    transform: [
      {
        translateY: interpolate(transitionY.value, [0, 1], [30, 0]),
      },
    ],
  }));
  useEffect(() => {
    transitionY.value = withDelay(
      (delay ? 2000 : 700) + wordIndex * 100 + index * 50,
      withTiming(1, {
        duration: 100 + wordIndex * 50 + index * 50,
        easing: Easing.in(Easing.out),
      })
    );
  }, [delay, index, transitionY, wordIndex]);
  return (
    <AnimatedTextComponent
      ellipsizeMode={"tail"}
      numberOfLines={1}
      style={styles}
      {...props}
    >
      {char}
    </AnimatedTextComponent>
  );
}
