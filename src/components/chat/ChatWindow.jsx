import React from "react";
import { connect } from "react-redux";

export const ChatWindow = (props) => {
  const renderDateOfCreateMessage = (date) => {
    var d = new Date();

    date = new Date(date);
    var numberOfDays = Math.floor((d - date) / (1000 * 60 * 60 * 24));
    switch (numberOfDays) {
      case 0:
        return "today";
      case 1:
        return "Yesterday";
      case 2:
        return "3 days ago";
      default:
        return `${date.d}/${date.m}/${date.y}`;
    }
  };

  const renderMessgesList = () => {
    return props.mesagesArr.map((message, index) => {
      return (
        <div
          key={message.message + index}
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "relative",
            minHeight: "100px",
          }}
        >
          <div
            style={renderStyleForTheMessage(message.senderId, {
              textAlign: "right",
              position: "absolute",
              top: 0,
              right: 0,
              minWidth: "100px",
            })}
            id="body-message"
          >
            <div
              style={renderStyleForTheMessage(message.senderId, {
                backgroundColor: "#b5f66f",
              })}
              id="message"
            >
              <p id="textMessage">{message.message}</p>
            </div>
            <small>
              {" "}
              {`${renderDateOfCreateMessage(message.createTime.date)} at ${message.createTime.time
                } by ${message.senderName}`}{" "}
            </small>
          </div>
        </div>
      );
    });
  };

  const renderStyleForTheMessage = (email, style) => {
    return email === props.user.email ? style : {};
  };
  return (
    <div id="chat-window">
      <div id="output">
        <div>{renderMessgesList()}</div>

        {props.scroolDown}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
