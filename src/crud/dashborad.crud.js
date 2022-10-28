import axios from 'axios';

const GET_DEVICE_LIST_URL = '/api/dashboard/getDeviceList'
const GET_DEVICE_LIST_EXCEL_URL = '/api/dashboard/getDeviceExceList'


export function getDeviceList(param) {
    return axios.get(GET_DEVICE_LIST_URL , {params : param });
}

export function getDeviceExceList(param) {
    return axios.get(GET_DEVICE_LIST_EXCEL_URL , {params : param });
}

