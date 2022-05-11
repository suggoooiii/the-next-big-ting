import "react-native-reanimated";
import {useCallback, useState} from "react";
import {Icon, VStack, useColorModeValue, Fab} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
// import DateTimePicker from "@react-native-community/datetimepicker";
import shortid from "shortid";

// my Comps
import AnimatedColorBox from "../components/AnimatedColorBox";
import NavBar from "../components/NavBar";
import Masthead from "../components/Masthead";
import TaskList from "../components/animated-tasklist-item/TaskList";
import AnimatedText from "../components/AnimatedText";

const initialData = [
  {
    id: shortid.generate(),
    subject: "Buy movie tickets for Friday",
    done: false,
    hour: "12",
    isToday: false,
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
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const [withAlert, setWithAlert] = useState(false);

  const scheduleTodoNotification = async item => {
    const trigger = new Date(item.hour);
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alert! You have a task to do!",
          body: item.subject,
        },
        trigger,
      });
      console.log("Notification scheduled");
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert("The notification failed to schedule, make sure the hour is valid");
    }
  };

  const handleAlarmModal = useCallback(
    item => {
      setData(prevData => {
        const newData = [...prevData];
        const index = prevData.indexOf(item);
        newData[index] = {
          ...item,
          hour: isToday
            ? date.toISOString()
            : new Date(date).getTime() + 24 * 60 * 60 * 1000,
          isToday: isToday,
        };
        return newData;
      });
    },
    [date, isToday]
  );

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

  // onRemoveItem
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
      <Masthead image={require("../assets/done-task.png")}>
        <NavBar />
        <VStack space={2} my="10" alignItems="center">
          <AnimatedText text="Hello Friend !" />
        </VStack>
      </Masthead>

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
          handleAlarmModal={handleAlarmModal}
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
              isToday,
              hour: isToday
                ? date.toISOString()
                : new Date(date).getTime() + 24 * 60 * 60 * 1000,
            },
            ...data,
          ]);
          setEditingItemId(id);
        }}
      />
    </AnimatedColorBox>
  );
}
