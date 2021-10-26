import React, { ReactChild, ReactChildren, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { createStyles, makeStyles } from '@mui/styles'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Theme } from '@mui/material'
import { LangChangeMode } from '../common/LangChangeMode'
import { LinkListItem } from '../drawer/LinkListItem'
import routes from '../../routes/routes'
import { useSelector } from 'react-redux'
import { languageWordsSelector } from 'redux/language/languageSelector'
import { LogOutButton } from 'components/loginRegister/LogOutButton'
import { ILangNavbarState } from 'interfaces/language'

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
			position: 'relative',
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
		drawerFooter: {
			display: 'flex',
			width: '100%',
			justifyItems: 'center',
			textAlign: 'center',
			alignItems: 'center',
		},
	})
)
export default function DrawerPage({ window, children }: Props) {
	const classes = useStyles()
	const [mobileOpen, setMobileOpen] = useState(false)
	const languages = useSelector(languageWordsSelector)
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

	const drawer = (mobile = false) => {
		const handler = () => {
			if (mobile) handleDrawerToggle()
		}
		return (
			<div dir={'ltr'}>
				<Toolbar />
				<Divider />
				<List>
					{routes.map(route => (
						<LinkListItem
							onClick={handler}
							path={route.path}
							show={route.private}
							name={languages.navBtn[route.name as keyof ILangNavbarState]}
						/>
					))}
				</List>
				<Divider />
				<div className={classes.drawerFooter}>
					<LangChangeMode size='2rem' />
					<LogOutButton onClick={handleDrawerToggle} size='2rem' />
				</div>
			</div>
		)
	}

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
					{drawer(true)}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer()}
				</Drawer>
			</Box>
			<Box className={classes.root} component='main' sx={{ flexGrow: 1, p: 3, height: '100%' }}>
				<Toolbar />
				<div className={classes.container}>{children}</div>
			</Box>
		</Box>
	)
}
