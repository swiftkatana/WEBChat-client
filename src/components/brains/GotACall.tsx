import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ioMyLive from '../../ioMyLive'
import { userLoggedInSelector, userSelector } from '../../redux/user/userSelector'
import { ILiveCall } from '../../interfaces/socketRes/index'

export const GotACall = (): ReactElement => {
	// const newReqSound = new Audio('newReq.mp3')
	const isLogin = useSelector(userLoggedInSelector)
	const myUserData = useSelector(userSelector)

	useEffect(() => {
		if (isLogin) {
			if (!ioMyLive.connected) {
				ioMyLive.connect()
			}
			ioMyLive.on('userLive' + myUserData._id, ({ resType, sender }: ILiveCall) => {
				console.log('socket For calls listening ', resType)
				switch (resType) {
					//my friend req have been accept

					default:
						alert(sender)
						break
				}
			})
		} else if (!isLogin) {
			ioMyLive.off()
		}
	}, [isLogin, myUserData._id])

	return <></>
}
