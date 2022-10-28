import React from 'react';
import axios from 'axios'
import LoadingSpinner from '../home/common/LodingSpinner'


axios.interceptors.request.use(function (config) {
  // 
    //LoadingSpinner()
    return <LoadingSpinner />;
    }, function (error) {
    // 실패 시 로딩창 종료
    
    return Promise.reject(error);
})
axios.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default axios;