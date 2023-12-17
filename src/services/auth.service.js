import axios from "axios";
import { CURRENT_URL } from "../services/config";


const API_URL = CURRENT_URL + "auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  const formData = new FormData();
  formData.set('username', username)
  formData.set('password', password)
  
  return axios
    .post(
      API_URL + "/jwt/login", 
      formData,
      {
        headers: {'Content-Type': 'multipart/form-data',}
      })
    .then((response) => {      
      console.log(response)
      localStorage.setItem("user", username);
    })
    .catch((error) => console.log(error));
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "jwt/logout",
    null,
  )
  .then((response) => {
    return response.data;
  })
  .catch((error) => console.log(error))
};

const getCurrentUser = () => {
  return localStorage.getItem("user");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;