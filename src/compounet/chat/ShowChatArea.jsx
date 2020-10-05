import React from 'react';
import { connect } from 'react-redux'


// import history from '../../history';
import ChatWindow from './ChatWindow';
import ENDPOINT from '../../api/serverIP';

class ShowChatArea extends React.Component{
    state={

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