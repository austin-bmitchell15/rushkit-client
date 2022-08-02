import React, {useEffect, useState} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { createContact, updateContact } from "../../actions/contactActions.js";
import useStyles from './styles.js'

const Form = ({currentId, setCurrentId}) => {
    const [contactInfo, setContactInfo] = useState({
        name: '', email: '', message: '', phone: '', selectedFiles: '', isHot: false
    });
    const contact = useSelector((state) => currentId ? state.contacts.find((p) => (p._id === currentId)) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(contact) setContactInfo(contact)
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentId) {
            dispatch(updateContact(currentId, contactInfo));
        } else {
            dispatch(createContact(contactInfo));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setContactInfo({name: '', email: '', message: '', phone: '', isHot: false});
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