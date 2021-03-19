import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, HashRouter } from "react-router-dom";

import SerachFriend from "./components/screens/ScreenSerachFriend";
import DrawerPage from "./components/screens/DrawerPage";
import LogicArea from "./components/LogicArea";
import Profile from "./components/screens/ProfileScreen";
import FriendsList from "./components/screens/FriendsListScreen";
import LobyPageScreen from "./components/screens/LobyPageScreen";
import ChatScreen from "./components/screens/chatScreen/ChatScreen";
import { fetchChats } from "./action";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { changeURL } from "./history";


const App = ({ user, fetchChats, language }) => {
  useEffect(() => {
    if (!user)
      changeURL("/")
  }, [user]);



  return (
    <DrawerPage >
      <LogicArea />
      <HashRouter >
        <Route path="/profile" exact component={Profile} />
        <Route path="/addFrind" exact component={SerachFriend} />
        <Route path="/chat:" exact component={ChatScreen} />
        <Route path="/friends.list" exact component={FriendsList} />
        <Route path="/" exact component={LobyPageScreen} />
      </HashRouter>
    </DrawerPage>
  );
};
const mapStateToProps = ({ user, language }) => ({
  user,
  language,

});

export default connect(mapStateToProps, { fetchChats })(App);
