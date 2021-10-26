import React from 'react'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { Menu, MenuItem, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

export interface IMenuListButtons {
	text: string
	Icon?: any
}

interface Props {
	onClick: (text: string) => void
	buttons: IMenuListButtons[]
}
const ITEM_HEIGHT = 48
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {},
		containerItem: {
			display: 'flex !important',
			alignItems: 'space-between',
			justifyContent: 'space-between !important',
			textAlign: 'right',
			position: 'relative',
		},
	})
)
export const MenuList = ({ onClick, buttons }: Props) => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleClickBtn = (text: string) => {
		setAnchorEl(null)
		onClick(text)
	}
	return (
		<>
			<IconButton
				aria-label='more'
				id='long-button'
				aria-controls='long-menu'
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup='true'
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				className={classes.container}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '14ch',
					},
				}}
			>
				{buttons.map(button => (
					<MenuItem
						key={button.text}
						className={classes.containerItem}
						onClick={() => handleClickBtn(button.text)}
					>
						<span> {button.text} </span> {(button.Icon && <button.Icon />) || null}
					</MenuItem>
				))}
			</Menu>
		</>
	)
}
