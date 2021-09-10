import { configureStore } from '@reduxjs/toolkit'

import languageReducer from './language/languageReducer'
import userReducer from './user/userReducer'

export default configureStore({
	reducer: {
		language: languageReducer,
		user: userReducer,
	},
})
