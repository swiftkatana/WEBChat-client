import { createMuiTheme } from '@material-ui/core'

export default createMuiTheme({
	typography: {
		fontFamily: `"Sora", sans-serif`,
	},
	palette: {
		primary: {
			main: '#46484a',
			light: '#46484a',
		},
		secondary: {
			main: '#0071C2',
			light: '#46484a',
		},
		error: {
			main: '#e2704e',
		},
		text: {
			primary: '#46484a',
		},
		action: {
			disabled: '#46484a',
		},
	},
})
