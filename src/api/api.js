import '../config'
import axios from "axios";

const { BASE } = global.constants;

export const getMessage = async (name, message,vars)=>
    axios.post(`${BASE}/v1/ask`,{"username": name, 'message':message,'vars':vars })
