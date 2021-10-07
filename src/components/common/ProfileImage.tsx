import React from 'react'
import { styled } from '@mui/system'
import { Badge, Avatar } from '@mui/material'

interface Props {
	image: { online?: boolean; type: 'url' | 'name'; url: string }
}

function stringToColor(string: string) {
	let hash = 0
	let i

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.substr(-2)
	}
	/* eslint-enable no-bitwise */

	return color
}

function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	}
}

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}))
export const ProfileImage = ({ image }: Props) => {
	const { online, type, url } = image
	const renderImage = () => {
		if (type === 'url') return <Avatar alt={`Avatar n°${1 + 1}`} src={url} />
		else return <Avatar {...stringAvatar(url)} />
	}
	return (
		<StyledBadge
			overlap='circular'
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			variant={online ? 'dot' : 'standard'}
		>
			{renderImage()}
		</StyledBadge>
	)
}
