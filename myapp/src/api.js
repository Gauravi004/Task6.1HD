import axios from 'axios';
const API = 'http://localhost:5000';


export async function callAssistant(prompt){
const res = await axios.post(`${API}/api/assistant`, { prompt });
return res.data;
}


export async function setup2FA(userId){
const res = await axios.post(`${API}/api/2fa/setup`, { userId });
return res.data;
}


export async function verify2FA(userId, token){
const res = await axios.post(`${API}/api/2fa/verify`, { userId, token });
return res.data;
}