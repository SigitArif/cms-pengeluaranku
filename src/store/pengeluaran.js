import {appConfig} from '../config/app';
import axios from 'axios';
const baseUrl = appConfig.apiUrl + '/pengeluaranku-service/api/v1/pengeluaran';

export function postData(data){
    return axios.post(baseUrl+'/add', data).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}

export function getData(){
    return axios.get(baseUrl+'/list').then(res=>{
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

export async function editData(id, data){
    return axios.put(baseUrl+'/edit?uuid='+id, data).then(res=>{
        return res;
    }).catch(err=>{
        throw err;
    })
}

