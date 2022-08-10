import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import {Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


import useStyles from './styles';
import logo from '../../images/Logo.png'

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/auth');
        setUser(null);
    };

    const openUserInfo = (e) => {
        e.preventDefault();
        navigate(`/user/${user?.result._id}`);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="secondary">
            <div>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Delta Chi Rush Kit</Typography>
                <img src={logo} alt="Delta Chi" height="40"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user && (
                    <div className={classes.profile}>
                        <IconButton onClick={openUserInfo} size="small" sx={{ ml: 2 }}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        </IconButton>
                        <Button variant="contained" className={classes.logout} color="primary" onClick={logout}>Logout</Button>
                    </div>
                )}
            </Toolbar>

        </AppBar>
    )
};

export default Navbar;

