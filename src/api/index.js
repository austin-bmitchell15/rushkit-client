import axios from 'axios';

const url = 'https://dashboard.heroku.com/apps/rushkit-project';

export const fetchContacts = () => axios.get(url);

export const createContacts = (newContact) => axios.post(url, newContact);

export const updateContact = (id, updatedContact) => axios.patch(`${url}/${id}`, updatedContact);

export const deleteContact = (id) => axios.delete(`${url}/${id}`);

export const hotContact =  (id) => axios.patch(`${url}/${id}/hotContact`)