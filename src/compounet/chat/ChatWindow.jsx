import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import io from '../../io';

function getTimeIn24Format() {
  var d = new Date();
  var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
  return n;
}

function getDate(){
 let date=  new Date();
 console.log(date);
 return date
// return {m:d.getMonth()+1,d:d.getDate(),y:d.getFullYear()}
  
}
var theirVideoArea = document.querySelector("#theirVideoTAg");
var myVideoArea = document.querySelector("#myVideoTAg");

var configuration = {
  'iceServers': [{
    'url': 'stun:stun.l.google.com:19302'
  }]
};
var rtcPeerConn;







class ChatWindow extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      meassge:'',
      socket:io,
      meassges:this.props.chat.meassges,
      whoIsTypeingNow:[],
      user:this.props.user,
      chatId:this.props.chat._id,
      audio: new Audio('msg.mp3')
  }
  this.el = React.createRef()

  }
    componentWillUnmount(){
      this.state.socket.close('chat'+this.state.chatId)
      this.state.socket.close('typeing'+this.state.chatId)
    }
    
    componentDidMount(){

    
        this.scrollToBottom();
 

      this.state.socket.emit('ready',this.state.chatId);
      this.state.socket.on('announce'+this.state.chatId,(data)=>{
        this.addmessage(data)
      })
    
     this.state.socket.emit('signal',{"type":"user_here", "message":"Are you ready for a call?", "room":this.state.chatId});
          this.state.socket.on('signaling_message'+this.state.chatId,(data)=>{

            this.addmessage(data.type);

            if(!rtcPeerConn)this.startSignaling()

            if (data.type !=="user_here") {
              var message = JSON.parse(data.message);
              if (message.sdp) {
                rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
                  // if we received an offer, we need to answer
                  if (rtcPeerConn.remoteDescription.type === 'offer') {
                    rtcPeerConn.createAnswer(this.sendLocalDesc, this.logError);
                  }
                }, this.logError);
              }
              else {
                rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
              }
            }



          })

          this.state.socket.on('chat'+this.state.chatId,(data)=>{
          if(data.senderId!==this.props.user.email) {
          this.scrollToBottom();
            this.state.audio.play();
          }
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
      }
      startSignaling=()=>{
          this.addmessage('start signaling')
          rtcPeerConn = new RTCPeerConnection(configuration);

          rtcPeerConn.onicecandidate =  (evt)=> {
            if (evt.candidate)
            this.state.socket.emit('signal',{"type":"ice candidate", "message": JSON.stringify({ 'candidate': evt.candidate }), "room":this.state.chatId});
              this.addmessage("completed that ice candidate...");
          };

            // let the 'negotiationneeded' event trigger offer generation
            rtcPeerConn.onnegotiationneeded =  ()=> {
              this.addmessage("on negotiation called");
              rtcPeerConn.createOffer(this.sendLocalDesc, this.logError);
            }
            	
				// once remote stream arrives, show it in the remote video element
				rtcPeerConn.onaddstream =  (evt) =>{
					this.addmessage("going to add their stream...");
					theirVideoArea.src = URL.createObjectURL(evt.stream);

        };
        
        		// get a local stream, show it in our video tag and add it to be sent
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
				navigator.getUserMedia({
					'audio': true,
					'video': true
				},  (stream) =>{
					this.addmessage("going to display my stream...");
          myVideoArea.src = URL.createObjectURL(stream);

					rtcPeerConn.addStream(stream);
				}, this.logError);

      }
       sendLocalDesc=(desc)=> {
				rtcPeerConn.setLocalDescription(desc,  ()=> {
					this.addmessage("sending local description");
					this.state.socket.emit('signal',{"type":"SDP", "message": JSON.stringify({ 'sdp': rtcPeerConn.localDescription }), "room":this.state.chatId});
				}, this.logError);
      }
      
      logError=(error) =>{
				this.addmessage(error.name + ': ' + error.message);
			}




      addmessage=(message)=>{
        console.log(message)
      }
      onChangeText=(e)=>{
        this.setState({meassge:e.currentTarget.value});
        this.state.socket.emit('typeing', e.currentTarget.value?{senderName:this.state.user.firstName,show:true,chatId:this.state.chatId}:{senderName:this.state.user.firstName,show:false,chatId:this.state.chatId});
      }
      scrollToBottom = () => {
        this.meassgesEnd.scrollIntoView({ behavior: "smooth" });
      }
    
      onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          this.handlerClickMSG(e);
          
        }
        // if(e.keyCode === 13 && e.shiftKey &&this.state.meassge ){
        //   console.log('wow')
        //   this.setState({meassge:this.state.meassge+='\n\r\t'})

        // }
      }
      
      handlerClickMSG=(e)=>{
        e.preventDefault() 
        if(!this.state.meassge) return null

        this.setState({meassge:''})
        this.state.socket.emit('typeing',{senderName:this.state.user.firstName,show:false,chatId:this.state.chatId});
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
       
        date= new Date(date);
        var numberOfDays =Math.floor((d - date) / (1000*60*60*24))
        switch (numberOfDays) {
          case 0 :
            return 'today'
          case 1:
            return 'Yesterday'            
          case 2:
            return '3 days ago'
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
       
            return (
              <div key={message.message+index}
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
             
              <video id='theirVideoTAg' autoPlay > <video id='myVideoTag' autoPlay ></video></video>
              <div id="feedback">{this.renderSomeOneIsTypeing()}</div>            

              
              <div id='output'>
              <div>

              {this.renderMessgesList()}
              </div>
         
      
              </div>
              <div id='hideScrool' style={{ float:"left", clear: "both" }}
             ref={(el) => { this.meassgesEnd = el; }}>
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