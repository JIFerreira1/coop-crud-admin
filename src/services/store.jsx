import axios from 'axios';

export function getItemsListStore() {
  return axios.get("http://localhost:3333/store")
  .then(response => response.data)
  .catch(error => error)
}