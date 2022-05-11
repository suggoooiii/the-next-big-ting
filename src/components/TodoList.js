import { MotiView } from "moti";
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Text,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";

import useStore from "../../store";

const TodoList = ({ id, text, task }) => {
  const [isDone, setIsDone] = useState(false);
  const toast = useToast();
  const { toggleIsDone, toggleIsDelete } = useStore();

  const handleCheckBox = () => {
    setIsDone(!isDone);
    toggleIsDone(task);
  };

  // handle delete if !isDone => user Can't delete
  const handleIsDelete = () => {
    const currTask = task; // task obj
    if (currTask.isDone) {
      toggleIsDelete(currTask);
      console.log("deleted!");
      toast.show({
        title: "deleted!",
        placement: "bottom",
        description: `The Task ${currTask.text} is Successfully Deleted`,
        bgColor: "success.500",
        size: "lg",
      });
    } else {
      console.log(`The Task "${currTask.text}" is not done yet!`);
      toast.show({
        title: "cant delete",
        placement: "bottom",
        description: `The Task "${currTask.text}" Is Not Check yet!`,
        bgColor: "error.400",
        size: "lg",
      });
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateX: 10 }}
      transition={{
        type: "timing",
        duration: 150,
        translateY: { type: "spring" },
        translateX: { type: "spring" },
      }}
      style={{ paddingVertical: 6 }}
    >
      <Box>
        <HStack
          alignItems="center"
          space={6}
          mx={4}
          position="relative"
          key={id}
        >
          <Checkbox
            value="todoCheck"
            accessibilityLabel="todoCheck"
            onChange={handleCheckBox}
            isChecked={isDone}
          />
          <Text
            fontSize="xl"
            opacity={isDone ? "20" : "100"}
            strikeThrough={isDone}
          >
            {text}
          </Text>
          <IconButton
            icon={<Icon as={MaterialIcons} name="delete" size={6} />}
            position="absolute"
            right="0"
            colorScheme="danger"
            onPress={handleIsDelete}
          />
        </HStack>
      </Box>
    </MotiView>
  );
};

export default TodoList;
