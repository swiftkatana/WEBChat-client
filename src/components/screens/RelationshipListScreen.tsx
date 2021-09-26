import React, { FC } from 'react'
import { FriendListItem } from 'components/chat/friendList/FriendListItem'
import { useSelector } from 'react-redux'
import { userSelector } from 'redux/user/userSelector'
import { createStyles, makeStyles } from '@mui/styles'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import BlockIcon from '@mui/icons-material/Block'
import PendingIcon from '@mui/icons-material/Pending'
import { Tab, Tabs, Theme } from '@mui/material'
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			width: '100%',
			height: '100%',
			position: 'relative',
		},
		cardsContainer: {
			position: 'relative',
			height: '87%',
			overflowY: 'scroll',
		},
	})
)
export const RelationshipListScreen: FC<Props> = props => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	const classes = useStyles()
	const user = useSelector(userSelector)
	return (
		<div className={classes.container}>
			<Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label=''>
				<Tab icon={<PersonPinIcon />} label='Frinds' />
				<Tab icon={<BlockIcon />} label='Blocks' />
				<Tab icon={<PendingIcon />} label='Pending' />
			</Tabs>
			<div className={classes.cardsContainer}>
				<FriendListItem user={user} />
				<FriendListItem user={user} />
				<FriendListItem user={user} />
				<FriendListItem user={user} />
				<FriendListItem user={user} />
				<FriendListItem user={user} />
				<FriendListItem user={user} />
				<FriendListItem user={user} />
			</div>
		</div>
	)
}
