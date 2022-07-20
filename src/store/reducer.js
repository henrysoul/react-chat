export const chatReducer = (
  state = {
    name: null,
  },
  action
) => {
  switch (action.type) {
    // case employeeTypes.TOGGLE_LOADING_EMPLOYEES:
    //   return {
    //     ...state,
    //     loading: !state.loading,
    //   };
    default:
      return state;
  }
};
