import {NavigationContainer} from "@react-navigation/native";
import {NativeBaseProvider} from "native-base";
import theme from "../utils/theme";
export default function AppContainer({children}) {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
    </NavigationContainer>
  );
}
