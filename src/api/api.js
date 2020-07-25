import '../config'
import axios from "axios";

const { BASE } = global.constants;

export const getMessage = async (name, message,vars)=>
    axios.post(`${BASE}/ask`,{"username": name, 'message':message,'vars':vars })

export const userLogin = async (name,password)=>
    axios.post(`${BASE}/auth/token`,{'username':name,'password':password})

export const getUserInfo = async(name)=>
    axios.get(`${BASE}/user/${name}`,{headers: {'Content-Type': 'application/json','Authorization': 'Token ' + sessionStorage.getItem('token')}})










