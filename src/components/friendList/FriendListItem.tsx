import React, { FC, useEffect } from 'react'

import { IRelationship } from 'interfaces/relationship/index'
import { useSelector } from 'react-redux'
import { userSelector } from 'redux/user/userSelector'
import { friendsSelector } from 'redux/friends/friendsSelector'
import { ListItemCommon } from '../common/ListItemCommon'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import { MenuList, IMenuListButtons } from '../common/MenuList'
interface Props {
	relationship: IRelationship
}

export const FriendListItem: FC<Props> = ({ relationship }) => {
	const user = useSelector(userSelector)
	const friends = useSelector(friendsSelector)
	const friendId =
		relationship.users[0] === user.securityInfo.email
			? relationship.users[1]
			: relationship.users[0]
	let friend = friends[friendId]

	const buttons: IMenuListButtons[] = [
		{ text: 'Delete', Icon: DeleteIcon },
		{ text: 'Block', Icon: BlockIcon },
	]

	useEffect(() => {
		if (friend === undefined) console.log('need to send request to get the data on the friend')
	}, [friend])

	if (friend) {
		const hasImage = friend.personalInfo.profileImage
		const fullName = `${friend.personalInfo.firstName} ${friend.personalInfo.lastName}`
		const image = hasImage ? hasImage : fullName
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
