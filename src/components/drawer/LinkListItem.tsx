import React, { useEffect, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { changeURL } from '../../history'
import { useLocation } from 'react-router'
import { userLoggedInSelector } from '../../redux/user/userSelector'
import { useSelector } from 'react-redux'

interface Props {
	path: string
	name: string
	show: boolean
	onClick?: () => void
}

export const LinkListItem = ({ path, name, show, onClick }: Props) => {
	const [disabled, setDisabled] = useState(false)
	const isLoggedIn = useSelector(userLoggedInSelector)
	const location = useLocation()
	const handleClick = () => {
		changeURL(path)
		onClick && onClick()
	}
	useEffect(() => {
		if (location.pathname === path) setDisabled(true)
		else setDisabled(false)
	}, [location, path])

	if ((isLoggedIn && show) || (!show && !isLoggedIn))
		return (
			<ListItem button disabled={disabled} onClick={handleClick} key={name}>
				<ListItemText primary={name} />
			</ListItem>
		)
	else return null
}
