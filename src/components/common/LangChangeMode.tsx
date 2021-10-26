import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { languageStateSelector } from '../../redux/language/languageSelector'
import { changeLeguage } from '../../redux/language/languageReducer'
import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
interface Props {
	size: string
}
const useStyles = makeStyles<Theme, Props>(theme =>
	createStyles({
		container: {
			width: '100%',
			height: '100%',
			margin: '0 10px',
		},
		image: {
			cursor: 'pointer',

			'&:active': {
				opacity: 0.5,
			},
			'&:hover': {
				boxShadow: '0.5px 0.5px 5px #ffff',
			},
			width: ({ size }) => size,
			height: 'auto',
		},
	})
)

export const LangChangeMode: FC<Props> = ({ size }) => {
	const language = useSelector(languageStateSelector)
	const dispatch = useDispatch()
	const classes = useStyles({ size })
	const changeLeg = (language = '') => {
		dispatch(changeLeguage(language))
	}

	const renderImgLeg = () => {
		let nextLan = language.languages.filter(l => l !== language.langNow)
		return (
			<div className={classes.container}>
				<img
					src={`${nextLan[0]}.png`}
					className={classes.image}
					onClick={() => changeLeg(nextLan[0])}
					alt='icon for change leg right now hebrew'
				/>
			</div>
		)
	}
	return renderImgLeg()
}
