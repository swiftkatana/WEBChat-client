import axios from 'axios';

import server from './serverIP'

export default axios.create({baseURL:server});