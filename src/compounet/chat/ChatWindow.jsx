import React from 'react'
import socketIOClient from 'socket.io-client' 
import { InputGroup, FormControl, Button } from 'react-bootstrap';


function getTimeIn24Format() {
  var d = new Date();
  var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
  return n;
}

function getDate(){
  var d = new Date();
return {m:d.getMonth()+1,d:d.getDate(),y:d.getFullYear()}
  
}

class ChatWindow extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      meassge:'',
      socket:socketIOClient(this.props.ENDPOINT),
      meassges:[],
      whoIsTypeingNow:[],
      user:this.props.user,
      chatId:this.props.chatId,
      audio: new Audio('msg.mp3')
  }
  this.el = React.createRef()

  }
    componentWillUnmount(){
      this.state.socket.close('chat')
      this.state.socket.close('typeing')
    }
    
    componentDidMount(){
      this.scrollToBottom();
      

        this.state.socket.on('chat'+this.state.chatId,(data)=>{
        this.scrollToBottom();

            this.setState({meassges:[...this.state.meassges,data]})
        });
        
        this.state.socket.on('typeing'+this.state.chatId,(data)=>{
          if(data.show){
            let add=true;
            this.state.whoIsTypeingNow.forEach(name=>name===data.senderName? add=false:null )
          if(add)this.setState({whoIsTypeingNow:[...this.state.whoIsTypeingNow,data.senderName]})
      
          }else {
            this.setState({whoIsTypeingNow:this.state.whoIsTypeingNow.filter(name=>name!==data.senderName)});
      
          }
      
        });



      }
      componentDidUpdate() {
        this.scrollToBottom();

      }
      onChangeText=(e)=>{
        console.log(e.currentTarget.value)
        this.setState({meassge:e.currentTarget.value});
        this.state.socket.emit('typeing', e.currentTarget.value?{senderName:this.state.user.firstName,show:true,chatId:this.state.chatId}:{senderName:this.state.user.firstName,show:false,chatId:this.state.chatId});
      }
      scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
    
      onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          this.handlerClickMSG(e);
          
        }
      }
      
      handlerClickMSG=(e)=>{
        e.preventDefault() 
        if(!this.state.meassge) return null

        this.setState({meassge:''})
        this.state.socket.emit('typeing', e.currentTarget.value?{senderName:this.state.user.firstName,show:true,chatId:this.state.chatId}:{senderName:this.state.user.firstName,show:false,chatId:this.state.chatId});
        this.state.socket.emit('chat',{
            message:this.state.meassge,
            senderName:this.state.user.firstName,
            senderId:this.state.user.email,
            chatId:this.state.chatId,
            createTime:{time:getTimeIn24Format(), date:getDate()}
            
        })
      }
 
renderSomeOneIsTypeing=()=>{ 
  if(this.state.whoIsTypeingNow.length<1) return null
else if(this.state.whoIsTypeingNow.length===1){
    return(
      <p><em>{this.state.whoIsTypeingNow}</em> is typeing a meassge</p>
  )
  }
  else {
    let names ='';
    this.state.whoIsTypeingNow.map(name=>names= names+' '+ name)
      return(
      <p><em>{names}</em> is typeing a meassge</p>
  ) 
  }
 
}
     
      renderDateOfCreateMessage=(date)=>{
  var d = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(date.y,date.m,date.d); // 1 Jan 2015
        var secondDate =  Date(d.getFullYear(), d.getMonth()+1, d.getDate()); // 1 Feb 2015
        var numberOfDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        console.log(numberOfDays)
        switch (numberOfDays) {
          case 0 :
            return 'today'
          case 1:
            return 'Today'            
          case 2:
            return 'Yesterday'
          default:

            return `${date.d}/${date.m}/${date.y}`
        }
      }
      renderStyleForTheMessage=(email,style)=>{

       return  email===this.state.user.email?style: {
  
      }


      }

      renderMessgesList=()=>{
        return this.state.meassges.map((message,index)=>{
          if(this.state.meassges.length-1===index&&message.senderId!==this.props.user.email) this.state.audio.play();
            return (
              <div key={message.message}
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                      position: 'relative',
                      minHeight: '100px',
                    }}
                  >
              <div style={this.renderStyleForTheMessage(message.senderId,
                {
                  textAlign: 'right',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  minWidth:'100px'
                })} 
                id='body-message'>
                <div style={this.renderStyleForTheMessage(message.senderId,{backgroundColor:"#b5f66f"})} id='message'>
                    <p id='textMessage' >{message.message}</p>
                </div>
                <small> {`${this.renderDateOfCreateMessage(message.createTime.date)} at ${message.createTime.time } by ${message.senderName}`} </small>

              </div>
              </div>
         
            )
        })
      }

      auto_height(elem) {
        elem.style.height = "1px";
        elem.style.height = (elem.scrollHeight)+"px";
    }
    render(){
        return (
            <div id='mario-chat'>
              <div id='chat-window'>
              <div id="feedback">{this.renderSomeOneIsTypeing()}</div>            

              
              <div id='output'>
              <div>

              {this.renderMessgesList()}
              </div>
         
      
              </div>
              <div id='hideScrool' style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      
              </div>
              <form  onSubmit={this.handlerClickMSG}>
              
              
                <InputGroup id='messageinput'  >
                    <FormControl onKeyDown={this.onEnterPress}  as="textarea" rows="1" aria-multiline    autoComplete="off" onChange={this.onChangeText} value={this.state.meassge} type='text' placeholder='type a message' />
                      <InputGroup.Append>
                        <Button id='buttonChat' style={{backgroundColor:this.state.meassge?"#575ed8":"#898bce"}} type='submit' variant="outline-secondary"></Button>
                      </InputGroup.Append>
                </InputGroup>



              </form>
            
            </div>
          );
    }
}


export default ChatWindow;