/* eslint-disable no-shadow */
import shortid from "shortid";

/* const initialData = [
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
]; */

/*  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: isToday
        ? date.toISOString()
        : new Date(date).getTime() + 24 * 60 * 60 * 1000,
      isToday: isToday,
      isDone: false,
    };
    try {
      await AsyncStorage.setItem(
        "Todos",
        JSON.stringify([...listTodos, newTodo])
      );
      dispatch(addTodoReducer(newTodo));
      console.log("Todo saved correctly");
      if (withAlert) {
        await scheduleTodoNotification(newTodo);
      }
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }; */

export const createTaskSlice = (set, get) => ({
  values: [
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
  ],

  getTasks: () => {
    return get().tasks.values;
  },

  activeLength: () => {
    return get().tasks.values.filter(task => !task.done).length;
  },

  /*description: string */
  addTask: description => {
    set(state => ({
      tasks: {
        ...state.tasks,
        values: [
          ...state.tasks.values,
          {
            id: shortid.generate(),
            description,
            done: false,
          },
        ],
      },
    }));
  },

  /*id: string */
  removeTask: id => {
    set(state => ({
      tasks: {
        ...state.tasks,
        values: state.tasks.values.filter(task => task.id !== id),
      },
    }));
  },

  //id : string
  toggleDone: id => {
    set(state => ({
      tasks: {
        ...state.tasks,
        values: state.tasks.values.map(task => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            };
          }
          return task;
        }),
      },
    }));
  },

  isDeleted: () => {
    set(state => ({
      tasks: {
        ...state.tasks,
        values: state.tasks.values.filter(task => !task.done),
      },
    }));
  },
});

// let useStore = (set, get) => ({
//   tasks: [
//     {
//       id: 1,
//       subject: "subject subject",
//       Done: false,
//       deleted: false,
//       hour: undefined,
//     },
//     {
//       id: 2,
//       subject: "subject subject two",
//       isToday: false,
//       Done: false,
//       deleted: false,
//       hour: undefined,
//     },
//   ],
//   addTasks: payload =>
//     /* set((state) => ({
//       tasks: {
// 				...state.tasks,
// 				values: [
// 					...state.tasks.values,
// 					{
// 						id: uuid4(),
// 						description,
// 						done: false
// 					}
// 				]
// 			}
//     }))*/
//     set(
//       produce(draft => {
//         draft.tasks.push({
//           id: shortid.generate(),
//           subject: payload,
//           Done: false,
//           deleted: false,
//         });
//       })
//     ),
//   activeLength: () => {
//     set(produce(draft => {}));
//     return get().tasks.values.filter(task => !task.done).length;
//   },
//   removeTask: payload =>
//     set(
//       produce(draft => {
//         const taskIndex = draft.tasks.findIndex(task => task.id === payload.id);
//         draft.tasks.splice(taskIndex, 1);
//       })
//     ),

//   toggleDone: payload =>
//     set(
//       produce(draft => {
//         const task = draft.tasks.find(task => task.id === payload.id);
//         task.Done = !task.Done;
//       })
//     ),
//   toggledeleted: payload =>
//     set(
//       produce(draft => {
//         const task = draft.tasks.find(task => task.id === payload.id);
//         task.deleted = !task.deleted;
//       })
//     ),
// });

// useStore = devtools(useStore);

// export default useStore = create(useStore);

// let useStore = set => ({
//   tasks: [
//     {id: 1, text: "test task", Done: false, deleted: false},
//     {id: 2, text: "test task two", isDone: false, isDelete: false},
//   ],
//   addTasks: () =>
//     set(state => {
//       // tasks: {
//       //   id: shortid.generate(),
//       //   text: input,
//       //   isDelete: false,
//       //   isDone: false,
//       // },
//     }),
// removeTask: id =>
//   set(state => ({
//     tasks: state.tasks.filter(task => task.id !== id),
//   })),
// toggleIsDone: id =>
//   set(state => ({
//     tasks: state.tasks.map(task =>
//       task.id === id ? {...task, isDone: !task.isDone} : {...state.tasks},
//     ),
//   })),
// toggleIsDelete: id =>
//   set(state => ({
//     tasks: state.tasks.map(task =>
//       task.id === id ? {...task, isDelete: !task.isDelete} : {...state.tasks},
//     ),
//   })),
// editTask: (id, text) =>
//   set(state => ({
//     tasks: state.tasks.map(task => (task.id === id ? {text} : {...task})),
//   })),
// })

// "react-hooks/exhaustive-deps": [
//   "warn",
//   {
//     "additionalHooks": "(useMotiPressableTransition|useMotiPressable|useMotiPressables|useMotiPressableAnimatedProps|useInterpolateMotiPressable)"
//   }
// ],
