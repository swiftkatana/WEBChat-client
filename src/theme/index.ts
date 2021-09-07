import { createMuiTheme } from '@material-ui/core'

export default createMuiTheme({
	typography: {
		fontFamily: `"Sora", sans-serif`,
	},
	palette: {
		primary: {
			main: '#34AB53',
		},
		secondary: {
			main: '#0071C2',
			light: '#E1EAF6',
		},
		error: {
			main: '#e2704e',
		},
		text: {
			primary: '#46484a',
		},
		action: {
			disabled: '#DEE3EF',
		},
	},
})
