import {appConfig} from '../config/app';
import axios from 'axios';
const baseUrl = appConfig.apiUrl + '/pengeluaranku-service/api/v1/transaksi';

export function postData(data){
    return axios.post(baseUrl+'/add', data).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}

export function getData(){
    const USER_TOKEN = localStorage.getItem('id_token');
    const AUTH = 'Bearer ' + USER_TOKEN;
    const URL = baseUrl+'/list'
    return axios.get(URL, {'headers': {'Authorization': AUTH}}).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}


export async function deleteData(id){
    return axios.delete(baseUrl+'/delete?uuid='+id).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}


