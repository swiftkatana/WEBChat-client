import React, { ReactElement } from 'react'
import { Backdrop, Button, Fade, Modal, Typography } from '@mui/material'
import { IButtonProp } from '../../interfaces/modals/index'
import { Box } from '@mui/system'

interface Props {
	showModal: boolean
	onShowOrHide: () => void
	header?: string
	body?: string
	buttons: IButtonProp[]
}
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export default function GotAMessage({
	onShowOrHide,
	showModal,
	body,
	header,
	buttons,
}: Props): ReactElement {
	const renderButtons = () =>
		buttons &&
		buttons.map(button => (
			<Button color={button.color} onClick={button.onClick}>
				{button.text}
			</Button>
		))

	return (
		<>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={showModal}
				onClose={onShowOrHide}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={showModal}>
					<Box sx={style}>
						<Typography id='transition-modal-title' variant='h6' component='h2'>
							{header}
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							{body}
						</Typography>
						<div>{renderButtons()}</div>
					</Box>
				</Fade>
			</Modal>
		</>
	)
}
