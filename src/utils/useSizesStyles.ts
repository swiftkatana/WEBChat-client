import { Theme } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

export const useResponseStyle = (xl = {}, lg = {}, md = {}, sm = {}, xs = {}) => {
	const useStyle = makeStyles(() =>
		createStyles({
			responsive: {
				"[breakpoints.down('xl')]": xl,
				"[breakpoints.down('lg')]": lg,
				"[breakpoints.down('md')]": md,
				"	[breakpoints.down('sm')]": sm,
				"[breakpoints.down('xs')]": xs,
			},
		})
	)
	const classes = useStyle()
	return classes.responsive
}
