import { useLocation, Navigate } from "react-router-dom"
import Cookies from 'js-cookie';

export const setToken = (token) => {

    localStorage.setItem('temitope', token)// make up your own token
}

export const fetchToken = (token) => {

    return localStorage.getItem('temitope')
}

export const checkCookie = () => {

}

export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function RequireToken({children}){
    
    let auth = getCookie('CoinKeeper')
    
    let location = useLocation()

    if(!auth){
        return <Navigate to='/login' state ={{from : location}}/>;
    }

    return children;
}
