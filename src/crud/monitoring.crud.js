import axios from 'axios';

const GET_MONITORING_LIST = '/api/getMonitoringList'
const GET_MONITORING_EXCEL_LIST = '/api/getMonitoringExcelList'
export function getMonitoringList(param) {
    return axios.get(GET_MONITORING_LIST , {params : param });
}

export function getMonitoringExcelList(param) {
    return axios.get(GET_MONITORING_EXCEL_LIST , {params : param });
}

