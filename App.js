import "react-native-reanimated";
import * as Notifications from "expo-notifications";
import EntryWrapper from "./src/screens/EntryWrapper";
// import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return <EntryWrapper />;
}
