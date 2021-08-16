import axios from 'axios';

export function getItemsListStore() {
  return axios.get("http://localhost:3333/store")
  .then(response => response.data)
  .catch(error => error)
}

export function updateStore(id, data) {
  return axios.put(`http://localhost:3333/store/${id}`, data)
        .then(response => {console.log(response)})
        .catch(error => {console.log('e', error)})
    
  // return fetch(`http://localhost:3333/store/${id}`, {
  //   method: 'PUT',
  //   body: data,
  // })
  // .then(response => response.text())
  // .then(response => {console.log(response)})
  // .catch(error => {console.log('e', error)})
}

export function createStore(data) {
  return axios.post(`http://localhost:3333/store/create`, data)
        .then(response => {console.log(response)})
        .catch(error => {console.log('e', error)})
    
  // return fetch(`http://localhost:3333/store/${id}`, {
  //   method: 'PUT',
  //   body: data,
  // })
  // .then(response => response.text())
  // .then(response => {console.log(response)})
  // .catch(error => {console.log('e', error)})
}