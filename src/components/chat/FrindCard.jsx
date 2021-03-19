import React from "react";
import { Avatar, Tooltip, Grid } from "@material-ui/core";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

function FrindCard({ friend, buttons }) {
  const renderBuutonChatOrAccept = () => {
    if (friend.status !== "waiting")
      return (
        <Grid key={friend._id} item>
          {buttons.map((button) => {
            return (
              <Tooltip
                onClick={() => button.onClick(friend)}
                key={button.title}
                title={button.title}
              >
                <Button>{button.text}</Button>
              </Tooltip>
            );
          })}
        </Grid>
      );
    return (
      <Tooltip
        key={"waiting"}
        title={"waiting for " + friend.firstName + " to response"}
      >
        <Button>{"Pending"}</Button>
      </Tooltip>
    );
  };

  return (
    <ListGroup.Item className="row">
      <Row>
        <Col xs="4">
          <Avatar
            alt="profile"
            src={friend.imageProfile}
            style={{ fontSize: 30 }}
          />
        </Col>
        <Col xs="5">
          <p>{`${friend.firstName} ${friend.email}`}</p>
        </Col>
        <Col xs="3">{renderBuutonChatOrAccept()}</Col>
      </Row>
    </ListGroup.Item>
  );
}

export default FrindCard;
