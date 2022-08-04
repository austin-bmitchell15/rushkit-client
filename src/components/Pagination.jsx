import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getContacts } from '../actions/contactActions';
import useStyles from './styles'

const Paginate = ({ page }) => {
    const numberOfPages = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(page) dispatch((getContacts(page)))
    }, [page])

    return(
        <Pagination classes={{ul: classes.ul}} count={numberOfPages} page={Number(page) || 1} variant='outlined' color='primary' renderItem={(item) => (
            <PaginationItem { ...item} component={Link} to={`/contact-list?page=${item.page}`} />
        )} />
    )
}

export default Paginate;