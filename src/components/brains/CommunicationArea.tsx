import React, { useEffect } from 'react'
import Io, { sendIoMessage } from 'utils/ioMyLive'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRelationship } from 'redux/relationship/relationshipAction'
import { getUser } from 'redux/user/userAction'
import { userSelector, userLoggedInSelector } from '../../redux/user/userSelector'
import { Io_message_type } from 'enums/socketIo'

export const CommunicationArea = () => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(userLoggedInSelector)
	const user = useSelector(userSelector)

	// --------- get waht we need ---------------------------
	useEffect(() => {
		if (!isLoggedIn) {
			dispatch(getUser())
		} else {
			dispatch(getAllRelationship())
		}
	}, [dispatch, isLoggedIn])

	//----- reconnect to the server if we lost connnection when we logged in ------------
	useEffect(() => {
		Io.on('disconnect', socket => {
			if (isLoggedIn) sendIoMessage({ type: Io_message_type.LOGIN, data: user.securityInfo.email })
		})
	}, [user, isLoggedIn])

	return <></>
}
