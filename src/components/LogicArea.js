import React from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";

import { add_Friend, updatefriend, deleteFriend, addMessage } from "../action";
import myserver from "../api/myserver";
import io from "../io";

class LogicArea extends React.Component {
  state = {
    show: false,
    whatKind: "",
    body: "",
    lastFriendReq: {},
    newReqSound: new Audio("newReq.mp3"),
  };

  componentDidUpdate() {
    this.setListenerSocket();
  }
  setListenerSocket = () => {
    if (this.props.isLogin && this.props.user) {
      if (!io.connected) {
        io.connect();

      }
      io.on('userLive' + this.props.user._id, ({ type, data }) => {
        console.log('socket work ', type)
        switch (type) {

          //my friend req have been accept
          case "NEW_FRIEND_REQUEST":
            console.log("friend");
            this.state.newReqSound.play();

            this.setState({
              lastFriendReq: data,
              show: true,
              whatKind: "newFriendreq",
              body: data.firstName + " " + data.lastName,
            });
            this.props.add_Friend(data);

            break;

          // friend request accept 
          case "firendReqAccept":
            if (data.status === "accept") {
              this.state.newReqSound.play();

              this.setState({
                lastFriendReq: data,
                show: true,
                whatKind: "newFriendreq",
                body: data.firstName + " " + data.lastName,
              });
            }
            this.props.updatefriend({
              _id: data._id,
              status: "accept",
              chatId: data.chatId,
              user: data,
              chat: data.chat,
            });
            break;

          // friend  as been delete 
          case "deleteFriend":
            console.log("delete");
            this.props.deleteFriend(data);
            break;

          // your friend request has been decline
          case "declineFriendReq":
            console.log("decline");
            this.props.deleteFriend(data);
            break;

          // your friend  has block you as a friend
          case "blockFriendReq":
            console.log("block");

            this.props.updatefriend({
              _id: data._id,
              user: data,
              status: "decline",
            });
            break;
          case "message":
            this.props.addMessage(data);
            console.log('got a message');
            break;

          default:
            alert(data);
            break;
        }

      });

    } else if (this.state.id && !this.props.isLogin && !this.props.user) {
      io.off();
    }
  };
  onClickDeclineReq = (sender) => {
    this.setState({ show: false });

    // let res = await
    myserver.post("/api/user/declineFriendReq", {
      sender: this.props.user,
      geter: sender,
    });
  };

  onClickAcceptReq = async (sender) => {
    this.setState({ show: false });

    //sender is who that accept a req geter is who that send a req
    let res = await myserver.post("/api/user/friendreqaccept", {
      accepter: this.props.user,
      sender: sender,
    });

    // res get "good" || "bad" String the rest is going on socket
    alert(res.data);
  };
  onShowOrHide = () => {
    this.setState({ show: !this.state.show });
  };

  renderModal = () => {
    if (!this.state.show) return null;
    var onGood, onBad, good, bad, header, body;

    switch (this.state.whatKind) {
      case "error":
        bad = "close";
        header = "error";
        body = this.state.body;
        onBad = () => this.onShowOrHide();
        break;
      case "newFriendReq":
        console.log(this.state.lastFriendReq);
        good = "Accept";
        bad = "Decline";
        header = "you got new friend request";
        body = `your new friend request send from ${this.state.body} `;
        onGood = () => {
          this.onClickAcceptReq(this.state.lastFriendReq);
        };
        onBad = () => {
          this.onClickDeclineReq(this.state.lastFriendReq);
        };
        break;
      case "friendReqAccept":
        bad = "close";
        header = "you Got Accept";
        body = ` ${this.state.body} accept your friend request 😎 `;
        onBad = () => this.onShowOrHide();
        break;

      default:
        break;
    }

    return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.show}
        onHide={this.onShowOrHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {good ? (
            <Button variant="secondary" onClick={onGood}>
              {good}
            </Button>
          ) : null}
          {bad ? (
            <Button variant="danger" onClick={onBad}>
              {bad}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return <>{this.renderModal()}</>;
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  add_Friend,
  updatefriend,
  deleteFriend,
  addMessage
})(LogicArea);
