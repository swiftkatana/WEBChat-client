import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { InputAdornment, TextField, Theme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface IStyleProps {
	showError: string | undefined
}
interface Props {
	placeholder: string
	name: any
	type: string
	register: UseFormRegister<any>
	showError: string | undefined
	filter?: {}
	onChange?: (input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {}
	pattern?: RegExp
}

const useStyles = makeStyles<Theme, IStyleProps>(() =>
	createStyles({
		input: {
			width: '100%',
			height: '2rem',
			boxSizing: 'border-box',
			outline: ({ showError }) => (showError ? 'none' : ''),
			border: ({ showError }) => `1px solid ${showError ? 'red' : 'rgba(49, 49, 49, 0.15)'}`,
			borderRadius: '4px',
			color: 'black',
		},
	})
)

const InputBuilder = ({
	placeholder,
	type,
	register,
	name,
	showError,
	pattern,
	filter,
	onChange,
}: Props) => {
	const registerInput = register(name, filter)
	const classes = useStyles({ showError })
	const onOrFalse = type === 'password'
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault()
	const renderAdornt = () => {
		if (onOrFalse)
			return (
				<InputAdornment position='end'>
					<IconButton
						aria-label='toggle password visibility'
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
					>
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</InputAdornment>
			)
		return <></>
	}
	const renderType = () => {
		if (showPassword) return 'text'
		else return type
	}

	return (
		<TextField
			variant='standard'
			{...filter}
			className={classes.input}
			{...register(name)}
			onChange={e => {
				if (pattern) e.target.value = e.target.value.replace(pattern, '')
				if (onChange) onChange(e)
				registerInput.onChange(e)
			}}
			placeholder={placeholder}
			type={renderType()}
			InputProps={{ endAdornment: renderAdornt() }}
		/>
	)
}

export default InputBuilder
