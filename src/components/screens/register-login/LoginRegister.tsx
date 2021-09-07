import React, { FC, useState } from 'react'
import Login from '../../chat/Login'
import Register from '../../chat/Register'
import { Button, Container } from '@material-ui/core'

import './style.css'

const ScreenLoginRegister: FC = () => {
	const [login, setLogin] = useState(true)

	const renderLoginOrRegistration = () => (login ? <Login /> : <Register />)

	const renderButtonChangeMode = () => {
		return (
			<Button
				onClick={() => setLogin(!login)}
				id='changeModeRL'
				// variant='primary'
				// size='lg'
				// block
			>
				{/* {login
					? loginRegisterScreen.register.buttonForRegister
					: loginRegisterScreen.login.buttonForLogin} */}
			</Button>
		)
	}

	return (
		<Container className=''>
			<div className='containerLogin'>
				{renderLoginOrRegistration()}
				{renderButtonChangeMode()}
			</div>
		</Container>
	)
}

export default ScreenLoginRegister
