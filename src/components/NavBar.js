import {useCallback} from "react";
import {HStack, IconButton} from "native-base";
import {Feather} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <HStack w="full" h={40} alignItems="center" alignContent="center" p={4}>
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{
          as: Feather,
          name: "menu",
          size: 8,
          color: "warmGray.100",
        }}
      />
    </HStack>
  );
}
