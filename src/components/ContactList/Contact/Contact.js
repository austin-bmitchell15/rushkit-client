import React, { useState } from "react";
import { Card, CardHeader, CardActions, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import Whatshot from '@material-ui/icons/Whatshot';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles.js';
import { DOORMAN, USER, ADMIN } from "../../../constants/roleTypes.js"; 
import { useDispatch } from 'react-redux';

import { deleteContact, hotContact } from "../../../actions/contactActions.js";
import { useNavigate } from "react-router-dom";

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
                <CardHeader color="primary" title={contact.name} subheader={contact.email}></CardHeader>
                <CardMedia className={classes.media} image={contact.selectedFile} component='img'/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{contact.phoneNumber}</Typography>
                </div>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                {(user?.result?.role === ADMIN) && (
                    <Button size="small" color="primary" onClick={() => setIsHot((currValue) => toggleHotList(currValue))}>
                        {isHot === false ? <Whatshot fontSize="medium" /> : <Whatshot fontSize="medium" style={{ color: "red" }}/>}
                    </Button>
                )}
                {(user?.result?.role === DOORMAN || user?.result?.role === USER) &&
                    <Whatshot fontSize="medium"style={isHot ? { color: "red" } : {color: "default"}}/>
                }
                {(user?.result?.role === DOORMAN || user?.result?.role === ADMIN) && (
                    <Button size="small" color="primary" onClick={() => {dispatch(deleteContact(contact._id))}}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>) 
                }  
                {(user?.result?.role === DOORMAN || user?.result?.role === ADMIN) && (
                        <Button color='primary' size="small" onClick={() => setCurrentId(contact._id)}>
                            <MoreVertIcon fontSize="medium"></MoreVertIcon>
                        </Button>
                )}
            </CardActions>
        </Card>
     );
}
 
export default Contact;