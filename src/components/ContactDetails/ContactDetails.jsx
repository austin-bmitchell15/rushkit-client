import React, {useEffect, useState} from 'react';
import { Paper, Button, Typography, CircularProgress, Divider, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import { getContact } from '../../actions/contactActions';
import useStyles from './styles.js';
import Survey from './Survey/Survey';

const ContactDetails = () => {
  const { contact, isLoading } = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getContact(id));
  }, [id])

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  if (!contact) return null;

  if (isLoading) {
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em'/>
    </Paper>
  }

  return (
    <div className={classes.card}>
      <Paper className={classes.section}>
        <Typography variant="h3" component="h2">{contact.name}</Typography>
        <Typography gutterBottom variant="body1" component="p">{contact.message}</Typography>
        <Typography variant="h6">Created by: {contact.creatorName}</Typography>
        <Typography variant="body1">{moment(contact.createdAt).fromNow()}</Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
        <Divider style={{ margin: '20px 0' }} />
        <Grid container justifyContent='center' className={classes.buttonContainer}>
          <Button color='primary' variant='contained' margin='5px' onClick={handleOpen}>Fill Out PNM Survey</Button>
        </Grid>
        <Survey open={open} onClose={handleClose} contact={ contact } />
      </Paper>
      <div container className={classes.imageSection}>
        <img className={classes.media} width='70' src={contact.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={contact.title} />
      </div>
    </div>
      
  )
}

export default ContactDetails;
