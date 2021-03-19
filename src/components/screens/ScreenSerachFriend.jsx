import React from "react";
import { connect } from "react-redux";
import {
  FormControl,
  InputGroup,
  Container,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";

import { add_Friend } from "../../action";
import myserver from "../../api/myserver";
import { Avatar, LinearProgress } from "@material-ui/core";
import { queryUsers, sendFriendRequestUrl } from "../../api/apiKeys";

class SerachFriend extends React.Component {
  state = {
    users: [],
    query: "",
    idForTheClock: "",
    serachDone: false,
    loading: false,
  };

  componentDidUpdate() {
    if (!this.state.query && this.state.loading) {
      this.setState({ loading: false })

    }
  }



  getAllUsers = async () => {
    try {
      if (!this.props.user || !this.state.query) return null;

      const res = await myserver.get(queryUsers(this.props.user._id, this.state.query));
      if (res.data.error) {

      } else
        this.setState({ users: res.data.users || [], serachDone: true, loading: false });
    } catch (error) {
      console.log(error)
    }

  };

  onClickSendReq = async (user1) => {
    try {
      const res = await myserver.post(sendFriendRequestUrl, { user1, user2: this.props.user });
      let error = res.data.error;
      let user = res.data.user;
      if (error) {
        console.log(error)
      } else {
        // what we do with the user we get
        this.props.add_Friend(user);
        console.log(user)

      }
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
  };



  cancelOrStartTheClock = () => {
    if (this.state.idForTheClock) {
      clearTimeout(this.state.idForTheClock);
      this.setState({ idForTheClock: "" });
    }
    const time = setTimeout(() => {
      this.setState({ loading: true });
      this.getAllUsers();
    }, 500);
    this.setState({ idForTheClock: time });
  };

  onChangText = (e) => {
    if (!e.target.value)
      this.setState({
        users: [],
        query: "",
        idForTheClock: "",
        serachDone: true,
        loading: false,
      });
    else {
      this.setState({ query: e.target.value, serachDone: false });
      this.cancelOrStartTheClock();

    }


  };

  renderUsers = () => {
    return this.state.users.map((user) => (
      <ListGroup.Item key={user.email} className="row">
        <Row>
          <Col xs="4">
            <Avatar
              alt="profile"
              src={user.imageProfile}
              style={{ fontSize: 30 }}
            />
          </Col>
          <Col xs="7">
            <p>{`${user.firstName} ${user.email}`}</p>
          </Col>
          <Col xs="1">
            <Avatar
              className="imgLeg imageAddFri"
              onClick={() => this.onClickSendReq(user)}
              alt="add button"
              src="addFriend.png"
              style={{ fontSize: 30 }}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    ));
  }

  renderList = () => {
    if (this.state.loading)
      return (
        <Row className="container-fluid">
          <Col xs={12} md={12}>
            <LinearProgress color="secondary" />
          </Col>
        </Row>

      )

    if (!this.state.query)
      return (
        <h1> look for a new friend </h1>
      )


    if (this.state.users.length === 0 && this.state.serachDone)
      return (
        <Row>
          <Col xs="4">
            <h1> users not found</h1>
          </Col>
        </Row>
      );


    return this.renderUsers()



  };

  render() {
    return (
      <Container>
        <InputGroup className="mb-2 mr-sm-2">
          <FormControl
            value={this.state.query}
            onChange={this.onChangText}
            id="inlineFormInputGroupUsername2"
            placeholder="email"
          />
          <InputGroup.Prepend>
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
        <ListGroup>{this.renderList()}</ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, { add_Friend })(SerachFriend);
