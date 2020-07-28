
import  {CREATE_USER,LOGIN} from '../action/types'




export default (state=null,action)=>{
switch(action.type){
    case CREATE_USER:  return action.payload 
    case LOGIN: return action.payload 
    default: return state;
}

}