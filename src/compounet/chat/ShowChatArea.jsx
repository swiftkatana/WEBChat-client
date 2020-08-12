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

    render(){
        return(
            <div>
                  <ChatWindow  ENDPOINT={ENDPOINT} chatId={this.props.chatArea.openChat.chatId}  user={this.props.user} />
            </div>
        )
    }

    
}


const mapStateToProps = (state) => ({
    chatArea:state.chatArea,
    user:state.user,
    isLogin:state.auth.isSignedIn
})


export default connect(mapStateToProps,{})(ShowChatArea);