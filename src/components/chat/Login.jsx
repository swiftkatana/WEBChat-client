import React, { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { connect } from "react-redux";
import { signIn } from '../../action';

import { userLoginUrl } from '../../api/apiKeys'
import myserver from '../../api/myserver'
import io from '../../io';

function Login({ language, signIn }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)

  let texts = language.texts.loginRegisterScreen
  let errors = language.texts.errors
  const handlerSubmit = async e => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await myserver.get(userLoginUrl(password, email))
      setLoading(false);
      if (res.data.error)
        setError(res.data.error)

      if (res.data.user) {
        io.emit('loginToTheWebSite', res.data.user.email)
        signIn(res.data.user)

      }


    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }


  const renderErrorMessage = () => {

    if (!error)
      return null
    let errorText = errors[error] || error
    return (
      <Form.Text className=" error">
        {errorText}
      </Form.Text>
    )


  }

  const handlerPasswordChange = (e) => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 500);
    }
    setPassword(e.target.value)
  }

  const handlerEmailChange = (e) => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 500);
    }
    setEmail(e.target.value)
  }

  return (
    <Form onSubmit={handlerSubmit}>
      <h1 className="L-R-Leabel">{texts.login.leabel}</h1>
      <Form.Group className="" controlId="formBasicEmail">
        <Form.Label>{texts.email.leabel}</Form.Label>
        <Form.Control
          value={email}
          required
          type="email"
          onChange={handlerEmailChange}
          placeholder={texts.email.placeholder}
        />
        <Form.Text className="text-muted">
          {texts.email.subText}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>{texts.password.leabel}</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            value={password}
            onChange={handlerPasswordChange}
            required
            type={hidePassword ? 'password' : 'text'}
            placeholder={texts.password.placeholder}
          />
          <InputGroup.Append>
            <Button onClick={() => setHidePassword(!hidePassword)} variant={`${hidePassword ? "primary" : "danger"}`} >
              {hidePassword ? "Show" : "Hide"}
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {renderErrorMessage()}

      </Form.Group>
      <Button
        type="submit"
        variant="info"
        disabled={isLoading}
      >
        {isLoading ? 'Loading…' : texts.login.button}
      </Button>
    </Form>
  )
}



const mapStateToProps = ({ language }) => {
  return { language };
};

export default connect(mapStateToProps, { signIn })(Login);
