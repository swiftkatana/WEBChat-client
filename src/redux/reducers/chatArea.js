import {
  CREATE_CHAT,
  FETCH_CHATS,
  OPEN_CHAT,
  ADD_MESSAGE,
  UPDATE_STATUS_FRIEND,
} from "../action/types";

const INS = { chats: {}, chatId: "" };

export default (state = INS, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      action.payload.forEach((chat) => {
        state.chats[chat._id] = chat;
      });

      return { ...state };
    case CREATE_CHAT:
      state.chats[action.payload._id] = action.payload;
      return { ...state };
    case ADD_MESSAGE:
      console.log(action.payload)
      state.chats[action.payload.chatId].messages.push(action.payload.message);
      return { ...state };
    // case DELETE_CHAT:return _.omit(state,action.payload);
    case OPEN_CHAT:
      state.chatId = action.payload._id;
      return { ...state };
    case UPDATE_STATUS_FRIEND:
      state.chats[action.payload.chat._id] = action.payload.chat;

      return { ...state };
    default:
      return state;
  }
};
