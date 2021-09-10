import { createSelector } from 'reselect'

import { IStoreRootState } from '../../interfaces/redux/store'
import ILenguageState from '../../interfaces/language/index'

export const languageStateSelector = (state: IStoreRootState) => state.language

export const languageSelector = createSelector(
	languageStateSelector,
	(state: ILenguageState) => state.langNow
)
