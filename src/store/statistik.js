import {appConfig} from '../config/app';
import axios from 'axios';
const baseUrl = appConfig.apiUrl + '/pengeluaranku-service/api/v1/statistic';

export function getMonthlyData(month, type){
    return axios.get(baseUrl+'/monthly?month='+month+'&type='+type).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}