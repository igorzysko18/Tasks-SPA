import axios from 'axios';

export default class UserServices {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API
    })
  }

  async login (dados) {
    const {data} = await this.axios.post('/users/login', dados, { headers: {'Authorization': 'api-key ' + process.env.REACT_APP_API_KEY}})
    if (data) {
      localStorage.setItem("token", data.token)
      return true
    }
    return
  }

  async cadastrar (dados) {
    return this.axios.post('/users', dados, { headers: {'Authorization': 'api-key ' + process.env.REACT_APP_API_KEY}})
  }

  usuarioAutenticado () {
    return localStorage.getItem("token") !== undefined ? true : false
  }

  async logout () {
    localStorage.removeItem("token")
  }
}