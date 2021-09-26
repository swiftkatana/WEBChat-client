import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { languageStateSelector } from '../../redux/language/languageSelector'
import { changeLeguage } from '../../redux/language/languageReducer'

export const LangChangeMode: FC = () => {
	const language = useSelector(languageStateSelector)
	const dispatch = useDispatch()

	const changeLeg = (language = '') => {
		dispatch(changeLeguage(language))
	}

	const renderImgLeg = () => {
		let nextLan = language.languages.filter(l => l !== language.langNow)
		return (
			<img
				src={`${nextLan[0]}.png`}
				onClick={() => changeLeg(nextLan[0])}
				className='imgLeg'
				alt='icon for change leg right now hebrew'
			/>
		)
	}
	return renderImgLeg()
}
