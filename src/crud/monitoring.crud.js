import axios from 'axios';

const GET_MONITORING_LIST = '/api/getMonitoringList'

export default function getMonitoringList(param) {
    return axios.get(GET_MONITORING_LIST , param);
}