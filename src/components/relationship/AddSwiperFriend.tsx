import React, { FC, useEffect } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Theme } from '@mui/material'
import useWindowDimensions from '../../hooks/useWindowDimensions '
import { createStyles, makeStyles } from '@mui/styles'
import InputBuilder from 'components/common/InputBuilder'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { friendLoadingSelector, serachUsersSelector } from 'redux/friends/friendsSelector'
import { serachUsers } from 'redux/friends/friendAction'
import { SwiperFriendList } from '../listsItems/SwiperFriendList'
import { ListItemCommon } from 'components/common/ListItemCommon'

const useStyles = makeStyles(({ palette }: Theme) =>
	createStyles({
		inputContainer: {
			margin: '1rem',
		},
	})
)
interface Props {
	show: boolean
	toggleDrawer: () => void
}
export const AddSwiperFriend: FC<Props> = ({ show, toggleDrawer }) => {
	const { height } = useWindowDimensions()
	const usersLoading = useSelector(friendLoadingSelector)
	const serachUsersList = useSelector(serachUsersSelector)
	const classes = useStyles()
	const dispatch = useDispatch()
	const { register, formState, watch } = useForm<{ serachFriend: string }>()
	const watchSerach = watch().serachFriend
	const { errors } = formState
	useEffect(() => {
		const IdSetTimeout = setTimeout(() => {
			if (watchSerach) {
				dispatch(serachUsers(watchSerach))
			}
		}, 700)
		return () => clearTimeout(IdSetTimeout)
	}, [dispatch, watchSerach])
	const renderList = () => {
		if (usersLoading)
			return (
				<>
					<ListItemCommon skeleton />
					<ListItemCommon skeleton />
					<ListItemCommon skeleton />
				</>
			)
		return (
			serachUsersList.map(user => {
				return <SwiperFriendList user={user} />
			}) || null
		)
	}

	return (
		<div>
			<React.Fragment key={'bottom'}>
				<SwipeableDrawer anchor={'bottom'} open={show} onClose={toggleDrawer} onOpen={toggleDrawer}>
					<Box sx={{ width: 'auto', height: height - height * 0.1 + 'px' }} role='presentation'>
						<div className={classes.inputContainer}>
							<InputBuilder
								register={register}
								showError={errors.serachFriend?.message}
								name={'serachFriend'}
								placeholder='Serach For a Friend'
								type='text'
								loading={usersLoading}
							/>
						</div>
						{renderList()}
					</Box>
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	)
}
