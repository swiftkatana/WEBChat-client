import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  FormControl,
  InputGroup,
  Container,
  ListGroup,
  Col,
  Row,
  Form,
} from "react-bootstrap";

import { add_Friend } from "../../action";
import myserver from "../../api/myserver";
import { Avatar, LinearProgress } from "@material-ui/core";
import { queryUsers, sendFriendRequestUrl } from "../../api/apiKeys";


const SerachFriend = ({ user, language, add_Friend }) => {
  const [error, setError] = useState("")
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [idForTheClock, setIdForTheClock] = useState('')
  const [loading, setLoading] = useState(false)


  let errors = language.texts.errors
  let texts = language.texts.SerachFriendScreen

  useEffect(() => {
    if (loading && !query) {
      setLoading(false);
    }
  }, [query, loading])

  const getAllUsers = async () => {
    try {
      if (!user || !query)
        return null;

      const res = await myserver.get(queryUsers(user._id, query));
      let error = res.data.error;
      let users = res.data.users;

      if (error) {
        console.log(error)
        setLoading(false)
        setError(error)
      }

      else {
        setUsers(users || [])
        setLoading(false)
      }


    } catch (error) {
      setError(error);
    }

  };

  const onClickSendReq = async (geter) => {
    try {
      const res = await myserver.post(sendFriendRequestUrl, { geter, sender: user });

      let error = res.data.error;
      let data = res.data.user;

      if (error) {
        setError(error)
      } else {
        // what we do with the user we get
        add_Friend(data);

      }
    } catch (error) {
      setError(error);

    }
  };



  const cancelOrStartTheClock = () => {
    if (idForTheClock) {
      clearTimeout(idForTheClock);
      setIdForTheClock('');
    }
    const time = setTimeout(() => {
      setLoading(true);
      getAllUsers();
    }, 500);
    setIdForTheClock(time);
  };

  const onChangText = (e) => {
    if (e.target.value)
      cancelOrStartTheClock();
    setQuery(e.target.value)
  };

  const renderUsers = () => {
    return users.map((user) => (
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
              onClick={() => onClickSendReq(user)}
              alt="add button"
              src="addFriend.png"
              style={{ fontSize: 30 }}
            />
          </Col>
        </Row>
      </ListGroup.Item>
    ));
  }

  const renderErrorMessage = () => {

    if (!error)
      return null
    let errorText = errors[error] || error
    console.log(errorText)
    return (
      <Form.Text className=" info">
        {errorText}
      </Form.Text>
    )


  }

  const renderLoading = () => {
    return (
      <Row className="container-fluid">
        <Col xs={12} md={12}>
          <LinearProgress color="secondary" />
        </Col>
      </Row>

    )
  }
  const renderList = () => {
    if (loading)
      return renderLoading();

    if (!query)
      return (
        <h1 className='info' > {texts.startLookin}</h1>
      )


    if (error)
      return renderErrorMessage()


    return renderUsers()



  };

  return (
    <Container>
      <InputGroup className="mb-2 mr-sm-2">
        <FormControl
          value={query}
          onChange={onChangText}
          id="inlineFormInputGroupUsername2"
          placeholder="email"
        />
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
      <ListGroup>{renderList()}</ListGroup>
    </Container>
  );
}

const mapStateToProps = ({ user, language }) => ({
  user,
  language
});

export default connect(mapStateToProps, { add_Friend })(SerachFriend);
