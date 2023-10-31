import axios from 'axios';

export default class TaskServices {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API
    })
  }

  async buscar () {
    return this.axios.get('/tasks', { headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}})
  }

  async cadastrar (dados) {
    return this.axios.post('/tasks', dados, { headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}})
  }

  async deletar (id) {
    return this.axios.delete('/tasks/' + id, { headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}})
  }

  async editar (id, dados) {
    dados.status = 1
    return this.axios.put('/tasks/' + id, dados, { headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}})
  }

  usuarioAutenticado () {
    return localStorage.getItem("token") !== undefined ? true : false
  }

  async logout () {
    localStorage.removeItem("token")
  }
}