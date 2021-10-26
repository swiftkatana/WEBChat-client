import React, { FC } from 'react'
import {
	ListItem,
	ListItemButton,
	ListItemAvatar,
	Typography,
	Theme,
	Skeleton,
} from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { createStyles, makeStyles } from '@mui/styles'
import { ProfileImage } from './ProfileImage'
interface Props {
	image?: { online?: boolean; type: 'url' | 'name'; url: string }
	description?: string
	title?: string
	secondaryAction?: React.ReactNode
	skeleton?: boolean
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			padding: '0.5rem',
			boxShadow: ` 1px 1px  10px${theme.palette.background.paper} `,

			'&:hover': {
				opacity: 0.5,
				boxShadow: ` 1px 1px  10px${theme.palette.background.paper} `,
			},
		},
	})
)
export const ListItemCommon: FC<Props> = ({
	description,
	image,
	title,
	secondaryAction,
	skeleton,
}) => {
	const classes = useStyles()
	const renderImage = () => {
		if (image)
			return (
				<ListItemAvatar>
					<ProfileImage image={image} />
				</ListItemAvatar>
			)
		else return null
	}
	if (skeleton)
		return (
			<ListItem className={classes.container} secondaryAction={<Skeleton />} disablePadding>
				<ListItemButton role={undefined} dense>
					<ListItemAvatar>
						<Skeleton animation='wave' variant='circular' width={40} height={40} />
					</ListItemAvatar>
					<Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
				</ListItemButton>
				<Divider />
			</ListItem>
		)
	else
		return (
			<ListItem className={classes.container} secondaryAction={secondaryAction} disablePadding>
				<ListItemButton role={undefined} dense>
					{renderImage()}
					<ListItemText
						id={title}
						primary={title}
						secondary={
							<React.Fragment>
								<Typography
									sx={{ display: 'inline' }}
									component='span'
									variant='caption'
									color='text.primary'
								>
									{description}
								</Typography>
							</React.Fragment>
						}
					/>
				</ListItemButton>
				<Divider />
			</ListItem>
		)
}
