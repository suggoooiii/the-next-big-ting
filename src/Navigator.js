import {createDrawerNavigator} from "@react-navigation/drawer";
import Entry from "./components/Entry";
import MainScreen from "./screens/MainScreen";
import Sidebar from "./components/SideBar";

const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        cardOverlayEnabled: true,
      }}
      initialRouteName="entry"
    >
      <Drawer.Screen name="main" component={MainScreen} />
      <Drawer.Screen name="entry" component={Entry} />
    </Drawer.Navigator>
  );
};

export default Navigator;

/*       <Drawer.Screen
        name="addtodo"
        component={TodoModal}
        options={{
          presentation: "modal",
        }}
      />
 */

// options={{
//   presentation: "transparentModal",
//   headerShown: false,
// }}
