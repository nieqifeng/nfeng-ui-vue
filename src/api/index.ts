import { GET } from './request'

export default {
  getUsers: (params?: object) =>
    GET('https://jsonplaceholder.typicode.com/users', params)
}
