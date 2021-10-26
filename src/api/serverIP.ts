import { productionIp, state } from '../config/state'

/* eslint-disable no-unused-vars */
const inMyServer = 'http://84.108.77.188:1029'
const ip = state === 'dev' ? inMyServer : productionIp
export default ip
