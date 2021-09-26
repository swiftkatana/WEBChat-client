import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { makeStyles, createStyles } from '@mui/styles'
import { Theme, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
	userErrorSelector,
	userLoggedInSelector,
	userLoadingSelector,
} from '../../redux/user/userSelector'
import Paths from '../../routes/path-names'
import { languageWordsSelector } from '../../redux/language/languageSelector'
import InputBuilder from '../common/InputBuilder'
import { signinUser } from '../../redux/user/userAction'
import { ISignInParameters } from '../../interfaces/user/index'
import { clearUserError } from 'redux/user/userReducer'

const schema = yup.object().shape({
	email: yup.string().trim().email().required(),
	password: yup.string().trim().required('Please Enter your password'),
	// .matches(
	// 	/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
	// 	'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
	// ),
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
		btnContainer: {
			marginTop: '4rem',
		},
	})
)
export const LoginForm: FC = () => {
	const userError = useSelector(userErrorSelector)
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(userLoggedInSelector)
	const loading = useSelector(userLoadingSelector)
	const language = useSelector(languageWordsSelector)
	const history = useHistory()
	const classes = useStyles()
	const { register, handleSubmit, formState, watch } = useForm<ISignInParameters>({
		resolver: yupResolver(schema),
	})
	const allWatch = watch()
	const { errors } = formState
	const onFormSubmit = ({ email, password }: ISignInParameters) =>
		dispatch(signinUser({ email, password }))
	useEffect(() => {
		dispatch(clearUserError())
	}, [allWatch.email, allWatch.password, dispatch])
	useEffect(() => {
		isLoggedIn && history?.push(Paths.LOBY)
		return () => {
			dispatch(clearUserError())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn])
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
					name='password'
					type='password'
					placeholder={language.loginRegisterScreen.password.placeholder}
					showError={renderError()}
					register={register}
				/>
			</div>
			<div className={classes.btnContainer}>
				<LoadingButton
					type='submit'
					size='large'
					loading={loading}
					loadingPosition='start'
					variant='text'
				>
					<Typography>{language.loginRegisterScreen.login.button}</Typography>
				</LoadingButton>
			</div>
		</form>
	)
}
