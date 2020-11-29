import React from "react";
import { connect } from "react-redux";
import { Route, HashRouter } from "react-router-dom";

import {
  createCHAT,
  openChat,
  deleteChat,
  fetchChats,
  signOut,
} from "./action";
import SerachFriend from "./components/screens/ScreenSerachFriend";
import DrawerPage from "./components/chat/DrawerPage";
import { changeURL } from "./history";
import LogicArea from "./components/LogicArea";
import Profile from "./components/screens/ProfileScreen";
import FriendsList from "./components/screens/FriendsListScreen";
import ChatScreen from "./components/screens/ChatScreen";
import MainPageScreen from "./components/screens/LobyPageScreen";

class App extends React.Component {
  componentDidMount() {
    !this.props.isLogin ? changeURL("/") : console.log();
  }
  render() {
    return (
      <DrawerPage>
        <LogicArea />
        <HashRouter>
          <Route path="/profile" exact component={Profile} />
          <Route path="/addFrind" exact component={SerachFriend} />
          <Route path="/chat" exact component={ChatScreen} />
          <Route path="/friends.list" exact component={FriendsList} />
          <Route path="/" exact component={MainPageScreen} />
        </HashRouter>
      </DrawerPage>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  isLogin: state.auth.isLogin,
});

export default connect(mapStateToProps, {
  createCHAT,
  openChat,
  deleteChat,
  fetchChats,
  signOut,
})(App);
