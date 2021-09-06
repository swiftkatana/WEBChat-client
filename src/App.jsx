import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, HashRouter } from "react-router-dom";

import DrawerPage from "./components/screens/DrawerPage";
import SerachFriendScreen from "./components/screens/SerachFriendScreen";
import LogicArea from "./components/LogicArea";
import Profile from "./components/screens/ProfileScreen";
import FriendsList from "./components/screens/FriendsListScreen";
import LobyPageScreen from "./components/screens/LobyPageScreen";
import ChatScreen from "./components/screens/chatScreen/ChatScreen";
import { fetchChats } from "./action";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { changeURL } from "./history";
import { getMyFriendsUrl } from "./api/apiKeys";
import myserver from "./api/myserver";


const App = ({ user, fetchChats, language, friends }) => {
  useEffect(() => {
    if (!user)
      changeURL("/")
    if (user && !friends) {
      (async () => {
        try {
          let friends = await myserver.get(getMyFriendsUrl(user._id))
          console.log(friends)

        } catch (error) {
          console.error(error)
        }


      })()
    }

  }, [user, friends]);



  return (
    <DrawerPage >
      <LogicArea />
      <HashRouter >
        {/* <Route path='/' component={Header} /> */}
        {routes.map((route, index) =>
          route.public ? (
            <Route {...route} key={index} />
          ) : (
            <PrivateRoute {...route} key={index} />
          )
        )}
        <Route path="/profile" exact component={Profile} />
        <Route path="/addFrind" exact component={SerachFriendScreen} />
        <Route path="/chat:" exact component={ChatScreen} />
        <Route path="/friends.list" exact component={FriendsList} />
        <Route path="/" exact component={LobyPageScreen} />
      </HashRouter>
    </DrawerPage>
  );
};
const mapStateToProps = ({ user, language, friends }) => ({
  user,
  language,
  friends,

});

export default connect(mapStateToProps, { fetchChats })(App);
