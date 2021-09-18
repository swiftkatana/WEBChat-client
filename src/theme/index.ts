import { createTheme } from '@mui/material'

export default createTheme({
	direction: 'ltr',

	typography: {
		fontFamily: `"Sora", sans-serif`,
	},
	palette: {
		background: {
			paper: '#3b5998',
		},
		primary: {
			dark: '#3b6998',
			main: '#ffff',
			light: '#3b5891',
		},

		secondary: {
			main: '#3b5998',
			contrastText: '#3b5492',
		},

		text: {
			primary: '#000000',
		},
		action: {
			disabled: '#46484a',
		},
	},
})
