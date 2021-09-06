/* eslint-disable no-useless-escape */
import React from "react";
import { Button, Container } from 'react-bootstrap';
import { useState } from "react";
import { connect } from "react-redux";

import Login from "../../chat/Login";
import Register from "../../chat/Register";

import './style.css'


const ScreenLoginRegister = ({ user, language: { texts: { loginRegisterScreen } }, language }) => {
  const [login, setLogin] = useState(true)


  const renderLoginOrRegistration = () => login ?
    <Login /> :
    <Register />

  const renderButtonChangeMode = () => {
    return (
      <Button onClick={() => setLogin(!login)} id='changeModeRL' variant="primary" size="lg" block>
        {login ? loginRegisterScreen.register.buttonForRegister : loginRegisterScreen.login.buttonForLogin}
      </Button>
    )
  }

  return (
    <Container className="">
      <div className="containerLogin">
        {renderLoginOrRegistration()}
        {renderButtonChangeMode()}

      </div>
    </Container>

  )
}


const mapStateToProps = ({ user, language }) => {
  return { user, language };
};

export default connect(mapStateToProps, {})(ScreenLoginRegister);
