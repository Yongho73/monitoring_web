import axios from 'axios';

const GET_DEVICE_LIST_URL = '/api/dashboard/getDeviceList'
const GET_DEVICE_LIST_EXCEL_URL = '/api/dashboard/getDeviceExcelList'
const GET_DEVICE_DETAIL_URL = '/api/mongo/dashboard/getDeviceDetail'
const GET_DEVICE_DETAIL_EXCEL_URL = '/api/mongo/dashboard/getDeviceDetailExcel'


export function getDeviceList(param) {
    return axios.get(GET_DEVICE_LIST_URL , {params : param });
}

export function getDeviceExceList(param) {
    return axios.get(GET_DEVICE_LIST_EXCEL_URL , {params : param });
}

export function getDeviceDetail(param) {
    return axios.get(GET_DEVICE_DETAIL_URL , {params : param });
}

export function getDeviceDetailExcel(param) {
    return axios.post(GET_DEVICE_DETAIL_EXCEL_URL , param , {responseType: 'blob'});
}
