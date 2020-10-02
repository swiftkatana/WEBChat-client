import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Grid, Button, Tooltip } from '@material-ui/core';
import { Col, ListGroup, Row, Container } from 'react-bootstrap'
import ChatIcon from '@material-ui/icons/Chat';
import {Delete,Block} from '@material-ui/icons';
import io from '../../io';


import serverIp from '../../api/serverIP';
import {updatefriend,openChat} from '../../action'
import myserver from '../../api/myserver';

class FriendsList extends React.Component{

    state={
        socket:io
    }
    componentDidUpdate(){
        console.log('update ')
    }
    

    renderFriendsList=()=>{
        if(this.props.isLogin&&this.props.user){
            return (
                <div>
                    <h3>Friends List  <span aria-labelledby='img' role='img'>🤝</span></h3>
                    {this.renderUsersList(['accept','iaccept'])}
                    <h3>Pending friends List <span aria-labelledby='img' role='img'>🙈🙉🙊</span> </h3>
                    {this.renderUsersList(['waiting','sender'])}


                    <h3>Black List <span aria-labelledby='img' role='img'>💀</span></h3>
                    {this.renderUsersList(['iblock'])}
                </div>
            )
        }
     return <h1>Please logIng Or Register</h1>

    }
    onClickAcceptReq= (sender)=>{
        myserver.post('/api/user/friendreqaccept',{accepter:this.props.user,sender})
    }
    onclickDeletefriend=(geter)=>{
        console.log('delete')
        myserver.post('/api/user/deletefriendreq',{sender:this.props.user,geter})  
    }
    onclickBlockfriend=(geter)=>{
        myserver.post('/api/user/blockfriendreq',{sender:this.props.user,geter});
    }
    onClickDeclineFriend=(geter)=>{
        myserver.post('/api/user/declineFriendReq',{sender:this.props.user,geter});
    }
    onUnblockAfriend=(geter)=>{

        myserver.post('/api/user/unblockFirend',{sender:this.props.user,geter})
    }
    onOpenChat=(id)=>{
        this.props.openChat(id);
    }

  
    renderBuutonChatOrAccept=(user)=>{
        if(!user) return null
        switch(user.status) {
         case 'waiting':return ( 
          <Tooltip title="waiting for the person to aceept" >
            <p>waiting</p>
          </Tooltip>
          )
        case'sender':
            return(
              <Grid key={user._id} item>
            <Tooltip onClick={()=>this.onClickAcceptReq(user)} key='Accept' title="Accept the requst" >
              <Button>Accept</Button>
            </Tooltip>
            <Tooltip onClick={()=>this.onClickDeclineFriend(user)} key='Decline' title="decline the requst" >
              <Button>decline</Button>
            </Tooltip>
            </Grid>
            )
            case'iblock':
            return(
                <Grid key={user._id} item>
                <Tooltip onClick={()=>this.onUnblockAfriend(user)} key='unblockbtn' title="unblock a friend" >
                  <Button>unblock</Button>
                </Tooltip>
                <Tooltip onClick={()=>this.onclickDeletefriend(user)} key='delete' title="delete friend" >
              <Delete className='imgLeg imageAddFri'   >Delete</Delete>
            </Tooltip>
                </Grid>
            )
                  default:

            return (
          <Grid key={user._id} item>
          <Tooltip key='open chat' onClick={()=>this.onOpenChat(user.chatId)} title="Open Chat" >
            <ChatIcon className='imgLeg imageAddFri'  />
          </Tooltip>
          <Tooltip onClick={()=>this.onclickBlockfriend(user)} key='block' title="Block friend" >
              <Block className='imgLeg imageAddFri'   >Block</Block>
            </Tooltip>
            <Tooltip onClick={()=>this.onclickDeletefriend(user)} key='delete' title="delete friend" >
              <Delete className='imgLeg imageAddFri'   >Delete</Delete>
            </Tooltip>
          
            </Grid>
            
            );
        }
    }

    renderUsersList=(whenToShow)=>{
        if(!this.props.isLogin||!this.props.user)return null
        if(Object.values(this.props.user.friends)){
            return Object.values(this.props.user.friends).map((friend) => (
                whenToShow.indexOf(friend.status) === -1 ? null:
                <ListGroup.Item key={friend._id} className='row'>
                <Row>
    
                <Col xs='4'>
                <Avatar alt='profile'  src={friend.imageProfile} style={{ fontSize: 30 }}   />
           
    
                </Col>
                <Col xs='5'>
                <p>{`${friend.firstName} ${friend.email}`}</p>
    
                </Col>
                <Col xs='3'>
                 {this.renderBuutonChatOrAccept(friend)}
                </Col>
                </Row>
                </ListGroup.Item>
    
        
            ))
        }
        
       
    }


    render() {
        return <Container>
            {this.renderFriendsList()}
        </Container> 
    }


}
const mapStateToProps = (state) => ({
    user:state.user
    ,isLogin:state.auth.isLogin
})


export default connect(mapStateToProps,{updatefriend,openChat})(FriendsList);