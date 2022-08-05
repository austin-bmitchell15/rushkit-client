import React from "react";
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from "react-redux";

import Contact from "./Contact/Contact.js"
import useStyles from './styles.js'

const ContactList = ({ setCurrentId }) => {
    const { contacts, isLoading } = useSelector((state) => state.contacts);
    console.log(contacts);
    const classes = useStyles();

    return (
        isLoading ? <CircularProgress color='secondary'/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {contacts.map((contact) => (
                    <Grid key={contact._id} item xs={12} sm={6}>
                        <Contact contact={contact} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
     );
}
 
export default ContactList;