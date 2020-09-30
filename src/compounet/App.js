import React from 'react'
import { connect } from 'react-redux'
import { Route, HashRouter } from 'react-router-dom';

import {createCHAT,openChat,deleteChat,fetchChats,signOut } from '../action'
import SerachFriend from './chat/SerachFriend';
import ShowChatArea from './chat/ShowChatArea';
import DrawerPage from './chat/DrawerPage';
import history from '../history';
import LogicArea from './chat/LogicArea';
import MainPage from './chat/MainPage';
import Profile from './chat/Profile';
import FriendsList from './chat/FriendsList';



class App extends React.Component{
componentDidMount(){
  !this.props.isLogin?history.push('/'):console.log()
}

         render() {
           return (
             <DrawerPage>
                <LogicArea/>
                <HashRouter>
                    <Route path='/profile' exact component={Profile} />
                    <Route path='/addFrind' exact component={SerachFriend} />
                    <Route path='/chat' exact component={ShowChatArea} />
                    <Route path='/friends.list' exact component={FriendsList}/>
                    <Route path='/' exact component={MainPage}/>
                </HashRouter>
             </DrawerPage>
           )
         }
        
}
    const mapStateToProps = (state) => ({
        user:state.user,
        isLogin:state.auth.isLogin
    })
    
    

export default connect(mapStateToProps,{createCHAT,openChat,deleteChat,fetchChats,signOut})(App);