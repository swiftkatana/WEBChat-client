import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { createStyles, makeStyles } from '@mui/styles'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import BlockIcon from '@mui/icons-material/Block'
import PendingIcon from '@mui/icons-material/Pending'
import { LinearProgress, SpeedDialIcon, Tab, Tabs, Theme } from '@mui/material'
import {
	relationshipFriendSelector,
	relationshipPendingGotSelector,
	relationshipBlockSelector,
	relationshipsLoadingSelector,
} from 'redux/relationship/relationshipSelector'
import { FriendListItem } from 'components/friendList/FriendListItem'
import { AddSwiperFriend } from '../friendList/AddSwiperFriend'
interface Props {}

const useStyles = makeStyles(({ palette }: Theme) =>
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
		buttonAddFriend: {
			position: 'absolute',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '3rem',
			height: '3rem',
			bottom: 16,
			right: 16,
			borderRadius: '100%',
			backgroundColor: palette.common.white,
			animationName: 'hoverButton',
			animationDuration: '2s',
			animationIterationCount: 'infinite',
			'&:hover': {
				animationName: 'none',
				opacity: 0.5,
				cursor: 'pointer',
			},
		},
		loadingContainer: {
			padding: '1rem',
		},
	})
)
export const RelationshipListScreen: FC<Props> = props => {
	const [value, setValue] = React.useState(0)
	const [serachFriendShow, setSerachFriendShow] = React.useState(false)
	const classes = useStyles()
	const relationshipFriend = useSelector(relationshipFriendSelector)
	const relationshipsGotPending = useSelector(relationshipPendingGotSelector)
	const relationshipsBlocked = useSelector(relationshipBlockSelector)
	const relationshipFriendLoading = useSelector(relationshipsLoadingSelector)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	const toggleDrawer = () => setSerachFriendShow(!serachFriendShow)

	const getRelationship = () => {
		switch (value) {
			case 0:
				return relationshipFriend.map(relationship => (
					<FriendListItem relationship={relationship} />
				))
			case 1:
				return relationshipsGotPending.map(relationship => (
					<FriendListItem relationship={relationship} />
				))
			default:
				return relationshipsBlocked.map(relationship => (
					<FriendListItem relationship={relationship} />
				))
		}
	}

	return (
		<div className={classes.container}>
			<Tabs variant='fullWidth' value={value} onChange={handleChange} aria-label=''>
				<Tab icon={<PersonPinIcon fontSize='large' />} label='Frinds' />
				<Tab icon={<PendingIcon fontSize='large' />} label='Pending' />
				<Tab icon={<BlockIcon fontSize='large' />} label='Blocks' />
			</Tabs>

			<div className={classes.cardsContainer}>
				{getRelationship()}
				{relationshipFriendLoading && (
					<div className={classes.loadingContainer}>
						<LinearProgress color='success' />
					</div>
				)}
			</div>

			<div className={classes.buttonAddFriend} onClick={toggleDrawer}>
				<SpeedDialIcon />
			</div>
			<AddSwiperFriend show={serachFriendShow} toggleDrawer={toggleDrawer} />
		</div>
	)
}
