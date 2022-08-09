import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signup, signin } from '../../actions/authActions.js';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AuthInput from './AuthInput.js';
import useStyles from './styles.js';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', secretWord: ''};

const Auth = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showSecretWord, setShowSecretWord] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleShowSecretWord = () => setShowSecretWord((prevShowSecretWord) => !prevShowSecretWord);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
        clear();
    };

    const clear = () => {
        setFormData(initialState);
    };

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            {props.errorMessage && <div>{props.errorMessage}</div>}
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <AuthInput name="firstName" label="First Name" handleChange={handleChange} half />
                                <AuthInput name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    {
                        isSignUp && (
                            <>
                                <AuthInput name="secretWord" label="Secret Word" handleChange={handleChange} type={showSecretWord ? "text" : "secretWord"} handleShow={handleShowSecretWord}></AuthInput>
                            </>
                        )
                    }
                    <AuthInput name="email" label="Email Address" handleChange={handleChange} type="email"></AuthInput>
                    <AuthInput name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShow={handleShowPassword}></AuthInput>
                    { isSignUp && <AuthInput name="confirmPassword" label="RepeatPassword" handleChange={handleChange} type="password"></AuthInput>}
                </Grid>
                
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Paper>
    </Container>
  )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
    };
};
export default connect(mapStateToProps)(Auth)
