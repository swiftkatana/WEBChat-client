
import  {CREATE_USER,LOGIN, SIGN_OUT,NEW_FRIEND,UPDATE_STATUS_FRIEND, DELETE_FRIEND} from '../action/types'




export default (state=null,action)=>{
switch(action.type){
    case CREATE_USER:  return action.payload 
    case LOGIN: return action.payload 
    case SIGN_OUT: return null;
    case NEW_FRIEND: 
    if(!state.friends[action.payload._id]){
        state.friends[action.payload._id]=action.payload;
    }
    return{...state}
    case UPDATE_STATUS_FRIEND:
        if(state.friends[action.payload._id]){
            const {user,_id} = action.payload;
            state.friends[_id]=user;
                // switch(type){
                //     case'accept':
                //     state.friends[user._id].chatId=user.chatId
                //     break

                //     default: return null
                // }
        }
    return{...state}
    case DELETE_FRIEND:
        if(state.friends[action.payload._id]){
           delete state.friends[action.payload._id];
        }
        return{...state};

    default: return state;
}

}