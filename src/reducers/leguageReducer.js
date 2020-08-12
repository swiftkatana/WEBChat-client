import { CHANGE_LEGUAGE } from "../action/types";



export default (state='eng',action)=>{

switch (action.type) {
    case CHANGE_LEGUAGE:
        state=action.payload;
        return state

    default:
        return state
}


}