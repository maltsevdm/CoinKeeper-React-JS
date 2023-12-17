import { useNavigate } from "react-router";
import { fetchToken, setToken, checkCookie, getCookie } from "./Auth";
import { useState } from "react";
import axios from "axios";


export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const login = () => {
    if ((username == "") & (password == "")) {
      return;
    } else {
        const formData = new FormData();
        formData.set('username', username);
        formData.set('password', password);
        axios.post(
            'http://localhost:8000/auth/jwt/login',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },                
                withCredentials: true
            },
        )
        .then((response) => {navigate('/')})
        .catch((error) => console.log(error));
    }
  };

  return (
    <div style={{ minHeight: 800, marginTop: 30 }}>
      <h1>login page</h1>
      <div style={{ marginTop: 30 }}>
        {getCookie('CoinKeeper') ? (
          <p>you are logged in</p>
        ) : (
          <div>
            <form>
              <label style={{ marginRight: 10 }}>Input Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label style={{ marginRight: 10 }}>Input Password</label>
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="button" onClick={login}>
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}