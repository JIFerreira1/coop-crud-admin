export const isAuthenticated = () => window.localStorage.getItem('tokenUser');

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

export const recoveryPassword = () => {
  return fetch("https://api.coop-sp.coop.br/app//profile", {
    method: 'get',
    headers: {
      "x-api-key": "ZnsEzOmvhD7wgymEzvQFuaQHDvsqitvg439tImum",
      "Content-Type": "application/json",
      "Authorization": window.localStorage.getItem('tokenUser')
    }
  })
}
