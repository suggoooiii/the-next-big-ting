import {VStack, Image, Input, Text, Center, HStack, Stack} from "native-base";
import {Dimensions} from "react-native";

export default function InputComp(props) {
  const windowWidth = Dimensions.get("window").width;
  const MAX_WIDTH = windowWidth / 1.5;
  return (
    <Stack alignItems="center">
      <HStack space="4" alignItems="center">
        <Text>{props.txt}</Text>
        <Input
          maxWidth={MAX_WIDTH}
          py="3"
          placeholder={props.placeholder}
          rounded="md"
          variant="outline"
        />
      </HStack>
    </Stack>
  );
}
