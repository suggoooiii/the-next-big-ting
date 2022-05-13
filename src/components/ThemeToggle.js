import {HStack, Switch, useColorMode, SunIcon, MoonIcon} from "native-base";

export default function ThemeToggle() {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <HStack space={3} mx="auto" alignItems="center">
      <MoonIcon size={5} />
      <Switch isChecked={colorMode === "light"} onToggle={toggleColorMode} />
      <SunIcon size={5} />
    </HStack>
  );
}
