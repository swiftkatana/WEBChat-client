import React from 'react';
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client' 


// import history from '../../history';
import ChatWindow from './ChatWindow';
import ENDPOINT from '../../api/serverIP';
import serverIP from '../../api/serverIP';

class ShowChatArea extends React.Component{
    state={
        socket:socketIOClient(serverIP)
    }

    componentDidMount(){
     
    }   
    renderChat=()=>{
        if(!this.props.chatArea.openChat._id){
            return(<h1>error please go back</h1>)
        }
        return<ChatWindow  ENDPOINT={ENDPOINT}  chat={this.props.chatArea.openChat}  user={this.props.user} />
    }

    render(){
        return this.renderChat();
                  
    }

    
}


const mapStateToProps = (state) => ({
    chatArea:state.chatArea,
    user:state.user,
    isLogin:state.auth.isLogin
})


export default connect(mapStateToProps,{})(ShowChatArea);