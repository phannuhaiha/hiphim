import axios from "@/config/axios.js";
import csrf from "@/config/csrf";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isLoggedIn: false,
    }),
    actions: {
        async login(user) {
            try {
                const response = await axios.post('auth/login', user)
                this.user = response.user
                this.isLoggedIn = true
                Cookies.set('token',response.token)
                return true

            } catch (error) {
                console.log("Đăng nhập thất bại: ", error.response.data.message)
                throw error.response.data.message
            }
        },
        async getUser() {
            try {
                const token = csrf.getCookie()
                const response = await axios.get('user/info', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                this.user = response.user
                this.isLoggedIn = true
            } catch (error) {
                this.user = null
                this.isLoggedIn = false
            }
        },
        logout(){
            this.user = null
            this.isLoggedIn = false
            csrf.removeCookie()
        }
    },
})
