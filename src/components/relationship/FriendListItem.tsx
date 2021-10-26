import React, { FC, useEffect } from 'react'

import { IRelationship } from 'interfaces/relationship/index'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from 'redux/user/userSelector'
import { friendsSelector } from 'redux/friends/friendsSelector'
import { ListItemCommon } from '../common/ListItemCommon'

import { MenuList, IMenuListButtons } from '../common/MenuList'
import { getImageOrName } from 'utils/whatToShowUserProfileImage'
import { getFriendsProfiles } from 'redux/friends/friendAction'

interface Props {
	relationship: IRelationship
	buttons: IMenuListButtons[]
}

export const FriendListItem: FC<Props> = ({ relationship, buttons }) => {
	const user = useSelector(userSelector)
	const friends = useSelector(friendsSelector)

	const dispatch = useDispatch()
	const friendId = relationship.userId1 === user._id ? relationship.userId2 : relationship.userId1
	let friend = friends[friendId]

	useEffect(() => {
		if (friend === undefined) dispatch(getFriendsProfiles([friendId]))
	}, [dispatch, friend, friendId])

	if (friend) {
		const { fullName, hasImage, image } = getImageOrName(friend)
		return (
			<ListItemCommon
				secondaryAction={<MenuList buttons={buttons} onClick={text => console.log(text)} />}
				description={friend.statusInfo.description || '...'}
				title={fullName}
				image={{ type: hasImage ? 'url' : 'name', url: image, online: false }}
			/>
		)
	} else return <ListItemCommon skeleton={true} />
}
