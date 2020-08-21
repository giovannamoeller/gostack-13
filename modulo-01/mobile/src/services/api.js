import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;

/*
    iOS emulador: localhost
    iOS com dispositivo físico: IP da máquina
*/