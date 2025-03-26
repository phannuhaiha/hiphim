// import Cookies from "js-cookie"

export default{
    getCookie(){
        return localStorage.getItem('token')
    },
    removeCookie(){
        localStorage.removeItem('token')
    },
    getCookieAdmin(){
        return localStorage.getItem('tokenadmin')
    },
    removeCookieAdmin(){
        localStorage.removeItem('tokenadmin')
    }
}
