import axios from "@/config/axios.js"
import csrf from "./csrf"

export const checkAuthStatus = async () => {
    try {
        const token = csrf.getCookie()
        const response = await axios.get('user/info',{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response.user
    } catch (error) {
        console.log("Nguời dùng chưa đăng nhập: ", error)
        csrf.removeCookie()
        return null
    }
}
