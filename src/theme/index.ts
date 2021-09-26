import { createTheme } from '@mui/material'

export default createTheme({
	direction: 'ltr',

	typography: {
		fontFamily: `"Sora", sans-serif`,
	},
	palette: {
		background: {
			paper: '#303F9F',
		},
		primary: {
			dark: '#303F9F',
			main: '#ffff',
			light: '#283593',
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
