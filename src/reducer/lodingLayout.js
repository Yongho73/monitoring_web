import axios from "axios";
import React, {useEffect } from "react";
import { useDispatch } from 'react-redux'

export const GLOBAL_LOADING = "LOADING"
export const GLOBAL_LOADED = "LOADED"

const LodingLayout = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        axios.interceptors.request.use(function (config) {
            console.log(1)
            // 로딩 호출
            dispatch({
                type: GLOBAL_LOADING
            })
            return config;
        }, function (error) {
            // 실패 시 로딩창 종료
            dispatch({
                type: GLOBAL_LOADED
            })
            return Promise.reject(error);
        })
        axios.interceptors.response.use((config) => {
            // 완료 시 로딩창 종료
            dispatch({
                type: GLOBAL_LOADED
            })
            return config;
        },(error) => {
            // 실패 시 로딩창 종료
            dispatch({
                type: GLOBAL_LOADED
            })
            return Promise.reject(error)
        })
    }, [])
}
export default LodingLayout
