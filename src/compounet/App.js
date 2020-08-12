import React from 'react'
import { connect } from 'react-redux'
import { Route, HashRouter } from 'react-router-dom';

import {createCHAT,openChat,deleteChat,fetchChats,signOut } from '../action'
import LoginRegister from './LoginRegister';
import SerachFriend from './chat/SerachFriend';
import ShowChatArea from './chat/ShowChatArea';
import DrawerPage from './chat/DrawerPage';
import history from '../history';
import LogicArea from './chat/LogicArea';



class App extends React.Component{
componentDidMount(){
  !this.props.isLogin?history.push('/wellcome'):console.log()
}

         render() {
           return (
             <DrawerPage>
                <LogicArea/>
                <HashRouter>
                    <Route path='/addFrind' exact component={SerachFriend} />
                    <Route path='/chat' exact component={ShowChatArea} />
                    <Route path='/wellcome' exact component={LoginRegister}/>
                </HashRouter>
             </DrawerPage>
           )
         }
        
}
    const mapStateToProps = (state) => ({
        user:state.user,
        isLogin:state.auth.isSignedIn
    })
    
    

export default connect(mapStateToProps,{createCHAT,openChat,deleteChat,fetchChats,signOut})(App);