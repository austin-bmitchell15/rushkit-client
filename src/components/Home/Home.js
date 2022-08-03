import React, {useState, useEffect} from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { getContacts } from '../../actions/contactActions.js';
import ContactList from '../ContactList/ContactList.js';
import Form from '../Form/Form.js';
import useStyles from './styles.js';

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.result?.name) {
            navigate('/auth');
        } 
        dispatch(getContacts());
    }, [dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <ContactList setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
