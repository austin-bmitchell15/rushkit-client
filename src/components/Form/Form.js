import React, {useEffect, useState} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";

import { createContact, updateContact } from "../../actions/contactActions.js";
import useStyles from './styles.js'

const Form = ({currentId, setCurrentId}) => {
    const [contactInfo, setContactInfo] = useState({
        name: '', email: '', message: '', phone: '',  isHot: false, creatorName: ''
    });
    const contact = useSelector((state) => currentId ? state.contacts.contacts.find((p) => (p._id === currentId)) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(contact) setContactInfo(contact)
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId) {
            dispatch(updateContact(currentId, { ...contactInfo, creatorName: user?.result?.name}));
        } else {
            dispatch(createContact({ ...contactInfo, creatorName: user?.result?.name}));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setContactInfo({name: '', email: '', message: '', phone: '', isHot: false});
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create and view contacts
                </Typography>
            </Paper>    
        )
    }

    return ( 
        <Paper className={classes.paper}>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Create a Contact</Typography>
                <TextField required name="name" variant="outlined" label="Name" fullWidth value={contactInfo.name} onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})} />
                <TextField required name="email" variant="outlined" label="Email" fullWidth value={contactInfo.email} onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={contactInfo.message} onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})} />
                <TextField name="phone" variant="outlined" label="Phone" fullWidth value={contactInfo.phone} onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
     );
}
 
export default Form;