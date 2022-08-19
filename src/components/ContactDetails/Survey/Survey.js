import { Modal, Paper, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles.js'

const Survey = ({ open, onClose }) => {
	const classes = useStyles();
	return (
		<Modal open={open} onClose={onClose}>
			<Paper className={classes.paper}>
				<Typography variant="h6" component="h2">
					Text in a modal
				</Typography>
			</Paper>
		</Modal>
	)
}

export default Survey