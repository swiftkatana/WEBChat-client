import React from 'react'
import socketIOClient from 'socket.io-client' 

class ChatWindow extends React.Component{
    state={
        meassge:'',
        socket:socketIOClient(this.props.ENDPOINT),
        meassges:[],
        whoIsTypeingNow:''
        
    }
    componentDidMount(){
        this.state.socket.on('chat',(data)=>{
            this.setState({meassges:[data,...this.state.meassges]})
        });
        
        this.state.socket.on('typeing',(name)=>{
            this.setState({whoIsTypeingNow:name});

        });



      }
      onChangeText=(e)=>{
        this.setState({meassge:e.currentTarget.value});
        this.state.socket.emit('typeing', e.currentTarget.value?this.props.user.name:'');
      }
      handlerClickMSG=(e)=>{


        e.preventDefault() 
        this.setState({meassge:''})
        this.state.socket.emit('chat',{
            message:this.state.meassge,
            handle:this.props.user.name
        })
      }
      renderSomeOneIsTypeing=()=>{
        if(!this.state.whoIsTypeingNow) return null

        return(
            <p><em>{this.state.whoIsTypeingNow}</em> is typeing a meassge</p>
        )
      }

      renderMessgesList=()=>{
        return this.state.meassges.map(message=>{
            return (<p><strong>{message.handle}: </strong>{message.message}</p>)
        })
      }

    render(){
        return (
            <div id='mario-chat'>
              <div id='chat-window'>
              <div id='output'>{this.renderMessgesList()}</div>
                <div id="feedback">{this.renderSomeOneIsTypeing()}</div>            
         
              </div>
              <form onSubmit={this.handlerClickMSG}>
              <p id='handle' >{this.props.user.name} </p>
                <input autoComplete="off" id='message' onChange={this.onChangeText} value={this.state.meassge} type='text' placeholder='type a message' />
                <button style={{backgroundColor:this.state.meassge?"#575ed8":"#898bce"}} type='submit'>send</button>
                
              </form>
            
            </div>
          );
    }
}


export default ChatWindow;