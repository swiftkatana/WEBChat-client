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
      audio: new Audio('msg.mp3'),
      configuration : {
        'iceServers': [{
          'url': 'stun:stun.l.google.com:19302'
        }]
      }
      
  }
  this.rtcPeerConn=undefined;
  this.el = React.createRef()
  this.myVideoArea = React.createRef();
  this.theirVideoArea = React.createRef();
  this.peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  });
}
componentWillUnmount(){
  io.close('chat'+this.state.chatId)
  io.close('typeing'+this.state.chatId)
}

componentDidUpdate() {

}
    componentDidMount(){

    
      
      this.scrollToBottom();
        console.log('chat connect');
        
        
    
            
        //   io.emit('ready',this.state.chatId);
        //   io.on('announce'+this.state.chatId,(data)=>{
        //     this.addmessage(data)
        //   })
        
        //  io.emit('signal',{"type":"user_here", "message":"Are you ready for a call?", "room":this.state.chatId});
        //     io.on('signaling_message'+this.state.chatId,(data)=>{
          
          //       this.addmessage(data.type);
          
          //     //Setup the RTC Peer Connection object
        //     if (!this.rtcPeerConn)
        //     this.startSignaling();
        
        //   if (data.type !== "user_here") {
          //     var message = JSON.parse(data.message);
        //     if (message.sdp) {
        //       this.rtcPeerConn.setRemoteDescription(new RTCSessionDescription(message.sdp), function () {
          //         // if we received an offer, we need to answer
        //         if (this.rtcPeerConn.remoteDescription.type === 'offer') {
          //           console.log('offer')
          //           this.rtcPeerConn.createAnswer(this.sendLocalDesc, this.logError);
        //         }
        //       }, this.logError);
        //     }
        //     else {
        //       console.log('create add IceCandidate')
        //       this.rtcPeerConn.addIceCandidate(new RTCIceCandidate(message.candidate));
        //     }
        //   }
          
  
  
        //     });
    
          io.on('chat'+this.state.chatId,(data)=>{
          if(data.senderId!==this.props.user.email) {
            setTimeout(this.scrollToBottom,100);
            this.state.audio.play();
          }
              this.setState({meassges:[...this.state.meassges,data]})
    
          });
          
          io.on('typeing'+this.state.chatId,(data)=>{
            if(data.show){
              let add=true;
              this.state.whoIsTypeingNow.forEach(name=>name===data.senderName? add=false:null )
            if(add)this.setState({whoIsTypeingNow:[...this.state.whoIsTypeingNow,data.senderName]})
        
            }else {
              this.setState({whoIsTypeingNow:this.state.whoIsTypeingNow.filter(name=>name!==data.senderName)});
        
            }
    
          });
        
        
        
        
        
      
      
      
    }
    
    
    
  startCall = async () => {
    this.peerConnection.oniceconnectionstatechange = () => console.log('ICE CONNECTION STATE: ', this.peerConnection.iceConnectionState);

    this.peerConnection.onicecandidate = e => {
      const iceCandidate = e.candidate;
      io.emit('candidate', { room: this.state.chatId, candidate: iceCandidate });
      console.log('candidate generated', e.candidate);
    };

    this.peerConnection.ontrack = e => {
      this.theirVideoArea.srcObject = e.streams[0];
      console.log('REMOTE STREAMS: ', this.peerConnection.getRemoteStreams());
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
      for (const track of stream.getTracks()) {
        this.peerConnection.addTrack(track, stream);
      }

      // this.localVideo.srcObject = stream;
      console.log('LOCAL STREAMS: ', this.peerConnection.getLocalStreams())

      return this.createOffer();
    } catch (error) {
      console.error(error);
    }
  }

  createOffer = async () => {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      io.emit('offer', { room: this.state.chatId, offer });
      console.log('SENDING OFFER: ', offer);
    } catch (error) {
      console.error(error);
    }
  }

  createAnswer = async description => {
    this.peerConnection.onicecandidate = e => {
      const iceCandidate = e.candidate;
      io.emit('candidate', { room: this.state.chatId, candidate: iceCandidate });
      console.log('candidate generated', e.candidate);
    };

    this.peerConnection.ontrack = e => {
      this.theirVideoArea.srcObject = e.streams[0];
    };

    this.peerConnection.setRemoteDescription(description)
      .then(() => navigator.mediaDevices.getUserMedia({ video: false, audio: true }))
      .then(stream => {
        for (const track of stream.getTracks()) {
          this.peerConnection.addTrack(track, stream);
        }

        // this.localVideo.srcObject = stream;

        return this.peerConnection.createAnswer();
      })
      .then(answer => {
        this.peerConnection.setLocalDescription(answer);
        return answer;
      })
      .then(answer => {
        io.emit('answer', { room: this.state.chatId, answer });
        console.log('SENDING ANSWER: ', answer);
      })
      .catch(error => console.error(error))
  }

      //   startSignaling=()=>{
      //     this.addmessage('start signaling')
      //     this.rtcPeerConn = new RTCPeerConnection(this.state.configuration);
          
      //     this.rtcPeerConn.onicecandidate =  (evt)=> {
      //       if (evt.candidate)
      //       io.emit('signal',{"type":"ice candidate", "message": JSON.stringify({ 'candidate': evt.candidate }), "room":this.state.chatId});
      //         this.addmessage("completed that ice candidate...");
      //     };
          
      //       // let the 'negotiationneeded' event trigger offer generation
      //       this.rtcPeerConn.onnegotiationneeded =  ()=> {
      //         this.addmessage("on negotiation called");
      //         this.rtcPeerConn.createOffer(this.sendLocalDesc, this.logError);
      //       }
            	
			// 	// once remote stream arrives, show it in the remote video element
			// 	this.rtcPeerConn.onaddstream =  (evt) =>{
			// 		this.addmessage("going to add their stream...");
			// 		this.theirVideoArea.current.srcObject  = (evt.stream);
      //     this.theirVideoArea.current.play();
      //   };
        
      //   		// get a local stream, show it in our video tag and add it to be sent
      //       navigator.getUserMedia = (
      //         navigator.getUserMedia ||
      //         navigator.webkitGetUserMedia ||
      //         navigator.mozGetUserMedia ||
      //         navigator.msGetUserMedia
      //     );
			// 	navigator.getUserMedia({
			// 		'audio': true,
			// 		'video': false
			// 	},  (stream) =>{
			// 		this.addmessage("going to display my stream...");
      //     // this.myVideoArea.current.srcObject  = (stream);
      //     // this.myVideoArea.current.play();
			// 		this.rtcPeerConn.addStream(stream);
			// 	}, this.logError);

      // }
      //  sendLocalDesc=(desc)=> {
			// 	this.rtcPeerConn.setLocalDescription(desc,  ()=> {
			// 		this.addmessage("sending local description");
			// 		io.emit('signal',{"type":"SDP", "message": JSON.stringify({ 'sdp': this.rtcPeerConn.localDescription }), "room":this.state.chatId+" 1"});
			// 	}, this.logError);
      // }
      
      // logError=(error) =>{
			// 	console.log(error.name + ': ' + error.message);
			// }



      
      scrollToBottom = () => {
        this.meassgesEnd.scrollIntoView({ behavior: "smooth" });
      }
    
      addmessage=(message)=>{
        console.log(message)
      }
      onChangeText=(e)=>{
        this.setState({meassge:e.currentTarget.value});
        io.emit('typeing', e.currentTarget.value?{senderName:this.state.user.firstName,show:true,chatId:this.state.chatId}:{senderName:this.state.user.firstName,show:false,chatId:this.state.chatId});
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
        io.emit('typeing',{senderName:this.state.user.firstName,show:false,chatId:this.state.chatId});
        io.emit('chat',{
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
             <div id='videosCon'>
             <audio ref={ref => this.theirVideoArea = ref}   id='theirVideoTAg' autoPlay > </audio>
             {/* <audio ref={this.myVideoArea} id='myVideoTag' autoPlay ></audio> */}

             </div>
              <div id="feedback">{this.renderSomeOneIsTypeing()}</div>            

              
              <div id='output'>
              <div>

              {this.renderMessgesList()}

              </div>
         
              <div id='hideScrool' style={{ float:"left", clear: "both" }} ref={(el) => { this.meassgesEnd = el; }}> </div>
              </div>
      
              </div>
              <form  onSubmit={this.handlerClickMSG}>
              
              
                <InputGroup id='messageinput'  >
                    <FormControl onKeyDown={this.onEnterPress}  as="textarea" rows="1" aria-multiline    autoComplete="off" onChange={this.onChangeText} value={this.state.meassge} type='text' placeholder='type a message' />
                      <InputGroup.Append>
                        <Button id='buttonChat' style={{backgroundColor:this.state.meassge?"#575ed8":"#898bce"}} type='submit' variant="outline-secondary"></Button>
                      </InputGroup.Append>
                      <InputGroup.Append>
                        <Button onClick={this.startCall} id='start call'   variant="outline-secondary">call</Button>
                      </InputGroup.Append>
                </InputGroup>



              </form>
            
            </div>
          );
    }
}


export default ChatWindow;