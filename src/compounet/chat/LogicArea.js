import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'


import {add_Friend,updatefriend, deleteFriend} from '../../action'
import myserver from '../../api/myserver';
import io from '../../io';



class LogicArea extends React.Component{
    
    state={
        io:io,
        show:false,
        whatKind:'',
        body:'',
        lastFriendReq:{},
        newReqSound: new Audio('newReq.mp3')
        ,id:'',
        
    }
  
  
    componentDidUpdate(){
                this.setListenerSocket();
        }
        setListenerSocket=()=>{
            if(!this.state.id&&this.props.isLogin&&this.props.user){
                this.state.io.on('newFriendReq'+this.props.user._id,myNewFriend=>{
                    console.log('friend')
                    if(myNewFriend.status==='sender') {
                        this.state.newReqSound.play();
                    
                        this.setState({lastFriendReq:myNewFriend,show:true,whatKind:'newFriendreq',body:myNewFriend.firstName+" " +myNewFriend.lastName});
                    }
                    this.props.add_Friend(myNewFriend)
                
                
                });
    
                //my friend req have been accept
                this.state.io.on('FirendsReqAccept'+this.props.user._id,(sender)=>{
                    if(sender.status==='accept') {
                        this.state.newReqSound.play();
                    
                        this.setState({lastFriendReq:sender,show:true,whatKind:'newFriendreq',body:sender.firstName+" " +sender.lastName});
                    }
                    console.log('accept')
                    this.props.updatefriend({_id:sender._id,status:'accept',chatId:sender.chatId,user:sender});
                
                });
                this.state.io.on('deleteFriend'+this.props.user._id,sender=>{
                    console.log('delete')
                    this.props.deleteFriend(sender);
    
                });
                this.state.io.on('declineFriendReq'+this.props.user._id,(sender)=>{
                    console.log('decline');
                    this.props.deleteFriend(sender);
                });
                this.state.io.on('blockFriendReq'+this.props.user._id,(sender)=>{
                    console.log('block')
                    this.props.updatefriend({_id:sender._id,user:sender,status:'decline'});
                
                });
                this.state.io.on('error'+this.props.user._id,data=>{
                 console.log(data)
                    this.setState({show:true,whatKind:'error',header:'error',body:data});
    
                });
                this.state.io.on('show',data=>{
                    alert(data)
                });
                this.setState({id:this.props.user._id});

            }
           else if(this.state.id&&!this.props.isLogin&&!this.props.user){
               console.log('off')
            this.state.io.disconnect();

    
            }
          
        }
            onClickDeclineReq= (sender)=>{
                this.setState({show:false})

                // let res = await  
                myserver.post('/api/user/declineFriendReq',{sender:this.props.user,geter:sender})

            }

            onClickAcceptReq= async (sender)=>{
                this.setState({show:false});

                //sender is who that accept a req geter is who that send a req
                let res = await  myserver.post('/api/user/friendreqaccept',{accepter:this.props.user,sender:sender})
        console.log(res)

                // res get "good" || "bad" String the rest is going on socket
                    alert(res.data);

            }
            onShowOrHide=()=>{
                this.setState({show:!this.state.show})
            }
            
            renderModal=()=>{
                if(!this.state.show) return null;
                var onGood,onBad, good ,bad,header,body;

                switch (this.state.whatKind) {
                    case 'error':
                        bad='close';
                        header='error'
                        body=this.state.body;
                        onBad=()=>this.onShowOrHide();
                        break;
                        case'newFriendReq':
                        console.log(this.state.lastFriendReq)
                        good = 'Accept';
                        bad = 'Decline';
                        header = 'you got new friend request';
                        body = `your new friend request send from ${this.state.body} `;
                        onGood=()=>{this.onClickAcceptReq(this.state.lastFriendReq)};
                        onBad=()=>{this.onClickDeclineReq(this.state.lastFriendReq)};
                        break;
                        case 'friendReqAccept':
                            bad='close';
                            header='you Got Accept'
                            body=` ${this.state.body} accept your friend request 😎 `;
                            onBad=()=>this.onShowOrHide();
                            break;
         
                
                    default:
                        break;
                }

                return(        
                <Modal   aria-labelledby="contained-modal-title-vcenter"centered show={this.state.show} onHide={this.onShowOrHide}>


                    <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{body}</Modal.Body>
                    <Modal.Footer>
                    {good?    <Button variant="secondary" onClick={onGood}>{good}</Button>:null}
                      {bad?  <Button variant="danger" onClick={onBad} >{bad}</Button>:null}
                    </Modal.Footer>
                </Modal>);
                
            }

    render() {
        return (
            <>
       
                {this.renderModal()}
        
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    isLogin:state.auth.isLogin,
    user:state.user,    
    })

export default connect(mapStateToProps,{add_Friend,updatefriend,deleteFriend})(LogicArea);