import {
  CREATE_USER,
  SIGN_OUT,
  NEW_FRIEND,
  UPDATE_STATUS_FRIEND,
  DELETE_FRIEND,
  SIGN_IN,
} from "../../action/types";

export default (state = null, action) => {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return null;
    case NEW_FRIEND:
      if (!state.connections[action.payload._id]) {
        state.connections[action.payload._id] = action.payload;
      }
      return { ...state };
    case UPDATE_STATUS_FRIEND:
      if (state.connections[action.payload._id]) {
        const { user, _id } = action.payload;
        state.connections[_id] = user;
        state.chats[action.payload.chatId] = {
          _id: action.payload.chatId,
          type: "friend",
        };
      }
      return { ...state };
    case DELETE_FRIEND:
      if (state.connections[action.payload._id]) {
        delete state.connections[action.payload._id];
      }
      return { ...state };

    default:
      return state;
  }
};
