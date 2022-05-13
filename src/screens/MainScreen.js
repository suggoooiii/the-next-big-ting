import "react-native-reanimated";
import {useCallback, useState} from "react";
import {Icon, VStack, useColorModeValue, Fab} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import shortid from "shortid";

// my Comps
import AnimatedColorBox from "../components/AnimatedColorBox";
import NavBar from "../components/NavBar";
import Notiees from "../components/Notiees";
import TaskList from "../components/animated-tasklist-item/TaskList";
import AnimatedText from "../components/AnimatedText";

/* navigation.push('Profile', { owner: 'Michaś' })
spush to Modal with todosData*/

const initialData = [
  {
    id: shortid.generate(),
    subject: "Buy movie tickets for Friday",
    done: false,
    hour: "12",
    isToday: true,
  },
  {
    id: shortid.generate(),
    subject: "Make a React Native tutorial",
    done: false,
    hour: "12",
    isToday: false,
  },
];

/* isToday ? date.toISOString(): new Date(date).getTime() + 24 * 60 * 60 * 1000, */
export default function MainScreen() {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState();

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject,
      };
      return newData;
    });
  }, []);
  const handleFinishEditingTaskItem = useCallback(() => {
    setEditingItemId(null);
  }, []);
  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.200", "warmGray.800")}
      w="full"
    >
      <Notiees image={require("../assets/done-task.png")}>
        <NavBar />
        <VStack space={2} my="10" alignItems="center">
          <AnimatedText text="Hello Friend !" />
        </VStack>
      </Notiees>

      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue("warmGray.200", "warmGray.800")}
        mt="-15px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="30px"
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="lg"
        icon={
          <Icon color="warmGray.50" as={<AntDesign name="plus" />} size="sm" />
        }
        bg={useColorModeValue("purple.400", "purple.600")}
        onPress={() => {
          const id = shortid.generate();
          setData([
            {
              id,
              subject: "",
              done: false,
            },
            ...data,
          ]);
          setEditingItemId(id);
        }}
      />
    </AnimatedColorBox>
  );
}
