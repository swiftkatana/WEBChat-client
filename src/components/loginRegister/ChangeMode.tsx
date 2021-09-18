import React, { FC } from 'react'
import { Button, Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles<Theme>(({ breakpoints, palette }) =>
	createStyles({
		btn: {
			width: '100%',
			'&:hover': {
				borderRadius: '30px 10px ',
			},
			'&:hover:after': {
				borderRadius: '30px 10px ',
				backgroundColor: '#FFFFFF',
			},
		},
		changeModeRL: {
			[breakpoints.down('lg')]: {
				width: '10%',
			},
			[breakpoints.down('md')]: {
				width: '70%',
			},
			[breakpoints.down('xs')]: {
				width: '80%',
			},

			animationName: 'onClick',
			animationDuration: '1s',
			display: 'flex',
			width: '10%',
			borderRadius: '30px 10px ',
			height: '10%',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: palette.action.active,
		},
	})
)
interface Props {
	onClick: () => void
	text: string
}

export const ChangeMode: FC<Props> = ({ text, onClick }) => {
	const classes = useStyles()
	return (
		<div key={text} className={classes.changeModeRL}>
			<Button className={classes.btn} onClick={onClick}>
				<Typography>{text}</Typography>
			</Button>
		</div>
	)
}
