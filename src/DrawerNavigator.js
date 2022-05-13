import {createDrawerNavigator} from "@react-navigation/drawer";
import MainScreen from "./screens/MainScreen";
import Sidebar from "./components/SideBar";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        cardOverlayEnabled: true,
      }}
    >
      <Drawer.Screen name="main" component={MainScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
