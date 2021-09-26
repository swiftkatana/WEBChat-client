import React, { FC } from 'react'
import { ListItem, ListItemButton, ListItemAvatar, Typography, Theme } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { IUser } from 'interfaces/user'
import { ProfileImage } from '../../common/ProfileImage'
import { MenuList } from '../../common/MenuList'
import { createStyles, makeStyles } from '@mui/styles'
interface Props {
	user: IUser
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
export const FriendListItem: FC<Props> = ({ user }) => {
	const classes = useStyles()
	const fullName = `${user.personalInfo.firstName} ${user.personalInfo.lastName}`
	return (
		<>
			<ListItem
				className={classes.container}
				key={user._id}
				secondaryAction={<MenuList />}
				disablePadding
			>
				<ListItemButton role={undefined} dense>
					<ListItemAvatar>
						<ProfileImage online fullName={fullName} />
					</ListItemAvatar>
					<ListItemText
						id={'dsads'}
						primary={fullName}
						secondary={
							<React.Fragment>
								<Typography
									sx={{ display: 'inline' }}
									component='span'
									variant='caption'
									color='text.primary'
								>
									{'wow tell me more!!!!!!!!!'}
								</Typography>
							</React.Fragment>
						}
					/>
				</ListItemButton>
				<Divider />
			</ListItem>
		</>
	)
}
