import React, { useEffect } from 'react'
import { SnackbarKey, useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { relationshipErrorSelector } from 'redux/relationship/relationshipSelector'
import { Button } from '@mui/material'
import { userErrorSelector } from '../../redux/user/userSelector'
import { clearUserError } from 'redux/user/userReducer'
import { clearRelationshipError } from 'redux/relationship/relationshipReducer'

interface Props {}

export const ErrorArea = (props: Props) => {
	const relationshipError = useSelector(relationshipErrorSelector)
	const userError = useSelector(userErrorSelector)
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const dispatch = useDispatch()
	useEffect(() => {
		if (userError) {
			const action = (key: SnackbarKey) => (
				<>
					<Button
						onClick={() => {
							closeSnackbar(key)
						}}
					>
						Dismiss
					</Button>
				</>
			)
			const errorMeesage = userError.message || userError.error

			enqueueSnackbar(errorMeesage, {
				variant: 'error',
				action,
				onClose: () => dispatch(clearUserError),
			})
		}
	}, [closeSnackbar, dispatch, enqueueSnackbar, userError])

	useEffect(() => {
		if (relationshipError) {
			const action = (key: SnackbarKey) => (
				<>
					<Button
						onClick={() => {
							closeSnackbar(key)
						}}
					>
						Dismiss
					</Button>
				</>
			)
			const errorMeesage = relationshipError.message || relationshipError.error

			enqueueSnackbar(errorMeesage, {
				variant: 'error',
				action,
				onClose: () => dispatch(clearRelationshipError),
			})
		}
	}, [closeSnackbar, dispatch, enqueueSnackbar, relationshipError])

	return <></>
}
