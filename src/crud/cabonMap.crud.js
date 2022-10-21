import axios from 'axios';

const CABON_MAP_LIST = '/api/getCabonMapList'

export default function  getCabonMapList(param) {
    return axios.get(CABON_MAP_LIST , param);
}