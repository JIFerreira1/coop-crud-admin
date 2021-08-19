export const isAuthenticated = () => window.localStorage.getItem('tokenUser');
const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWNiOGQ0YTUyMDM1MjdiN2JlZmE4YTYxIiwibmFtZSI6IlJvYnNvbiBLYWlvIiwibG9naW4iOiIzMDYyODcwMTg0NSIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE2MjczMjkxMjksImV4cCI6MTYyODYyNTEyOX0.PudM4beN6bb176BobvXdRszTez1uWlM1wQDANqqX9WY"

export const loggingUser = (user) => {
  debugger
  const data = JSON.stringify(user);
  return fetch('https://api.coop-sp.coop.br/app//auth/login', {
    method: 'post',
    headers: {
      "x-api-key": "ZnsEzOmvhD7wgymEzvQFuaQHDvsqitvg439tImum",
      "Content-Type": "application/json"
    },
    body: data,
  })
}

export const createUser = (user) => {
  const data = JSON.stringify(user);
  return fetch('https://api.coop-sp.coop.br/app//profile', {
    method: 'post',
    headers: {
      "x-api-key": "ZnsEzOmvhD7wgymEzvQFuaQHDvsqitvg439tImum",
      "Content-Type": "application/json",
    },
    body: data,
  })
}

export const verifyCPFCreated = (cpf) => {
  return fetch('https://api.coop-sp.coop.br/app//searchUserByCPF', {
    method: 'post',
    headers: {
      "x-api-key": "ZnsEzOmvhD7wgymEzvQFuaQHDvsqitvg439tImum",
      "Content-Type": "application/json"
    },
    body: cpf,
  })
}

export const aboutUser = () => {
  return fetch("https://api.coop-sp.coop.br/app//profile", {
    method: 'get',
    headers: {
      "x-api-key": "ZnsEzOmvhD7wgymEzvQFuaQHDvsqitvg439tImum",
      "Content-Type": "application/json",
      "Authorization": window.localStorage.getItem('tokenUser')
    }
  })
}

export const recoveryPassword = (data) => {
  return fetch("https://api.coop-sp.coop.br/app//auth/newpassword", {
    method: 'post',
    headers: {
      "x-api-key": "ZnsEzOmvhD7wgymEzvQFuaQHDvsqitvg439tImum",
      "Content-Type": "application/json"
    },
    body: data
  })
}
