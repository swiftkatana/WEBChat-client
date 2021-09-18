import React, { ReactChild, ReactChildren, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { createStyles, makeStyles } from '@mui/styles'

// import history, { changeURL } from '../../history'
import { languageStateSelector } from '../../redux/language/languageSelector'
import { changeLeguage } from '../../redux/language/languageReducer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Theme } from '@mui/material'

const drawerWidth = 240

interface Props {
	children: ReactChild | ReactChildren
	window?: () => Window
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			width: '100%',
			height: '92%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.palette.primary.light,
		},
		root: {
			backgroundColor: theme.palette.background.paper,
		},
		header: {
			backgroundColor: theme.palette.primary.light,
		},
	})
)
export default function DrawerPage({ window, children }: Props) {
	const classes = useStyles()
	const [mobileOpen, setMobileOpen] = useState(false)
	const language = useSelector(languageStateSelector)
	const dispatch = useDispatch()

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

	const changeLeg = (language = '') => {
		dispatch(changeLeguage(language))
	}

	const renderImgLeg = () => {
		let nextLan = language.languages.filter(l => l !== language.langNow)
		return (
			<img
				src={`${nextLan[0]}.png`}
				onClick={() => changeLeg(nextLan[0])}
				className='imgLeg'
				alt='icon for change leg right now hebrew'
			/>
		)
	}
	const drawer = (
		<div dir={'ltr'}>
			<Toolbar />
			<Divider />
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			{renderImgLeg()}
		</div>
	)
	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar className={classes.header}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						{/* Responsive drawer */}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box className={classes.root} component='main' sx={{ flexGrow: 1, p: 3, height: '100%' }}>
				<Toolbar />
				<div className={classes.container}>{children}</div>
			</Box>
		</Box>
	)
}
