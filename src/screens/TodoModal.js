import {useRef, useState} from "react";
import {TouchableWithoutFeedback, Keyboard} from "react-native";
import {
  useColorModeValue,
  Text,
  Box,
  useToast,
  CheckIcon,
  Divider,
  FormControl,
  Heading,
  HStack,
  MinusIcon,
  Stack,
  Switch,
  ScrollView,
} from "native-base";
import {useNavigation} from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import shortid from "shortid";
import DateTimePicker from "@react-native-community/datetimepicker";

// my comps
import AnimatedColorBox from "../components/AnimatedColorBox";
import AnimatedPressable from "../components/AnimatedPressable";
import InputComp from "../components/InputComp";

// imports from mainscreen
export default function TodoModal() {
  const [subject, setSubject] = useState("");
  const [isToday, setIsToday] = useState(false);
  const [withAlert, setWithAlert] = useState(false);
  const [date, setDate] = useState(new Date());
  const scrollRef = useRef(null);
  const toast = useToast();
  const toastIdRef = useRef();
  const navigation = useNavigation();

  const addToast = (title, color) => {
    toastIdRef.current = toast.show({
      render: () => {
        return (
          <Box bg={color} p="6" rounded="500" mb="2">
            {title}
          </Box>
        );
      },
    });
  };

  const addTodo = async () => {
    const newTodo = {
      id: shortid.generate(),
      subject,
      hour: isToday
        ? date.toISOString()
        : new Date(date).getTime() + 24 * 60 * 60 * 1000,
      isToday: isToday,
    };
    try {
      if (withAlert) {
        await scheduleTodoNotification(newTodo);
        addToast("Notifcation Is Set", "emerald.600");
      }
      navigation.goBack();
    } catch (e) {
      console.log(e);
      addToast("Error", "warning.600");
    }
  };

  /* Logic set trigger time to todo.hour if todo.isToday === true else set trigger time to todo.hour + 24 hours
  const trigger = todo.isToday ? todo.hour : new Date(todo.hour).getTime() + 24 * 60 * 60 * 1000;
 */
  const scheduleTodoNotification = async todo => {
    const trigger = new Date(todo.hour);
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alert! You have a task to do!",
          body: todo.text,
        },
        trigger,
      });
      console.log("Notification scheduled");
    } catch (e) {
      console.log("error", e);
    }
  };

  const onChangeSubject = subj => {
    setSubject(subj);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <AnimatedColorBox
        safeAreaTop
        flex={1}
        px="6"
        bg={useColorModeValue("warmGray.200", "warmGray.800")}
        w="full"
      >
        {/* onChange={(event, selectedDate) => setDate(selectedDate)} */}
        <ScrollView ref={scrollRef.current} w="full">
          <Stack
            space={1}
            alignSelf="center"
            safeArea
            w={{
              base: "100%",
              md: "25%",
            }}
          >
            <Box>
              <Text bold fontSize="md" mb="1">
                Task
              </Text>
              <FormControl mb="5">
                <FormControl.HelperText mb="1">
                  Your Task's Subject
                </FormControl.HelperText>
                <InputComp onChangeText={onChangeSubject} value={subject} />
              </FormControl>
              <Divider />
              <Box justifyContent="center" h="55" my="auto">
                <HStack space="2">
                  <Heading mr="4" my="auto" fontSize="md">
                    Set Alarm
                  </Heading>
                  <HStack p="10">
                    <MinusIcon size="md" my="auto" mx="2" />
                    <Switch
                      value={withAlert}
                      onValueChange={val => setWithAlert(val)}
                      name="Alert"
                      onTrackColor="emerald.500"
                      offTrackColor="red.600"
                      size="md"
                      my="auto"
                      mx="2"
                    />
                    <CheckIcon size="md" my="auto" mx="2" />
                  </HStack>
                </HStack>
              </Box>
              <Divider />
              <Box justifyContent="center" h="55" my="auto">
                <HStack space="6">
                  <Heading mr="10" my="auto" fontSize="md">
                    Today
                  </Heading>
                  <HStack p="10">
                    <MinusIcon size="md" my="auto" mx="2" />
                    <Switch
                      value={isToday}
                      onValueChange={val => setIsToday(val)}
                      onTrackColor="emerald.500"
                      offTrackColor="red.600"
                      size="md"
                      my="auto"
                      mx="2"
                    />
                    <CheckIcon size="md" my="auto" mx="2" />
                  </HStack>
                </HStack>
              </Box>
              <Divider />

              <FormControl mb="-16">
                <Text bold fontSize="md">
                  Date
                </Text>
                <FormControl.HelperText mt="-0.2" px="auto">
                  If you disable today, the task will be considered as tomorrow
                </FormControl.HelperText>
              </FormControl>
              <DateTimePicker
                display="clock"
                mode="time"
                simultaneousHandlers={scrollRef.current}
                value={date}
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  setDate(selectedDate);
                  console.log(
                    "🚀 ~ file: TodoModal.js ~ line 198 ~ TodoModal ~ selectedDate",
                    selectedDate
                  );
                }}
                onError={e => console.log("erroor", e)}
              />
              <AnimatedPressable onPress={addTodo}>
                <Box
                  opacity="0.8"
                  w="full"
                  p="4"
                  bg={useColorModeValue("warmGray.800", "warmGray.200")}
                  rounded="10"
                >
                  <Text
                    textAlign="center"
                    color="primary.400"
                    fontWeight={"700"}
                  >
                    Done !
                  </Text>
                </Box>
              </AnimatedPressable>
            </Box>
          </Stack>
        </ScrollView>
      </AnimatedColorBox>
    </TouchableWithoutFeedback>
  );
}
