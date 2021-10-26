import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { userLoggedInSelector } from 'redux/user/userSelector'
import { signOut } from 'redux/user/userAction'

interface Props {
	size: string
	onClick?: () => void
}
const useStyle = makeStyles<Theme, Props>(theme =>
	createStyles({
		container: {
			width: '100%',
			height: '100%',
			margin: '0 10px',
		},
		image: {
			width: ({ size }) => size,
			height: 'auto',
			cursor: 'pointer',
			'&:active': {
				opacity: 0.2,
			},
			'&:hover': {
				opacity: 0.6,
			},
		},
	})
)
export const LogOutButton = ({ size, onClick }: Props) => {
	const classes = useStyle({ size })
	const islogout = useSelector(userLoggedInSelector)
	const dispatch = useDispatch()
	const handleClick = () => {
		dispatch(signOut())
		onClick && onClick()
	}
	if (islogout)
		return (
			<div className={classes.container}>
				<div onClick={handleClick} className={classes.image}>
					<LogoutIcon sx={{ fontSize: size }} />
				</div>
			</div>
		)
	return null
}
