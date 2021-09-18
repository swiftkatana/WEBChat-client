export default interface ILenguageState {
	texts: IlanguageWords
	langNow: string
	languages: string[]
}

export interface ILanguagesKey {
	English: IlanguageWords
	Hebrew: IlanguageWords
}

export interface IlanguageWords {
	errors: {
		searchUsersForFriend: string
		loginFaildAlreadyConnect: string
		infoInvalid: string
		usersNotFound: string
		UserIsAlreadyCreated: string
		DBError: string
	}
	navBtn: {
		signIn: string
		signOut: string
	}
	loginRegisterScreen: {
		login: {
			buttonForLogin: string
			leabel: string
			button: string
		}
		register: {
			buttonForRegister: string
			leabel: string
			button: string
		}
		email: {
			subText: string
			placeholder: string
			error: string
			leabel: string
		}
		password: {
			placeholder: string
			error: string
			leabel: string
		}
		firstName: {
			error: string
			leabel: string
		}
		lastName: {
			error: string
			leabel: string
		}
		address: {
			error: string
			leabel: string
		}
		phone: {
			error: string
			leabel: string
		}
	}
	SerachFriendScreen: {
		startLookin: string
	}
}
