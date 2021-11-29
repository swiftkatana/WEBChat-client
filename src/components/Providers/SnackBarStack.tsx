import React, { FC, ReactChild, ReactChildren } from 'react'
import { SnackbarProvider } from 'notistack'

interface Props {
	children: ReactChild | ReactChildren
}
export const SnackBarStack: FC<Props> = ({ children }) => {
	return (
		<SnackbarProvider
			iconVariant={{
				success: '✅ ',
				error: '✖️ ',
				warning: '⚠️ ',
				info: 'ℹ️  .',
			}}
			autoHideDuration={2500}
			maxSnack={4}
		>
			{children}
		</SnackbarProvider>
	)
}
