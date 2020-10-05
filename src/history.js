import { createHashHistory } from 'history'; 
let history = createHashHistory();

export const  changeURL=(url)=>{

if(history.location.pathname!==url){
    history.push(url);}
else{
    console.log('something try to change url' , url)
}
}

export default history;