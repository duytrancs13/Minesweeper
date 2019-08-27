import axios from 'axios';
import { API_URL } from './Config';

export default function GameService(path, method, body) {
    return axios.get({
        method: method,
        url: `${API_URL}/${path}`,
        data: body
    }).catch(err => {
        console.log('Error: ', err);
    })
}