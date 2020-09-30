import React from 'react'
import { connect } from 'react-redux'
import LoginRegister from '../LoginRegister'
import {Container } from 'react-bootstrap'
import socketIOClient from 'socket.io-client' 

import serverIp from '../../api/serverIP';
import {updatefriend} from '../../action'

class MainPage extends React.Component{

    state={
        socket:socketIOClient(serverIp)
    }
    componentDidUpdate(){
    }
    

    renderRegisterORHomePage=()=>{
        if(this.props.isLogin&&this.props.user){
            return (
                <div>
      <h1>Main page</h1>

                </div>
            )
        }
        return <LoginRegister />

    }
    onClickAcceptReq=(friend)=>{
          //update the state
          this.props.updatefriend({_id:friend._id,status:'accept'})

          //sender is who that accept a req geter is who that send a req
        this.state.socket.emit('acceptAfrind',{sender:this.props.user,geter:this.props.user})

    }

    render() {
        return <Container>
                {this.renderRegisterORHomePage()}
        </Container> 
    }


}
const mapStateToProps = (state) => ({
    user:state.user
    ,isLogin:state.auth.isLogin
})


export default connect(mapStateToProps,{updatefriend})(MainPage);