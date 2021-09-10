import React, { FC, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import DrawerPage from './components/screens/DrawerPage'

import './css/App.css'
import { CommunicationArea } from './components/brains/CommunicationArea'
import GotACall from './components/brains/GotACall'

const App: FC = () => {
	useEffect(() => {
		console.log('object')
	}, [])

	return (
		<DrawerPage>
			<CommunicationArea />
			<GotACall />
			<HashRouter>
				<h1>d</h1>
			</HashRouter>
		</DrawerPage>
	)
}
export default App

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
