import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
} 

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (id, personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, updateNumber }
