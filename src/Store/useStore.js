import create, {GetState, SetState} from "zustand";
import {devtools, persist} from "zustand/middleware";

import {FilterSlice, createFilterSlice} from "./createFilterSlice";
import {TaskSlice, createTaskSlice} from "./createTaskSlice";

// interface StoreState {
// filter: FilterSlice;
// tasks: TaskSlice;
// theme: ThemeSlice;
// }
//
// export type StoreSlice<T extends object> = (
// set: SetState<StoreState>,
// get: GetState<StoreState>
// ) => T;

/* StoreState: StoreState */

function deepMerge(savedState, currentState) {
  return {
    filter: {
      ...currentState.filter,
    },
    tasks: {
      ...currentState.tasks,
      ...savedState.tasks,
    },
    // 	theme: {
    // 		...currentState.theme,
    // 		...savedState.theme
    // 	}
    // };
  };
}

export const useStore = create(
  persist(
    (set, get) => ({
      filter: createFilterSlice(set, get),
      tasks: createTaskSlice(set, get),
      // theme: createThemeSlice(set, get)
    }),
    {
      name: "reanimated-todo-app",
      partialize: state => ({tasks: state.tasks, theme: state.theme}),
      //  stae as StoreState
      merge: (state, partialState) => deepMerge(state, partialState),
    }
  )
);
