/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import {Box, Heading, Text, VStack} from "native-base";
import Animated, {FadeInDown} from "react-native-reanimated";
import {SafeAreaView} from "react-native-safe-area-context";
import BlobBackground from "../components/BlockBackground";
import AnimatedPressable from "../components/AnimatedPressable";

const AnimatedBox = Animated.createAnimatedComponent(Box);
function Entry({navigation}) {
  return (
    <Box flex={1}>
      <BlobBackground />
      <SafeAreaView style={{flex: 1}}>
        <VStack justifyContent={"space-between"} p="6" pt="3" flex={1}>
          <AnimatedBox
            py={"1"}
            entering={FadeInDown.duration(2000).delay(1000)}
          >
            <Text fontFamily="GishaBold" fontSize={25}>
              Suggoooiii-Task
            </Text>
          </AnimatedBox>
          <VStack>
            <AnimatedBox entering={FadeInDown.duration(1000).delay(1000)}>
              <Heading my={10}>Welcome to Suggoooiii-Tasks !</Heading>
            </AnimatedBox>
            <AnimatedBox entering={FadeInDown.duration(600).delay(1250)}>
              <Text fontFamily={"GishaBold"} color={"warmGray.200"}>
                Become way more organized and accomplish more tasks.
              </Text>
            </AnimatedBox>
            <AnimatedBox entering={FadeInDown.duration(600).delay(1500)}>
              <AnimatedPressable onPress={() => navigation.navigate("main")}>
                <Box w="full" p="4" bg="white" rounded="10" my={10}>
                  <Text
                    textAlign="center"
                    color="primary.200"
                    fontWeight={"700"}
                  >
                    Get Started!
                  </Text>
                </Box>
              </AnimatedPressable>
            </AnimatedBox>
          </VStack>
        </VStack>
      </SafeAreaView>
    </Box>
  );
}

export default Entry;
