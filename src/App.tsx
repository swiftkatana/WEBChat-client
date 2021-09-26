import React, { FC, useEffect } from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import DrawerPage from './components/screens/DrawerPage'

// import { CommunicationArea } from './components/brains/CommunicationArea'
// import { GotACall } from './components/brains/GotACall'
import PrivateRoute from './routes/PrivateRoute'
import routes from './routes/routes'
import history from './history'
import './app.css'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggedInSelector } from './redux/user/userSelector'
import { getUser } from 'redux/user/userAction'
export const App: FC = () => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(userLoggedInSelector)
	useEffect(() => {
		if (!isLoggedIn) {
			dispatch(getUser())
		}
	}, [dispatch, isLoggedIn])

	return (
		<Router history={history}>
			<DrawerPage>
				<Switch>
					{/* <CommunicationArea /> */}
					{/* <GotACall /> */}
					{routes.map((route, index) =>
						route.private ? (
							<PrivateRoute {...route} key={index} />
						) : (
							<Route {...route} key={index} />
						)
					)}
					<Redirect to='/' />
				</Switch>
			</DrawerPage>
		</Router>
	)
}

// useEffect(() => {
//   if (!user)
//     changeURL("/")
//   if (user && !friends) {
//     (async () => {
//       try {
//         let friends = await myserver.get(getMyFriendsUrl(user._id))
//         console.log(friends)

//       } catch (error) {
//         console.error(error)
//       }

//     })()
//   }

// }, [user, friends]);

//
//   <HashRouter >
//     {/* <Route path='/' component={Header} /> */}
//     {routes.map((route, index) =>
//       route.public ? (
//         <Route {...route} key={index} />
//       ) : (
//         <PrivateRoute {...route} key={index} />
//       )
//     )}
//     <Route path="/profile" exact component={Profile} />
//     <Route path="/addFrind" exact component={SerachFriendScreen} />
//     <Route path="/chat:" exact component={ChatScreen} />
//     <Route path="/friends.list" exact component={FriendsList} />
//     <Route path="/" exact component={LobyPageScreen} />
//   </HashRouter>
