/* eslint-disable no-useless-escape */
import { changeURL } from '../history';

import server from '../api/myserver';
import {SIGN_IN,SIGN_OUT, CREATE_USER, LOGIN,CREATE_CHAT,FETCH_CHAT,FETCH_CHATS,DELETE_CHAT,WHAT_SYSTEM, OPEN_CHAT,UPDATE_STATUS_FRIEND,NEW_FRIEND, CHANGE_LEGUAGE,DELETE_FRIEND}  from './types';
import io from '../io';




// eslint-disable-next-line no-unused-vars
const config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    }
  }
    export const openChat =(chatId)=>async (dispatch)=>{
        const {data} = await server.post('/api/chat/getChat',{chatId})
        dispatch({
            type:OPEN_CHAT,
            payload:data
        })

        changeURL('/chat')

    }



    export const createCHAT =formValues => async (dispatch) =>{
        
        const {data} = await server.post("/api/chat/createchat",formValues);
        console.log(data)
       
            dispatch({type:CREATE_CHAT,payload:data});
      

      

    };
    export const updatefriend=(data)=>{
        return{
            type:UPDATE_STATUS_FRIEND,
            payload:data
        }

    }
    export const add_Friend=(newFriend)=>{


            return{
                type:NEW_FRIEND,
                payload:newFriend
            }

    }

    export const fetchChats =(whatToTake)=> async dispatch =>{
        const res = await server.get('/api/user/CHATs'+whatToTake);
        dispatch({
            type:FETCH_CHATS,
            payload:res.data
        });

    }

    export const fetchChat =(CHATId)=> async dispatch =>{
        const res = await server.get(`/api/user/CHAT${CHATId}`);

        dispatch({
            type:FETCH_CHAT,
            payload:res.data
        });
    }   
    export const deleteFriend=friend=>{
        return{
            type:DELETE_FRIEND,
            payload:friend
        }
        
    }



    // export const editCHAT =(CHATId,formValues)=> async dispatch=>{
    //     const res = await server.put(`/CHAT/edit`,{id:CHATId,formValues});
    //     dispatch({type:EDIT_CHAT,payload:res.data}) 
    //     setTimeout(()=>{history.push("/")},50) ;

    // }

    export const deleteChat = rendId =>  dispatch =>{
        server.delete(`/chat/delete/${rendId}`);
        dispatch({type:DELETE_CHAT,payload:rendId});
    setTimeout(()=>{changeURL("/")},40) ;
    }
    export const createUser=(formValues,signIn)=> async dispatch=>{
    const res = await server.post('/register',formValues);

    dispatch({type:CREATE_USER,payload:res.data})
    if(res.data!=='eror'&&res.data!=='dup'){
        signIn(res.data._id);
       

    }

    }
    export const loginUser=(formValues,signIn)=> async dispatch=>{
      await server.post('/login',formValues).then(res=>{
        io.emit('loginToTheWebSite',formValues.email);
    
        
          dispatch({type:LOGIN,payload:res.data})

          if(!res.data.err) signIn(res.data._id);
          
      }).catch(err=>{
          console.log(err)
      });




    }

    export const signIn =(userId)=>{
        return {
            type:SIGN_IN,
            payload:userId
        };
    }
    export const signOut =()=>{
        
        return {
            type:SIGN_OUT,
        };

        
    }


 
  
   export const isSystemIsPc=()=>dispatch=>{
       const IsSystemPcTrueOrFalse = isMobileDevice() ;
    dispatch({
        type:WHAT_SYSTEM,
        payload:IsSystemPcTrueOrFalse
    })

   }

   export const origenalAddress=(newaddress)=>dispatch=>{
       dispatch({
           type:"NEW_ADDRESS",
           payload:newaddress
       })
   }

   function isMobileDevice() {
    var check = false;
    
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera); 
    return check;
  };

  export const changeLeg=(leg)=>{
      return{
          type:CHANGE_LEGUAGE,
          payload:leg
      }
  }