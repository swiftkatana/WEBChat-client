/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from 'interfaces/user'

interface IReturn {
	image: string
	fullName: string
	hasImage: string
}

export const getImageOrName = <IReturn>(user: IUser) => {
	const hasImage = user.personalInfo.profileImage
	const fullName = `${user.personalInfo.firstName} ${user.personalInfo.lastName}`
	const image = hasImage ? hasImage : fullName

	return { image, fullName, hasImage }
}
