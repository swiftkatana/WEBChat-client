
import  {CREATE_USER,LOGIN, SIGN_OUT,NEW_FRIEND,ACCEPT_FRIEND_REQ} from '../action/types'




export default (state=null,action)=>{
switch(action.type){
    case CREATE_USER:  return action.payload 
    case LOGIN: return action.payload 
    case SIGN_OUT: return null;
    case NEW_FRIEND: 
    const AddNewFriend=true;
    state.frindes.forEach(frinde => {
            if(frinde._id===action.payload._id) AddNewFriend=false;
        
    });
    if(AddNewFriend) state.frindes.push(action.payload);
    return{...state}
    case ACCEPT_FRIEND_REQ:

    state.frindes.forEach(frinde=>{
        if(frinde._id===action.payload) frinde.status='good';
    })

    return{...state}

    default: return state;
}

}