import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import Whatshot from '@material-ui/icons/Whatshot';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles.js';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deleteContact, hotContact } from "../../../actions/contactActions.js";
import { Navigate, useNavigate } from "react-router-dom";

const Contact = ({ contact: contact, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isHot, setIsHot] = useState(contact.isHot);
    const user = JSON.parse(localStorage.getItem('profile'));

    const toggleHotList = (state) => {
        dispatch(hotContact(contact._id));
        return state === false ? true : false;
    }

    const openContact = () => navigate(`/contact-list/${contact._id}`);

    return ( 
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openContact}>
                <CardMedia className={classes.media} image={contact.selectedFile} email={contact.email} compoennt='img'/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{contact.name}</Typography>
                    <Typography variant="body2">Submitted by {contact.creatorName} at {moment(contact.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{contact.phone}</Typography>
                </div>
                <Typography className={classes.email} variant="h5" gutterBottom>{contact.email}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" gutterBottom>{contact.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => setIsHot((currValue) => toggleHotList(currValue))}>
                    {isHot === false ? <Whatshot fontSize="medium" /> : <Whatshot fontSize="medium" style={{ color: "red" }}/>}
                </Button>
                {(user?.result?._id === contact?.creatorUserId) && (
                    <Button size="small" color="primary" onClick={() => {dispatch(deleteContact(contact._id))}}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>) 
                }  
                {(user?.result?._id === contact?.creatorUserId) && (
                        <Button color='primary' size="small" onClick={() => setCurrentId(contact._id)}>
                            <MoreVertIcon fontSize="medium"></MoreVertIcon>
                        </Button>
                )}
            </CardActions>
        </Card>
     );
}
 
export default Contact;