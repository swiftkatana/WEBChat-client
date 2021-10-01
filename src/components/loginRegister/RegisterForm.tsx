import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	userErrorSelector,
	userLoggedInSelector,
	userLoadingSelector,
} from '../../redux/user/userSelector'
import { languageWordsSelector } from '../../redux/language/languageSelector'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputBuilder from '../common/InputBuilder'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { clearUserError } from 'redux/user/userReducer'
import { ICreateUser } from '../../interfaces/user/index'
import { signUpUser } from '../../redux/user/userAction'
import historyMain from '../../history'

const schema = yup.object().shape({
	email: yup.string().trim().email().required(),
	password: yup.string().trim().required(),
	firstName: yup.string().trim().required(),
	lastName: yup.string().trim().required(),
})

const useStyles = makeStyles<Theme>(({ breakpoints }) =>
	createStyles({
		form: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			alignItems: 'center',
		},
		input: {
			// ...useResponseStyle({ width: '100%' },{ width: '100%' },{ width: '100%' },{ width: '100%' },),
			[breakpoints.up('md')]: {
				margin: '2rem 0 ',
				width: '30%',
			},
			[breakpoints.down('lg')]: {
				width: '80%',
			},
			margin: '1rem 0 ',
		},
		btnContainer: { marginTop: '1rem' },
	})
)
interface FormErrors {
	email?: string
	password?: string
	firstName?: string
	lastName?: string
}

export const RegisterForm: FC = () => {
	const userError = useSelector(userErrorSelector)
	const isLoggedIn = useSelector(userLoggedInSelector)
	const language = useSelector(languageWordsSelector)
	const loading = useSelector(userLoadingSelector)
	const dispatch = useDispatch()

	const history = useHistory()
	const classes = useStyles()
	const { register, handleSubmit, formState } = useForm<FormErrors>({
		resolver: yupResolver(schema),
	})
	const { errors } = formState

	useEffect(() => {
		const from = (historyMain.location.state as any)?.from || '/'
		isLoggedIn && history?.push(from)
		return () => {
			dispatch(clearUserError())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn])

	const onFormSubmit = (formData: ICreateUser) => {
		console.log('register')
		dispatch(signUpUser(formData))
	}

	const renderError = () => {
		if (userError) return userError.error
		else if (errors.lastName?.message) return errors.lastName?.message
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
			<div className={classes.input}>
				<InputBuilder
					register={register}
					showError={errors.email?.message}
					name='email'
					type='email'
					placeholder={language.loginRegisterScreen.email.placeholder}
				/>
			</div>
			<div className={classes.input}>
				<InputBuilder
					name='password'
					type='password'
					placeholder={language.loginRegisterScreen.password.placeholder}
					showError={renderError()}
					register={register}
				/>
			</div>
			<div className={classes.input}>
				<InputBuilder
					pattern={/\d+($|[^.\d])/i}
					name='firstName'
					type='text'
					placeholder={language.loginRegisterScreen.firstName.leabel}
					showError={errors.firstName?.message}
					register={register}
				/>
			</div>
			<div className={classes.input}>
				<InputBuilder
					pattern={/\d+($|[^.\d])/i}
					name='lastName'
					type='text'
					placeholder={language.loginRegisterScreen.lastName.leabel}
					showError={renderError()}
					register={register}
				/>
			</div>
			<div className={classes.btnContainer}>
				<LoadingButton type='submit' loading={loading} loadingPosition='start' variant='outlined'>
					<Typography>{language.loginRegisterScreen.register.button}</Typography>
				</LoadingButton>
			</div>
		</form>
	)
}
