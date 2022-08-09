import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const AuthInput = ({ name, handleChange, label, half, autoFocus, type, handleShow }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={ name }
            onChange={ handleChange }
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={
                (name === 'password' || name === 'secretWord') && {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleShow}>
                                {(type === "password" || type === "secretWord") ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }
        />
    </Grid>
  )
}

export default AuthInput
