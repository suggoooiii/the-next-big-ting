/* eslint-disable react/prop-types */
import {VStack, Image} from "native-base";
export default function Masthead({image, children}) {
  return (
    <VStack h="300px" pb={5}>
      <Image
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        w="full"
        h="300px"
        resizeMode="cover"
        source={image}
        alt="masthead image"
      />
      {children}
    </VStack>
  );
}
