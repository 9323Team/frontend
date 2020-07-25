import '../config'
import axios from "axios";

const { BASE } = global.constants;

export const getMessage = async (name, message,vars)=>
    axios.post(`${BASE}/v1/ask`,{"username": name, 'message':message,'vars':vars })

export const userLogin = async (name,password)=>
    axios.post(`${BASE}/auth/token`,{'username':name,'password':password})

export const getUserInfo = async(name)=>
    axios.get(`${BASE}/users/${name}`,{headers: {'Content-Type': 'application/json','AUTH-TOKEN': sessionStorage.getItem('token')}})

export const getPosts = async()=>
    axios.get(`${BASE}/posts`,{headers: {'Content-Type': 'application/json','AUTH-TOKEN': sessionStorage.getItem('token')}})

export const postPost =async(post)=>
    axios.post(`${BASE}/posts`,post,{
        headers: {'Content-Type': 'application/json','AUTH-TOKEN': sessionStorage.getItem('token')},
        
})

export const likePost = async (postid, votedata)=>
    axios.put(`${BASE}/votes/${postid}`, votedata,{
        headers: {"Content-Type": "application/json","AUTH-TOKEN": sessionStorage.getItem('token')},  
})

export const dislikePost = async (postid)=>
    axios.delete(`${BASE}/votes/${postid}?username=${sessionStorage.getItem('username')}`,{
        headers: {"Content-Type": "application/json","AUTH-TOKEN": sessionStorage.getItem('token')},
})

export const getComments = async(postid)=>
    axios.get(`${BASE}/comments/${postid}`,{
        headers: {"Content-Type": "application/json","AUTH-TOKEN": sessionStorage.getItem('token')}
})

export const postComment = async(postid,data)=>
    axios.post(`${BASE}/comments/${postid}`,data,{
        headers: {"Content-Type": "application/json","AUTH-TOKEN": sessionStorage.getItem('token')}
})










