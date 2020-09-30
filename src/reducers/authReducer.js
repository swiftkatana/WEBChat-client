const INTIAL_STATE={
    isLogin:null,
    userId:null
}

export default (state=INTIAL_STATE,action)=>{
    
switch (action.type) {
    case "SIGN_IN":
        return {...state,isLogin:true,userId:action.payload}
     
case "SIGN_OUT" :
    return {...state,isLogin:false,userId:null}


    default:
        return state
     
}
}