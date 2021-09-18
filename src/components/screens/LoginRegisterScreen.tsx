import React, { FC, useState } from 'react'
import { Theme } from '@mui/material'

import { LoginForm } from '../loginRegister/LoginForm'
import { RegisterForm } from '../loginRegister/RegisterForm'

import { useSelector } from 'react-redux'
import { languageWordsSelector } from '../../redux/language/languageSelector'
import { createStyles, makeStyles } from '@mui/styles'
import { ChangeMode } from '../loginRegister/ChangeMode'
// import BirdSVGc from '../../assets/bird.svg'
const useStyles = makeStyles<Theme>(({ palette }) =>
	createStyles({
		container: {
			width: '100%',
			height: '90%',
			flexDirection: 'column',
			display: 'flex',
			position: 'relative',
			alignItems: 'center',
			justifyContent: 'center',
		},
		changeMode: {
			position: 'absolute',
			top: 0,
			right: 0,
			display: 'flex',
			flexFlow: 'row-reverse',
			width: '80%',
		},
	})
)

const ScreenLoginRegister: FC = () => {
	const classes = useStyles()
	const [showLogin, setShowLogin] = useState(true)
	const language = useSelector(languageWordsSelector)
	const renderLoginOrRegistration = () => (showLogin ? <LoginForm /> : <RegisterForm />)
	const renderButtonChangeModeText = () =>
		showLogin
			? language.loginRegisterScreen.register.buttonForRegister
			: language.loginRegisterScreen.login.buttonForLogin

	return (
		<div className={classes.container}>
			<div className={classes.changeMode}>
				<ChangeMode text={renderButtonChangeModeText()} onClick={() => setShowLogin(!showLogin)} />
			</div>
			{/* <img src={BirdSVG} alt='logo' /> */}
			{renderLoginOrRegistration()}
		</div>
	)
}

export default ScreenLoginRegister
