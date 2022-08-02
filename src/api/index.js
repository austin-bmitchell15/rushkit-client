import axios from 'axios';

const url = 'http://localhost:5000/contact-list';

export const fetchContacts = () => axios.get(url);

export const createContacts = (newContact) => axios.post(url, newContact);

export const updateContact = (id, updatedContact) => axios.patch(`${url}/${id}`, updatedContact);

export const deleteContact = (id) => axios.delete(`${url}/${id}`);

export const hotContact =  (id) => axios.patch(`${url}/${id}/hotContact`)