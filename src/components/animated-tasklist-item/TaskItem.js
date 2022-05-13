/* eslint-disable react/prop-types */
import "react-native-reanimated";
import {useCallback} from "react";
import {
  Pressable,
  Box,
  HStack,
  useColorModeValue,
  Icon,
  Input,
  useToken,
} from "native-base";
import {Feather} from "@expo/vector-icons";

// my comps
import AnimatedTaskLabel from "./AnimatedTaskLabel";
import SwipableView from "../SwipeableView";
import AnimatedCheckbox from "../animated-tasklist-item/AnimatedCheckBox";

// props from AnimatedTaskItem
function TaskItem(props) {
  const {
    isEditing,
    isDone,
    onToggleCheckbox,
    subject,
    onPressLabel,
    onRemove,
    onChangeSubject,
    onFinishEditing,
    simultaneousHandlers,
  } = props;

  const highlightColor = useToken(
    "colors",
    useColorModeValue("purple.400", "purple.500")
  );
  const boxStroke = useToken(
    "colors",
    useColorModeValue("muted.300", "muted.500")
  );

  const checkmarkColor = useToken(
    "colors",
    useColorModeValue("white", "white")
  );

  const activeTextColor = useToken(
    "colors",
    useColorModeValue("darkText", "lightText")
  );
  const doneTextColor = useToken(
    "colors",
    useColorModeValue("muted.400", "muted.600")
  );

  // handleChangeTaskItemSubject
  const handleChangeSubject = useCallback(
    e => {
      onChangeSubject && onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject]
  );

  function backView() {
    return (
      <Box
        flexDirection={"row"}
        justifyContent="center"
        w="full"
        h="full"
        p="4"
      >
        <Icon
          // eslint-disable-next-line react-hooks/rules-of-hooks
          color={useColorModeValue("yellow.500", "yellow.400")}
          as={<Feather name="bell" />}
          size="lg"
          flex={2}
        />
        <Icon
          // eslint-disable-next-line react-hooks/rules-of-hooks
          color={useColorModeValue("red.700", "red.500")}
          as={<Feather name="trash-2" />}
          size="lg"
        />
      </Box>
    );
  }

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={backView()}
    >
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={3}
        bg={useColorModeValue("warmGray.200", "warmGray.800")}
      >
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckbox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        {isEditing ? (
          <Input
            placeholder="Task"
            value={subject}
            variant="unstyled"
            fontSize={20}
            px={1}
            py={2}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}
          >
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  );
}

export default TaskItem;
