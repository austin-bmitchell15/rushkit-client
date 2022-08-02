import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import Whatshot from '@material-ui/icons/Whatshot';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles.js';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deleteContact, hotContact } from "../../../actions/contactActions.js";

const Contact = ({ contact: contact, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isHot, setIsHot] = useState(contact.isHot);

    const toggleHotList = (state) => {
        dispatch(hotContact(contact._id));
        return state === false ? true : false;
    }

    return ( 
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={contact.selectedFile} email={contact.email} />
            <div className={classes.overlay}>
                <Typography variant="h6">{contact.name}</Typography>
                <Typography variant="body2">{moment(contact.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(contact._id)}>
                    <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{contact.phone}</Typography>
            </div>
            <Typography className={classes.email} variant="h5" gutterBottom>{contact.email}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>{contact.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => setIsHot((currValue) => toggleHotList(currValue))}>
                    {isHot === false ? <Whatshot fontSize="medium" /> : <Whatshot fontSize="medium" style={{ color: "red" }}/>}
                </Button>
                <Button size="small" color="primary" onClick={() => {dispatch(deleteContact(contact._id))}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
     );
}
 
export default Contact;