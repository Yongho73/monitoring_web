import axios from 'axios';

const GET_COMMON_CODE_LIST = '/api/code/getCommCodeList'
const GET_DEVICE_COMPANY_LIST = '/api/code/getDeviceCompanyList'

export function getCommCodeList(param) {
    return axios.get(GET_COMMON_CODE_LIST , {params : param });
}

export function getDeviceCompanyList(param) {
    return axios.get(GET_DEVICE_COMPANY_LIST , {params : param });
}

