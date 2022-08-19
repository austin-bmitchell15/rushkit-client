import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signup, signin } from '../../actions/authActions.js';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EMAIL_EXISTS, INVALID_CREDENTIALS, PASSWORD_DO_NOT_MATCH, USER_DOES_NOT_EXIST } from '../../constants/errorTypes.js';

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

    console.log(props);

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

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword((prevShowPassword) => !prevShowPassword)
    };
    const handleShowSecretWord = (e) => {
        e.preventDefault();
        setShowSecretWord((prevShowSecretWord) => !prevShowSecretWord)
    };

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
                                <AuthInput name="secretWord" label="Secret Word" handleChange={handleChange} type={showSecretWord ? "text" : "secretWord"}
                                    error={(props.errorType === INVALID_CREDENTIALS)} errorMessage={(props.errorType === INVALID_CREDENTIALS && props.errorMessage) ? props.errorMessage : ""} handleShow={handleShowSecretWord}>
                                </AuthInput>
                            </>
                        )
                    }
                    <AuthInput name="email" label="Email Address" handleChange={handleChange}  type="email" 
                        error={ (props.errorType === EMAIL_EXISTS || props.errorType === INVALID_CREDENTIALS || props.errorType === USER_DOES_NOT_EXIST) }
                        errorMessage={ ((props.errorType === EMAIL_EXISTS || props.errorType === INVALID_CREDENTIALS || props.errorType === USER_DOES_NOT_EXIST)  && props.errorMessage) ? props.errorMessage : "" }>
                    </AuthInput>
                    <AuthInput name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShow={handleShowPassword} 
                        error={ (props.errorType === PASSWORD_DO_NOT_MATCH || props.errorType === INVALID_CREDENTIALS) }
                        errorMessage={ ((props.errorType === PASSWORD_DO_NOT_MATCH || props.errorType === INVALID_CREDENTIALS)  && props.errorMessage) ? props.errorMessage : "" }>
                    </AuthInput>
                    { isSignUp && <AuthInput name="confirmPassword" label="RepeatPassword" handleChange={handleChange} type="password"  
                        error={props.errorType === PASSWORD_DO_NOT_MATCH} errorMessage={ ( props.errorType === PASSWORD_DO_NOT_MATCH && props.errorMessage) ? props.errorMessage : "" }>
                    </AuthInput>}
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
        errorType: state.auth.errorType,
    };
};
export default connect(mapStateToProps)(Auth)
