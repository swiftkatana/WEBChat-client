import React from 'react'
import FrindCard from './friendList/FriendListItem'

export default function UsersList({ whatKindOfList, friends, buttons, friendsListHeader }) {
	const renderUsersList = text => {
		let arr = []
		if (friends.length > 0) {
			friends.map(friend =>
				whatKindOfList.indexOf(friend.status) === -1
					? null
					: arr.push(<FrindCard key={friend._id} friend={friend} buttons={buttons} />)
			)
		}
		if (arr.length > 0) {
			return (
				<div>
					<h3 className={'friendsListHeader'}>{friendsListHeader}</h3>
					{arr}
				</div>
			)
		}
		return null
	}

	return renderUsersList()
}
