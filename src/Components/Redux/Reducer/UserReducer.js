const initialState = {
  userInfo: undefined,
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
export default UserReducer;
