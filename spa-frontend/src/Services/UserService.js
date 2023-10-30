import axios from 'axios';

export default class UserServices {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API
    })
  }

  async login (dados) {
    console.log(2,dados,process.env.REACT_APP_API)
    const {data} = await this.axios.post('/users/login', dados, { headers: {'Authorization': 'api-key ' + process.env.REACT_APP_API_KEY}})
    console.log(data)
    if (data) {
      localStorage.setItem("token", data.token)
      return true
    }

    return
  }

  async cadastrar (dados) {
    return this.axios.post('/user', dados)
  }

  usuarioAutenticado () {
    return localStorage.getItem("token") !== undefined ? true : false
  }

  async logout () {
    localStorage.removeItem("token")
  }
}