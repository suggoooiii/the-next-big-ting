import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {NativeBaseProvider} from "native-base"
import theme from "../theme"

export default function AppContainer(props) {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
    </NavigationContainer>
  )
}

