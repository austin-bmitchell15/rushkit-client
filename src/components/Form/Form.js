import React, {useEffect, useState} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts.js";
import useStyles from './styles.js'

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        name: '', email: '', message: '', phone: '', selectedFiles: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => (p._id === currentId)) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post)
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({name: '', email: '', message: '', phone: '', selectedFiles: ''});
    }

    return ( 
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({...postData, name: e.target.value})} />
                <TextField name="email" variant="outlined" label="Email" fullWidth value={postData.email} onChange={(e) => setPostData({...postData, email: e.target.value})} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
                <TextField name="phone" variant="outlined" label="Phone" fullWidth value={postData.phone} onChange={(e) => setPostData({...postData, phone: e.target.value})} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
     );
}
 
export default Form;