import {useCallback, useEffect, useRef, useState} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {loadAsync} from "expo-font";
import {hideAsync, preventAutoHideAsync} from "expo-splash-screen";
import {NavigationContainer} from "@react-navigation/native";
import {Box, NativeBaseProvider} from "native-base";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// my imports
import DrawerNavigator from "../DrawerNavigator";
import Fonts from "../assets/fonts";
import {NavigationContext} from "../utils/context";
import {theme, navigationCardTheme} from "../utils/theme";
import TodoModal from "../screens/TodoModal";
import Entry from "../components/Entry";

const Stack = createNativeStackNavigator();

export default function EntryWrapper() {
  const [Loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const NavigationRef = useRef();

  // lifecycle
  useEffect(() => {
    async function loadAssets() {
      try {
        // const AsyncData = await AsyncStorage.getItem("suggoooiii-data");
        await preventAutoHideAsync();
        await loadAsync({...Fonts.Raleway, ...Fonts.Gisha, ...Fonts.SFMono});
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadAssets();
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token))
      .catch(e => console.log(e.message));
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const {status: existingStatus} =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // eslint-disable-next-line no-alert
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      return;
    }
    if ({Platform}.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  };

  // layout
  const onLayOutView = useCallback(async () => {
    if (!Loading) {
      setTimeout(async () => await hideAsync(), 500);
    }
  }, [Loading]);

  return (
    <NavigationContainer theme={navigationCardTheme} ref={NavigationRef}>
      <NativeBaseProvider theme={theme}>
        {!Loading ? (
          <Box onLayout={onLayOutView} flex={1}>
            <NavigationContext.Provider
              value={{NavigationRef: NavigationRef.current}}
            >
              <GestureHandlerRootView style={{flex: 1}}>
                <Stack.Navigator
                  initialRouteName="entry"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen
                    name="todoview"
                    component={TodoModal}
                    options={{
                      animation: "flip",
                      presentation: "modal",
                    }}
                  />
                  <Stack.Screen name="drawer" component={DrawerNavigator} />
                  <Stack.Screen name="entry" component={Entry} />
                </Stack.Navigator>
              </GestureHandlerRootView>
            </NavigationContext.Provider>
          </Box>
        ) : (
          <Box
            positon="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            bg="primary.200"
          />
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
