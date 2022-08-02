import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Divider, ListItemIcon } from '@material-ui/core'
import { PersonAdd, Settings, LogoutIcon } from '@material-ui/icons'
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
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/auth');
        setUser(null);
    };

    const handleClick = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    };

    const toggleClose = (e) => {
        e.preventDefault();
        setAnchorEl(null);
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
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        </IconButton>
                        <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={toggleClose} onClick={toggleClose} getContentAnchorEl={null} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} transformOrigin={{vertical: 'top', horizontal: 'right'}}>
                            <MenuItem>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar> Profile
                            </MenuItem>
                                <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem color="primary" onClick={logout}>
                                Logout
                            </MenuItem>
                        </Menu>
                        <Button variant="contained" className={classes.logout} color="primary" onClick={logout}>Logout</Button>
                    </div>
                )}
            </Toolbar>

        </AppBar>
    )
};

export default Navbar;

