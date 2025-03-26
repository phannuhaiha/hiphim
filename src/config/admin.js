import axios from "@/config/axios"
import csrf from "./csrf"
import router from "@/router"

export const checkAuthAdmin = async () =>{
    try {
        const token = csrf.getCookieAdmin()
        const response = await axios.get('admin/get-my-admin',{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        return response.user
    } catch (error) {
        // console.log(error)
        csrf.removeCookieAdmin()
        return null
    }
}
