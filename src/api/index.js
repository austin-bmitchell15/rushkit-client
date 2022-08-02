import axios from 'axios';

const API = axios.create({ baseURL: 'https://rushkit-project.herokuapp.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchContacts = () => API.get('/contact-list');
export const createContacts = (newContact) => API.post('/contact-list', newContact);
export const updateContact = (id, updatedContact) => API.patch(`/contact-list/${id}`, updatedContact);
export const deleteContact = (id) => API.delete(`/contact-list/${id}`);
export const hotContact =  (id) => API.patch(`/contact-list/${id}/hotContact`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);