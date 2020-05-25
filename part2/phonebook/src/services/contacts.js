import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)


const add = newContact => axios.post(baseUrl, newContact).then(
    res => res.data)


export default {getAll, add}
