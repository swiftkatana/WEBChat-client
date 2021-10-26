import { ListItemCommon } from 'components/common/ListItemCommon'
import React, { FC } from 'react'
import { IUser } from 'interfaces/user/index'
import { getImageOrName } from 'utils/whatToShowUserProfileImage'
import { IMenuListButtons, MenuList } from 'components/common/MenuList'
import { useDispatch, useSelector } from 'react-redux'
import { languageWordsSelector } from '../../redux/language/languageSelector'
import { createRelationship } from 'redux/relationship/relationshipAction'
import { userSelector } from 'redux/user/userSelector'
import { relationship_types } from 'enums/relationship_types'

interface Props {
	user: IUser
}

export const SwiperFriendList: FC<Props> = ({ user }) => {
	const { image, fullName, hasImage } = getImageOrName(user)
	const languages = useSelector(languageWordsSelector)
	const mainUser = useSelector(userSelector)
	const dispatch = useDispatch()
	const buttons: IMenuListButtons[] = [
		{ text: languages.relationships.actionButton.sendReq },
		{ text: languages.relationships.actionButton.block },
	]
	const handleAction = (text: string) => {
		if (text === languages.relationships.actionButton.sendReq)
			dispatch(
				createRelationship({
					usersIds: [mainUser._id, user._id],
					type: relationship_types.FRIEND,
				})
			)
		else console.log(text)
	}
	return (
		<ListItemCommon
			description={user.statusInfo.description || '...'}
			secondaryAction={<MenuList buttons={buttons} onClick={handleAction} />}
			title={fullName}
			image={{ type: hasImage ? 'url' : 'name', url: image, online: false }}
		/>
	)
}
