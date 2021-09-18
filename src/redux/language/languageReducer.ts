import { createSlice } from '@reduxjs/toolkit'
import ILenguageState from '../../interfaces/language/index'
import { ILanguagesKey } from '../../interfaces/language/index'
import { INS } from '../../lang/index'

const initialState = {
	texts: INS['English'],
	langNow: 'English',
	languages: Object.keys(INS),
}
export const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		changeLeguage(state: ILenguageState, action) {
			const lan = action.payload as keyof ILanguagesKey
			state.langNow = lan
			state.texts = INS[lan]
		},
	},
})

export const { changeLeguage } = languageSlice.actions

export default languageSlice.reducer
