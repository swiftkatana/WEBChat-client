import React from 'react'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/Delete'
import { Menu, MenuItem, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useSnackbar } from 'notistack'

interface Props {}
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
export const MenuList = (props: Props) => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const { enqueueSnackbar } = useSnackbar()
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleClickBtn = (text: 'Delete' | 'Block') => {
		setAnchorEl(null)
		enqueueSnackbar(text, { variant: text === 'Delete' ? 'warning' : 'success' })
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
				<MenuItem className={classes.containerItem} onClick={() => handleClickBtn('Block')}>
					<span> Block </span> <BlockIcon />
				</MenuItem>
				<MenuItem className={classes.containerItem} onClick={() => handleClickBtn('Delete')}>
					<span>Delete</span> <DeleteIcon />
				</MenuItem>
			</Menu>
		</>
	)
}
