import { createSelector } from 'reselect'

import { IStoreRootState } from '../../interfaces/redux/store'
import ILenguageState from '../../interfaces/language/index'

export const languageStateSelector = (state: IStoreRootState) => state.language

export const languageNowSelector = createSelector(
	languageStateSelector,
	(state: ILenguageState) => state.langNow
)
export const languageWordsSelector = createSelector(
	languageStateSelector,
	(state: ILenguageState) => state.texts
)
