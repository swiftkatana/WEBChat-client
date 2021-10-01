import { configureStore } from '@reduxjs/toolkit'

import languageReducer from './language/languageReducer'
import relationshipReducer from './relationship/relationshipReducer'
import userReducer from './user/userReducer'

export default configureStore({
	reducer: {
		language: languageReducer,
		user: userReducer,
		relationship: relationshipReducer,
	},
})
