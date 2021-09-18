import React, { FC, useEffect } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import DrawerPage from './components/screens/DrawerPage'

// import './css/App.css'
import { CommunicationArea } from './components/brains/CommunicationArea'
import { GotACall } from './components/brains/GotACall'
// import { useSelector } from 'react-redux'
// import { languageNowSelector } from './redux/language/languageSelector'
import PrivateRoute from './routes/PrivateRoute'
import routes from './routes/routes'
import './app.css'
export const App: FC = () => {
	// const language = useSelector(languageNowSelector)

	useEffect(() => {
		console.log('object')
	}, [])

	// const dir = language === 'English' ? 'ltr' : 'rtl'

	return (
		<>
			<DrawerPage>
				<HashRouter>
					<CommunicationArea />
					<GotACall />
					{routes.map((route, index) =>
						route.public ? (
							<Route {...route} key={index} />
						) : (
							<PrivateRoute {...route} key={index} />
						)
					)}
				</HashRouter>
			</DrawerPage>
		</>
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
