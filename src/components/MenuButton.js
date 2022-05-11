import {Button, Icon} from "native-base";
import {Feather} from "@expo/vector-icons";

function MenuButton({active, icon, children, ...props}) {
  return (
    <Button
      size="md"
      _light={{
        _pressed: {
          color: "warmGray",
          bg: "purple.200",
        },
        _text: {
          color: active ? "purple.800" : "darkText",
        },
      }}
      _dark={{
        _pressed: {
          bg: "purple.700",
        },
        _text: {
          color: active ? "purple.400" : "purple.50",
        },
      }}
      bg={active ? "transparent" : "transparent"}
      variant="solid"
      justifyContent="flex-start"
      leftIcon={
        <Icon
          as={Feather}
          name={icon}
          size="lg"
          opacity={1}
          _light={{
            color: "black",
          }}
          _dark={{
            color: "white",
          }}
        />
      }
      {...props}
    >
      {children}
    </Button>
  );
}

export default MenuButton;
