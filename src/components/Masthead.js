import React from "react"
import { Box, VStack, Heading, Image } from "native-base"

const Masthead = ({ title, image, children }) => {
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
      <Box flex={1} />
      <Heading color="white" p={6} size="xl">
        {title}
      </Heading>
    </VStack>
  )
}

export default Masthead
