import React from 'react'
import { connect } from 'react-redux'
import { FormControl, InputGroup, Container, ListGroup, Col, Row } from 'react-bootstrap';

import {add_Friend} from '../../action'
import myserver from '../../api/myserver';
import history from '../../history';
import { Avatar } from '@material-ui/core';

class SerachFriend extends React.Component{

    state={
        users:[],
        filterUsers:[],
        query:'',
        idForTheClock:'',

    }


    componentDidMount(){
        if(!this.props.user||!this.props.isLogin) history.push('/');
        this.getAllUsers();

    }
 
    
    getAllUsers= async()=>{
        if(!this.props.user||!this.props.isLogin) return null
        const res = await myserver.post('/api/user/getUserForSerach',{sender:this.props.user});
        console.log(res)

        this.setState({users:res.data});

    }

    onClickSendReq=(geter)=>{
       
        myserver.post('/api/user/addnewfriend',{geter,sender:this.props.user})
         
    }
    filterUsersForSerach=(user)=>{
        let IsUserIsGood=true;
        if(!new RegExp('^' + this.state.query).test(user.email)) IsUserIsGood=false;
        if(this.props.user._id===user._id) IsUserIsGood=false;
        if(this.props.user.friends[user._id])IsUserIsGood=false;
        return IsUserIsGood;

    }

    cancelOrStartTheClock=()=>{
        if(this.state.idForTheClock){
            console.log('clear')
           clearTimeout(this.state.idForTheClock);
           this.setState({idForTheClock:''});
           
        }
            const time = setTimeout(()=>{
                const filter = this.state.users.filter(user=>this.filterUsersForSerach(user));
                this.setState({filterUsers:filter});
            console.log('start')

            },200)
            this.setState({idForTheClock:time});
        
    }


    onChangText=(e)=>{
        this.setState({query: e.target.value});
        this.cancelOrStartTheClock();
    }
     renderUsersList=()=>{
        if(!this.state.filterUsers) return null
        return this.state.filterUsers.map((user) => (
            <ListGroup.Item key={user._id} className='row'>
            <Row>

            <Col xs='4'>
            <Avatar alt='profile'  src={user.imageProfile} style={{ fontSize: 30 }}   />
       

            </Col>
            <Col xs='7'>
            <p>{`${user.firstName} ${user.email}`}</p>

            </Col>
            <Col xs='1'>
              <Avatar className='imgLeg imageAddFri' onClick={()=>this.onClickSendReq(user)} alt='add button'  src='addFriend.png' style={{ fontSize: 30 }}  />
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
    ,isLogin:state.auth.isLogin
})


export default connect(mapStateToProps,{add_Friend}) (SerachFriend);