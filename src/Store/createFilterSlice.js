// export interface FilterSlice {
//   value: string;
//   setFilter: (value: string) =``> void;
// }``
``;
export const createFilterSlice = set => ({
  value: "all",
  setFilter: value => {
    set(state => ({
      filter: {
        ...state.filter,
        value,
      },
    }));
  },
});
