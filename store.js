/* eslint-disable no-shadow */
import produce from "immer";
import shortid from "shortid";
import create from "zustand";
import { devtools } from "zustand/middleware";

let useStore = (set) => ({
  tasks: [
    { id: 1, text: "test task", isDone: false, isDelete: false },
    { id: 2, text: "test task two", isDone: false, isDelete: false },
  ],
  addTasks: (payload) =>
    set(
      produce((draft) => {
        draft.tasks.push({
          id: shortid.generate(),
          text: payload,
          isDone: false,
          isDelete: false,
        });
      })
    ),
  removeTask: (payload) =>
    set(
      produce((draft) => {
        const taskIndex = draft.tasks.findIndex(
          (task) => task.id === payload.id
        );
        draft.tasks.splice(taskIndex, 1);
      })
    ),

  toggleIsDone: (payload) =>
    set(
      produce((draft) => {
        const task = draft.tasks.find((task) => task.id === payload.id);
        task.isDone = !task.isDone;
      })
    ),
  toggleIsDelete: (payload) =>
    set(
      produce((draft) => {
        const task = draft.tasks.find((task) => task.id === payload.id);
        task.isDelete = !task.isDelete;
      })
    ),
});

useStore = devtools(useStore);

export default useStore = create(useStore);

// let useStore = set => ({
//   tasks: [
//     {id: 1, text: "test task", isDone: false, isDelete: false},
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
