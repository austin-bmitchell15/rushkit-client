import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const UserInfo = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Paper>
        <Typography variant="h3" component="h2">{user?.result.name}</Typography>
        <Paper>
            <Typography>
                Change Password
            </Typography>
        </Paper>
    </Paper>
  )
}

export default UserInfo
