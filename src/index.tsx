import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import store from './redux/store'
import theme from 'theme'
import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
