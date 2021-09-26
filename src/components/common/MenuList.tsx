import React from 'react'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import { Menu, MenuItem, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

interface Props {}
const ITEM_HEIGHT = 48
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			alignItems: 'space-between',
			justifyItems: 'space-between',
			textAlign: 'right',
			backgroundColor: 'black',
		},
	})
)
export const MenuList = (props: Props) => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
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
				id='long-menu'
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
					},
				}}
			>
				<MenuItem className={classes.container} onClick={handleClose}>
					<span> Block </span> <BlockIcon />
				</MenuItem>
				<MenuItem className={classes.container} onClick={handleClose}>
					<span>Delete</span> <DeleteIcon />
				</MenuItem>
			</Menu>
		</>
	)
}
