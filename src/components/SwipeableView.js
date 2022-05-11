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

const StyledView = makeStyledComponent(Animated.View); // s-width = 348.837209302
const SCREEN_WIDTH = Dimensions.get("window").width; //375
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.3; // -150 (iphone_xs)
const R_THRESHOLD = SCREEN_WIDTH * 0.3; // ~= 100 (iphone_xs)

// props from taskItem
function SwipeableView(props) {
  const {children, backView, onSwipeLeft, simultaneousHandlers} = props;
  const translateX = useSharedValue(0);
  const navigation = useNavigation();

  const navigateOnEvent = () => navigation.navigate("todoview");

  const panGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      // console.log(context);
      context.x = translateX.value;
    },
    onActive: (e, _) => {
      translateX.value = e.translationX;
      console.log("translateX.value", translateX.value);
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value <= SWIPE_THRESHOLD;
      const shouldOpenAlarmModel = translateX.value >= R_THRESHOLD;
      // cond 1
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        onSwipeLeft && runOnJS(onSwipeLeft)();
      }
      // cond 2
      else if (shouldOpenAlarmModel) {
        runOnJS(navigateOnEvent)();
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

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
        <Box position="absolute" left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
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
