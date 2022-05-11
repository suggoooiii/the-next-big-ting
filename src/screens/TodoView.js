/* eslint-disable react-native/no-inline-styles */
import {Text, Pressable, Button, StyleSheet} from "react-native";
import {useNavigation, useTheme} from "@react-navigation/native";
import {useEffect} from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  View,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);
// eslint-disable-next-line react/prop-types
export default function TodoView() {
  const {colors} = useTheme();
  const progress = useSharedValue(0);

  const navigation = useNavigation();
  useEffect(() => {
    progress.value = 0;
  }, [progress]);

  const animatedStyles = useAnimatedStyle(() => {
    progress.value = withTiming(1, {duration: 100});
    return {
      opacity: progress.value,
    };
  }, [progress]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: "rgba(0, 0, 0, 0.5)"},
        ]}
        onPress={navigation.goBack}
      />

      <AnimatedView style={animatedStyles}>
        <Text>
          Mise en place is a French term that literally means “put in place.” It
          also refers to a way cooks in professional kitchens and restaurants
          set up their work stations—first by gathering all ingredients for a
          recipes, partially preparing them (like measuring out and chopping),
          and setting them all near each other. Setting up mise en place before
          cooking is another top tip for home cooks, as it seriously helps with
          organization. It’ll pretty much guarantee you never forget to add an
          ingredient and save you time from running back and forth from the
          pantry ten times.
        </Text>
        <Button
          title="Okay"
          color={colors.primary}
          style={{alignSelf: "flex-end"}}
          onPress={navigation.goBack}
        />
      </AnimatedView>
    </View>
  );
}

/* <Animated.View
        style={{
          padding: 16,
          width: "90%",
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: colors.card,
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      > */

/* </Animated.View> */
