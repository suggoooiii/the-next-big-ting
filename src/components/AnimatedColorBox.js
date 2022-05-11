/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import "react-native-reanimated";
import {useEffect} from "react";
import {Box, useToken} from "native-base";
import usePrevious from "../utils/usePrevious";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const AnimatedBox = Animated.createAnimatedComponent(Box);

function AnimatedColorBox({bg, ...props}) {
  const hexBg = useToken("colors", bg);
  const prevHexBg = usePrevious(hexBg);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
  }, [hexBg]);

  const animatedStyles = useAnimatedStyle(() => {
    progress.value = withTiming(1, {duration: 100});
    return {
      backgroundColor: interpolateColor(
        progress.value, // curr val
        [0, 1], // input range
        [prevHexBg || hexBg, hexBg] // output range
      ),
    };
  }, [hexBg, progress]);
  return <AnimatedBox {...props} style={animatedStyles} />;
}

export default AnimatedColorBox;
