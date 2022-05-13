/* eslint-disable react/prop-types */
import {useNavigation} from "@react-navigation/native";
import {Box} from "native-base";
import {Dimensions} from "react-native";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

//my imports
import {makeStyledComponent} from "../utils/makeStyledComponent";

const StyledView = makeStyledComponent(Animated.View);
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = -SCREEN_WIDTH / 6;
const R_THRESHOLD = SCREEN_WIDTH / 6;

const AnimatedIcons = Animated.createAnimatedComponent(Box);

// props from taskItem
function SwipeableView(props) {
  const {children, backView, onSwipeLeft, simultaneousHandlers} = props;
  const translateX = useSharedValue(0);
  const navigation = useNavigation();

  const navigationOnSwipe = () => navigation.navigate("todoview");

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (e, _) => {
      translateX.value = e.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
      const shouldOpenAlarmModel = translateX.value >= R_THRESHOLD;
      // cond 1
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        onSwipeLeft && runOnJS(onSwipeLeft)();
      }
      // cond 2
      else if (shouldOpenAlarmModel) {
        runOnJS(navigationOnSwipe)();
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rIconContainerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      translateX.value < SWIPE_THRESHOLD || translateX.value > R_THRESHOLD
        ? 0
        : 1
    ),
  }));

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <StyledView w="full">
      {backView && (
        <AnimatedIcons
          style={rIconContainerStyle}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
        >
          {backView}
        </AnimatedIcons>
      )}
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <StyledView style={facadeStyle}>{children}</StyledView>
      </PanGestureHandler>
    </StyledView>
  );
}

export default SwipeableView;
