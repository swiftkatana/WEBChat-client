import React, { useState } from 'react'
import { Button, Col, Form, FormControl, InputGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { signIn } from '../../action'
import { userRegisterUrl } from '../../api/apiKeys'
import myserver from '../../api/myserver'

function Register({ signIn, language }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  const texts = language.texts.loginRegisterScreen
  let errors = language.texts.errors

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




  const handlerSubmit = async e => {
    e.preventDefault();
    // eslint-disable-next-line
    // const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,32}$");
    // const isOk = re.test(password);

    // if (!isOk) {
    //   setError(texts.password.error)
    //   return
    // }

    setLoading(true);
    const res = await myserver.post(userRegisterUrl, { email, password, firstName, lastName })
    console.log(res)
    setLoading(false);
    if (res.data.error) {
      if (texts.errorLogin[res.data.error])
        setError(texts.errorLogin[res.data.error])
      else
        setError('error unkown')

    }

    if (res.data.user) {

      signIn(res.data.user)
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
  const renderFullName = () => {
    if (language.langNow === 'English')
      return (
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{texts.firstName.leabel}</Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  type={''}
                />

              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{texts.lastName.leabel}</Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  type={''}
                />

              </InputGroup>
            </Form.Group>
          </Col>
        </Form.Row>
      )

    else
      return (
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{texts.lastName.leabel}</Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  type={''}
                />

              </InputGroup>
            </Form.Group>

          </Col>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>{texts.firstName.leabel}</Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  type={''}
                />

              </InputGroup>
            </Form.Group>
          </Col>
        </Form.Row>

      )



  }

  return (
    <Form onSubmit={handlerSubmit}>
      <h1 className="L-R-Leabel">{texts.register.leabel}</h1>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>{texts.email.leabel}</Form.Label>
        <Form.Control value={email} required type="email" onChange={handlerEmailChange} placeholder={texts.email.placeholder} />

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

      </Form.Group>
      {renderFullName()}

      { renderErrorMessage()}
      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
      >
        {isLoading ? 'Loading…' : texts.register.button}
      </Button>
    </Form >
  )
}

const mapStateToProps = ({ language }) => {
  return { language };
};

export default connect(mapStateToProps, { signIn })(Register);
