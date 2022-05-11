import * as React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Input,
  useColorModeValue,
  VStack,
  Text,
  HStack,
  Stack,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useNavigation} from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import shortid from "shortid";

// my comps
import AnimatedColorBox from "../components/AnimatedColorBox";
import AnimatedText from "../components/AnimatedText";
import InputComp from "../components/InputComp";

export default function TodoModal() {
  const [subject, setSubject] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [isToday, setIsToday] = React.useState(false);
  const [withAlert, setWithAlert] = React.useState(false);
  // const [listTodos, setListTodos] = React.useState([]);
  const navigation = useNavigation();

  // await AsyncStorage.setItem(
  // "Todos",
  // JSON.stringify([...listTodos, newTodo])
  // );
  // dispatch(addTodoReducer(newTodo));
  // console.log("Todo saved correctly");

  // {
  // id: shortid.generate(),
  // subject: "Buy movie tickets for Friday",
  // done: false,
  // hour: "12",
  // isToday: false,
  // },
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
      }
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const scheduleTodoNotification = async todo => {
    // set trigger time to todo.hour if todo.isToday === true else set trigger time to todo.hour + 24 hours
    // const trigger = todo.isToday ? todo.hour : new Date(todo.hour).getTime() + 24 * 60 * 60 * 1000;
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
      // eslint-disable-next-line no-alert
      alert("The notification failed to schedule, make sure the hour is valid");
    }
  };

  /*     <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.200", "warmGray.800")}
      w="full"
    > */
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {/* <View style={styles.container}> */}
      <AnimatedColorBox
        safeArea
        flex={1}
        p="7"
        bg={useColorModeValue("warmGray.200", "warmGray.800")}
        w="full"
      >
        <InputComp txt="Task" placeholder="Task" />

        {/* 
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Task"
            placeholderTextColor="#00000030"
            onChangeText={text => {
              setSubject(text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Hour</Text>
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            onChange={(event, selectedDate) => setDate(selectedDate)}
            style={{width: "80%"}}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            {paddingBottom: 0, alignItems: "center"},
          ]}
        >
          <View>
            <Text style={styles.inputTitle}>Today</Text>
            <Text
              style={{
                color: "#00000040",
                fontSize: 14,
                maxWidth: "84%",
                paddingBottom: 10,
              }}
            >
              If you disable today, the task will be considered as tomorrow
            </Text>
          </View>
          <Switch
            value={isToday}
            onValueChange={value => {
              setIsToday(value);
            }}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            {paddingBottom: 0, alignItems: "center"},
          ]}
        >
          <View>
            <Text style={styles.inputTitle}>Alert</Text>
            <Text style={{color: "#00000040", fontSize: 12, maxWidth: "85%"}}>
              You will receive an alert at the time you set for this reminder
            </Text>
          </View>
          <Switch
            value={withAlert}
            onValueChange={value => {
              setWithAlert(value);
            }}
          />
        </View>

        <TouchableOpacity onPress={addTodo} style={styles.button}>
          <Text style={{color: "white"}}>Done</Text>
        </TouchableOpacity> */}
      </AnimatedColorBox>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 1,
    width: "80%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 46,
    borderRadius: 11,
  },
});
