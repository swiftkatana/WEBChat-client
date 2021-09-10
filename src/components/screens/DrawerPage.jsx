import React from 'react'

import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { languageStateSelector } from 'redux/language/languageSelector'
import { useDispatch, useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Button } from '@material-ui/core'

import history, { changeURL } from '../../history'
import { changeLeguage } from 'redux/language/languageReducer'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		alignItems: 'center',
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(6),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(2),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}))
// user,
// language,
// openChat,
// signOut,
// changeLeg,
function DrawerPage({ children }) {
	const classes = useStyles()
	const theme = useTheme()
	const [open, setOpen] = React.useState(true)
	const language = useSelector(languageStateSelector)
	const dispatch = useDispatch()

	const changeLeg = (language = '') => {
		dispatch(changeLeguage(language))
	}

	var container = document.querySelector('#root')

	container.addEventListener('touchstart', startTouch, { passive: true })
	container.addEventListener('touchmove', moveTouch, { passive: true })

	// Swipe Up / Down / Left / Right
	var initialX = null
	var initialY = null

	function startTouch(e) {
		initialX = e.touches[0].clientX
		initialY = e.touches[0].clientY
	}

	function moveTouch(e) {
		if (initialX === null) {
			return
		}

		if (initialY === null) {
			return
		}

		var currentX = e.touches[0].clientX
		var currentY = e.touches[0].clientY

		var diffX = initialX - currentX
		var diffY = initialY - currentY

		if (Math.abs(diffX) > Math.abs(diffY)) {
			// sliding horizontally
			if (diffX > 0) {
				// swiped left
				handleDrawerClose()
			} else {
				// swiped right
				handleDrawerOpen()
			}
		}

		initialX = null
		initialY = null

		e.preventDefault()
	}

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	// const onClickOpenFriendChat = (chatId) => {
	//   openChat(chatId)
	// }

	// const renderLogOutAndProfile = () => {
	//   if (!user) return null
	//   // return (
	//   //   <ListItem
	//   //     onClick={() => {
	//   //       changeURL("/");
	//   //     }}
	//   //     button
	//   //     key={"login buuton"}
	//   //   >
	//   //     <ListItemIcon>
	//   //       <img
	//   //         className="fa fa-plus-circle"
	//   //         src="login.png"
	//   //         alt="login button"
	//   //       />{" "}
	//   //     </ListItemIcon>
	//   //     <ListItemText primary={`${language.texts.loginRegisterScreen.login.button} / ${language.texts.loginRegisterScreen.register.button}`} />
	//   //   </ListItem>
	//   // );

	//   return (
	//     <React.Fragment>
	//       <ListItem
	//         onClick={() => changeURL('/profile')}
	//         button
	//         key={'profile buuton'}
	//       >
	//         <ListItemIcon>
	//           <img
	//             className='fa fa-plus-circle'
	//             src={user.imageProfile}
	//             alt='profile button'
	//           />{' '}
	//         </ListItemIcon>
	//         <ListItemText primary={user.firstName} />
	//       </ListItem>
	//       <ListItem
	//         onClick={() => {
	//           changeURL('/')
	//           signOut(user.email)
	//         }}
	//         button
	//         key={'LogOut buuton'}
	//       >
	//         <ListItemIcon>
	//           <img className='fa fa-plus-circle' src='logOut.png' alt='logOut button' />{' '}
	//         </ListItemIcon>
	//         <ListItemText primary={'LogOut'} />
	//       </ListItem>
	//       <Divider />
	//     </React.Fragment>
	//   )
	// }
	// const AddFrindButtonAndFriendList = () => {
	//   if (!user) return null
	//   return (
	//     <>
	//       <ListItem onClick={() => changeURL('addFrind')} button key={'addFrind'}>
	//         <ListItemIcon>
	//           <img
	//             className='fa fa-plus-circle'
	//             src='serachF.png'
	//             alt='addFrind button'
	//           />{' '}
	//         </ListItemIcon>
	//         <ListItemText primary={'Serach A Frined'} />
	//       </ListItem>
	//       <ListItem
	//         onClick={() => changeURL('friends.list')}
	//         button
	//         key={'friends.list'}
	//       >
	//         <ListItemIcon>
	//           <img
	//             className='fa fa-plus-circle'
	//             src='friendsList.png'
	//             alt='friends.list button'
	//           />{' '}
	//         </ListItemIcon>
	//         <ListItemText primary={'friends list'} />
	//       </ListItem>
	//       <Divider />
	//     </>
	//   )
	// }

	// const renderFrindsList = () => {
	//   if (!user) return null
	//   if (!user.friends) return null
	//   const friends = Object.values(user.friends)
	//   return friends.map((user) => (
	//     <ListItem
	//       onClick={() => onClickOpenFriendChat(user.chatId)}
	//       button
	//       key={user._id}
	//     >
	//       <img src={user.imageProfile} alt='profile ' />
	//       <ListItemText primary={`${user.firstName} ${user.lastName}`} />
	//     </ListItem>
	//   ))
	// }
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

	return (
		<div
			className={` ${language.langNow === 'English' ? 'textLeft' : 'textRight'} ${classes.root} `}
		>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<Typography variant='h6' noWrap></Typography>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Button
					variant='contained'
					id='CWE'
					onClick={() => {
						if (history.location.pathname === '/') return null
						changeURL('')
					}}
				>
					CWE
				</Button>
				{/* <List>{renderLogOutAndProfile()}</List> */}

				{/* <List>{AddFrindButtonAndFriendList()}</List> */}

				{/* <List>{renderFrindsList()}</List> */}
				<Divider />

				{renderImgLeg()}
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				{children}
			</main>
		</div>
	)
}

export default DrawerPage
