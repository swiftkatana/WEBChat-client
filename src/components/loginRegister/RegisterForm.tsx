import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
	userErrorSelector,
	userLoggedInSelector,
	userLoadingSelector,
} from '../../redux/user/userSelector'
import Paths from 'routes/path-names'
import { languageWordsSelector } from '../../redux/language/languageSelector'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputBuilder from '../InputBuilder'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const schema = yup.object().shape({
	email: yup
		.string()
		.trim()
		.email()
		.matches(/^[a-z\u05D0-\u05EA]+$/i)
		.required(),
	password: yup
		.string()
		.trim()
		.matches(/^[a-z\u05D0-\u05EA]+$/i)
		.required(),
	confirmPassword: yup
		.string()
		.trim()
		.matches(/^[a-z\u05D0-\u05EA]+$/i)
		.equals(['password'])
		.required(),
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
			[breakpoints.down('lg')]: {
				width: '50%',
			},
			[breakpoints.down('md')]: {
				width: '70%',
			},
			[breakpoints.down('xs')]: {
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

	const history = useHistory()
	const classes = useStyles()
	const { register, handleSubmit, formState } = useForm<FormErrors>({
		resolver: yupResolver(schema),
	})
	const { errors } = formState

	useEffect(() => {
		isLoggedIn && history?.push(Paths.LOBY)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn])

	const onFormSubmit = ({ email, password }: FormErrors) => {}
	const renderError = () => {
		if (userError) return userError.error
		else if (errors.password?.message) return errors.password?.message
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
					pattern={/\d+($|[^.\d])/i}
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
					showError={renderError()}
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
				<LoadingButton loading={loading} loadingPosition='start' variant='outlined'>
					<Typography>{language.loginRegisterScreen.register.button}</Typography>
				</LoadingButton>
			</div>
		</form>
	)
}
