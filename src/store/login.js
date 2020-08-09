import {appConfig} from '../config/app';
import axios from 'axios';
const baseUrl = appConfig.apiUrl + '/pengeluaranku-service/api/v1/user';

export function login(data){
    return axios.post(baseUrl+'/login', data).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}