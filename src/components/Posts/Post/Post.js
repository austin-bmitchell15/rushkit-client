import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import Whatshot from '@material-ui/icons/Whatshot';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles.js';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost } from "../../../actions/posts.js";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return ( 
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} email={post.email} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium"></MoreHorizIcon>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.phone}</Typography>
            </div>
            <Typography className={classes.email} variant="h5" gutterBottom>{post.email}</Typography>
            <CardContent>
                <Typography variant="h5" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <Whatshot fontSize="small" />
                    Like
                </Button>
                <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
     );
}
 
export default Post;