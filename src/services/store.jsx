import axios from 'axios';

export function getItemsListStore() {
  return axios.get("https://coop-crud-api.herokuapp.com/store")
  .then(response => response.data)
  .catch(error => error)
}

export function updateStore(id, data) {
  return axios.put(`https://coop-crud-api.herokuapp.com/store/${id}`, data)
        .then(response => {console.log(response)})
        .catch(error => {console.log('e', error)})
    
  // return fetch(`https://coop-crud-api.herokuapp.com/store/${id}`, {
  //   method: 'PUT',
  //   body: data,
  // })
  // .then(response => response.text())
  // .then(response => {console.log(response)})
  // .catch(error => {console.log('e', error)})
}

export function createStore(data) {
  return axios.post(`https://coop-crud-api.herokuapp.com/store/create`, data)
        .then(response => {console.log(response)})
        .catch(error => {console.log('e', error)})
    
  // return fetch(`https://coop-crud-api.herokuapp.com/store/${id}`, {
  //   method: 'PUT',
  //   body: data,
  // })
  // .then(response => response.text())
  // .then(response => {console.log(response)})
  // .catch(error => {console.log('e', error)})
}