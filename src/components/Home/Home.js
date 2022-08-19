import React, {useState, useEffect} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { DOORMAN, USER, ADMIN } from "../../constants/roleTypes.js"; 

import { getContacts, getContactsBySearch } from '../../actions/contactActions.js';
import Paginate from '../Pagination.jsx';
import ContactList from '../ContactList/ContactList.js';
import Form from '../Form/Form.js';
import useStyles from './styles.js';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');

    const handleKeyDown = (e) => {
        e.preventDefault();
        if (e.key === "Enter") {
            handleSearch();
        }

    }

    const handleSearch = () => {
        if(search.trim()) {
            dispatch(getContactsBySearch(search))
            navigate(`/contact-list/search?searchQuery=${search || 'none'}`);
        } else {
            navigate('/');
        }
    }

    const onSearchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    useEffect(() => {
        if (!user?.result?.name) {
            navigate('/auth');
        }
    });

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <ContactList setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Search Contacts' fullWidth value={search} onChange={onSearchChange} onKeyDown={handleKeyDown}/>
                            <Button onClick={handleSearch} className={classes.searchButton} color='primary'>Search</Button>
                        </AppBar>         
                    {(user?.result?.role === DOORMAN || user?.result?.role === ADMIN) && (
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    ) 
                }  
                        <Paper className={classes.pagination} elevation={6}>
                            <Paginate page={ page }/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
