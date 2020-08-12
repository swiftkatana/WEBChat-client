

import  {CREATE_CHAT,FETCH_CHATS,EDIT_CHAT,OPEN_CHAT} from '../action/types'

const INS ={chats:[],openChat:{chatId:null}, }




export default (state=INS,action)=>{
switch(action.type){
    case FETCH_CHATS:
        action.payload.forEach(chat => {
            state.chats.push(chat);
            
        });
    
    return{...state};
    case CREATE_CHAT:
        state.chats.push(action.payload);
    return{...state,};
    case EDIT_CHAT:return{...state,[action.payload._id]:action.payload};
    // case DELETE_CHAT:return _.omit(state,action.payload);
    case OPEN_CHAT:

    // state.chats.forEach(chat=>{
    //     if(chat._id===action.payload) state.openChat=chat;
    // })
        state.openChat.chatId=action.payload
    return{...state}

    default: return state;

}

}