import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userSelector, userLoggedInSelector } from '../../redux/user/userSelector'
import { ILiveUpdateFriend } from '../../interfaces/socketRes/index'
import ioMyLive from '../../ioMyLive'

export const CommunicationArea = () => {
	const myUserData = useSelector(userSelector)
	const isLogin = useSelector(userLoggedInSelector)
	useEffect(() => {
		if (isLogin) {
			if (!ioMyLive.connected) {
				ioMyLive.connect()
			}
			ioMyLive.on('userLive' + myUserData._id, ({ resType, sender, status }: ILiveUpdateFriend) => {
				console.log('socket For communication listening ', resType)
				switch (resType) {
					//my friend req have been accept
					default:
						alert(resType)
						break
				}
			})
		} else if (!isLogin) {
			ioMyLive.off()
		}
	}, [isLogin, myUserData._id])

	return <></>
}
