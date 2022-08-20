import { Modal, Paper, Typography, Button } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input';
import Rating from 'material-ui-rating'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { updateContact } from '../../../actions/contactActions.js';
import useStyles from './styles.js'

const Survey = ({ open, onClose, contact }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
  	const user = JSON.parse(localStorage.getItem('profile'));
	const [surveyInfo, setSurveyInfo] = useState({
		brotherName: '', pnmName: '', fitRating: '', walkedOut: false, interestTags: [], 
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(surveyInfo)
		dispatch(updateContact(contact._id, surveyInfo))
	}

	const onAddChip = (tagToAdd) => {
		if (surveyInfo.interestTags.indexOf(tagToAdd) === -1) {
			setSurveyInfo({...surveyInfo, interestTags: [...surveyInfo.interestTags, tagToAdd]});
		}
	}

	const onDeleteChip = (tagToDelete) => {
		setSurveyInfo({...surveyInfo, interestTags: surveyInfo.interestTags.filter((tag) => tag !== tagToDelete)});
	}

	const trials = ["Austin", "Zayyen", "Cole", "John"]

	return (
		<Modal open={open} onClose={onClose}>
			<Paper className={classes.paper}>
				<form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
					<Typography variant="h6">PNM Rush Evaluation for {contact.name} by {user?.result.name}</Typography>
					<ChipInput fullWidth name='interestTags' value={surveyInfo.interestTags} onAdd={onAddChip} onDelete={onDeleteChip} label="Add Interests, Hobbies, Clubs, etc"/>
					<Rating name="fitRating" label="Fit Rating" />
					<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

				</form>
			</Paper>
		</Modal>
	);
};

export default Survey;