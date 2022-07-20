export const chatReducer = (
  state = {
    name: null,
    addedMessage: false,
  },
  action
) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADDED_MESSAGE":
      return {
        ...state,
        addedMessage: !state.addedMessage,
      };
    default:
      return state;
  }
};
