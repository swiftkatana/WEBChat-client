import React from 'react'
import socketIOClient from 'socket.io-client' 
import { connect } from 'react-redux'
import { FormControl, InputGroup, Container, ListGroup, Col, Row } from 'react-bootstrap';

import {add_Friend} from '../../action'
import myserver from '../../api/myserver';
import serverIP from '../../api/serverIP';
import history from '../../history';

class SerachFriend extends React.Component{

    state={
        users:[],
        filterUsers:[],
        socket:socketIOClient(serverIP),
        query:''

    }


    componentDidMount(){
        if(!this.props.user||!this.props.isLogin) history.push('/');
        this.getAllUsers();

    }
    componentDidUpdate(){
        console.log(this.state)

    }
    getAllUsers= async()=>{
        if(!this.props.user||!this.props.isLogin) return null
        const res = await myserver.post('/getUserForSerach',this.props.user._id);

        this.setState({users:res.data});

    }

    onClickSendReq=(geter)=>{
        this.state.socket.emit('addFrind',{geter,sender:this.props.user})
        // this.props.add_Friend({user,senderId:this.props.user._id});
    }

    onChangText=(e)=>{
        this.setState({query: e.target.value})
        const filter = this.state.users.filter(user=>user.email.includes(this.state.query)||!this.props.user.friends[user._id]);
        this.setState({filterUsers:filter});
    }
     renderUsersList=()=>{
        if(!this.state.filterUsers) return null
        return this.state.filterUsers.map((user) => (
            <ListGroup.Item className='row'>
            <Row>

            <Col xs='4'>
            <img alt='profile'  src='addFriend.png' style={{ fontSize: 30 }} />

            </Col>
            <Col xs='7'>
            <p>{`${user.firstName} ${user.email}`}</p>

            </Col>
            <Col xs='1'>
            <button onClick={()=>this.onClickSendReq(user)} ><img alt='add button'  src='addFriend.png' style={{ fontSize: 30 }} /></button>

            </Col>
            </Row>
            </ListGroup.Item>

    
        ))
      }


 

    render(){
            return(
                <Container>
             
                   <InputGroup className="mb-2 mr-sm-2">
                      
                        <FormControl  value={this.state.query} onChange={this.onChangText}  id="inlineFormInputGroupUsername2" placeholder="email" />
                        <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                        </InputGroup.Prepend>
                    </InputGroup>
                    <ListGroup>

                    {this.renderUsersList()}
                    </ListGroup>
                </Container>
            )
    }



}

const mapStateToProps = (state) => ({
    user:state.user
    ,isLogin:state.auth.isSignedIn
})


export default connect(mapStateToProps,{add_Friend}) (SerachFriend);