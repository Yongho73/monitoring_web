import axios from 'axios';

const GET_MONITORING_LIST = '/api/getMonitoringList'
const GET_MONITORING_EXCEL_LIST = '/api/getMonitoringExcelList'
const GET_MONITORING_Detail = '/api/getMonitoringList'
export function getMonitoringList(param) {
    return axios.get(GET_MONITORING_LIST , {params : param });
}

export function getMonitoringExcelList(param) {
    return axios.get(GET_MONITORING_EXCEL_LIST , {params : param });
}


export function getMonitoringDetail(param) {
    return axios.get(GET_MONITORING_Detail , {params : param });
}

