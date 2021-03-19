import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

import { updatefriend, openChat } from "../../action";
import myserver from "../../api/myserver";
import UsersList from "../chat/UsersList";
import { acceptFriendRequestUrl } from "../../api/apiKeys";

const FriendsList = (props) => {
  const onClickAcceptReq = (user2) => {
    myserver.post(acceptFriendRequestUrl, {
      user1: props.user,
      user2,
      type: 'accept'
    });
  };
  const onclickDeletefriend = (geter) => {
    console.log("delete");
    myserver.post("/api/user/deletefriendreq", {
      sender: props.user,
      geter,
    });
  };
  const onclickBlockfriend = (geter) => {
    myserver.post("/api/user/blockfriendreq", {
      sender: props.user,
      geter,
      type: 'unBlock'
    });
  };

  const onUnblockAfriend = (geter) => {
    myserver.post("/api/user/unblockFirend", {
      sender: props.user,
      geter,
    });
  };
  const onOpenChat = (friend) => {
    props.openChat(friend.chatId);
  };
  let btn1 = [
    { onClick: onOpenChat, text: "Open Chat", title: "Open Chat" },
    { onClick: onclickDeletefriend, text: "Delete", title: "Delete Friend" },
    { onClick: onclickBlockfriend, text: "Block", title: "Block A Friend" },
  ];
  let btn2 = [
    { onClick: onclickBlockfriend, text: "Block", title: "Block Request" },
    { onClick: onClickAcceptReq, text: "Accept", title: "Accept Request" },
    {
      onClick: onclickDeletefriend,
      text: "Decline",
      title: "Decline Request",
    },
  ];
  let btn3 = [
    { onClick: onUnblockAfriend, text: "UnBlock", title: "UnBlock A Friend" },
  ];

  const renderFriendsList = () => {
    if (props.user) {
      const friends = Object.values(props.user.connections);
      return (
        <div>
          <UsersList
            friends={friends}
            friendsListHeader={"Friends"}
            buttons={btn1}
            whatKindOfList={["accept", "iaccept"]}
          />

          <UsersList
            friends={friends}
            friendsListHeader={"Pendding Friends"}
            buttons={btn2}
            whatKindOfList={["waiting", "sender"]}
          />

          <UsersList
            friends={friends}
            friendsListHeader={"Dark List"}
            buttons={btn3}
            whatKindOfList={["iblock"]}
          />
        </div>
      );
    }
    return <h1>Please logIng Or Register</h1>;
  };

  return <Container>{renderFriendsList()}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updatefriend, openChat })(
  FriendsList
);
