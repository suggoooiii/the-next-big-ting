/* eslint-disable react/prop-types */
import {Feather} from "@expo/vector-icons";
import {
  Avatar,
  Center,
  HStack,
  IconButton,
  useColorModeValue,
  VStack,
} from "native-base";
import {useCallback} from "react";
import AnimatedColorBox from "./AnimatedColorBox";
import AnimatedText from "./AnimatedText";
import MenuButton from "./MenuButton";
import ThemeToggle from "./ThemeToggle";

function Sidebar(props) {
  const {state, navigation} = props;
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate("main");
  }, [navigation]);
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate("entry");
  }, [navigation]);

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue("warmGray.200", "warmGray.800")}
      p={7}
    >
      <VStack flex={1} space={7}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="subtle"
            bg={useColorModeValue("purple.400", "purple.500")}
            _icon={{
              as: Feather,
              name: "chevron-left",
              size: 5,
              color: useColorModeValue("warmGray.50", "warmGray.100"),
            }}
          />
        </HStack>
        <Avatar
          source={require("../assets/takuya.jpg")}
          size="2xl"
          mb={2}
          borderColor={useColorModeValue("purple.600", "purple.500")}
          borderWidth={2}
        />
        <AnimatedText text="Suggoi" />
        <MenuButton
          active={currentRoute === "main"}
          onPress={handlePressMenuMain}
          icon="inbox"
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === "entry"}
          onPress={handlePressMenuAbout}
          icon="info"
        >
          Entry
        </MenuButton>
        <Center>
          <ThemeToggle />
        </Center>
      </VStack>
    </AnimatedColorBox>
  );
}

export default Sidebar;
