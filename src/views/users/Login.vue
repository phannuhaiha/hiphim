<template>
  <div class="max-w-[720px] mx-auto">
    <div class="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px] mt-14 font-roboto">
      <h1 class="block w-full px-4 py-2 text-center text-slate-700 dark:text-gray-200 transition-all">
        Hiện tại đạt BE chưa làm được đăng nhập SDT <b>HIHI</b>.
      </h1>
    </div>

    <div class="w-full max-w-sm min-w-[200px] mx-auto font-roboto">
      <label class="block mb-1 text-sm text-slate-800 dark:text-gray-200">Phone Number</label>

      <input type="text" placeholder="(+84) 123-456-7890" pattern="\(\+\d{2}\) \d{3}-\d{3}-\d{4}"
        title="Phone number format should be like (+33) 123-456-7890"
        class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-slate-100 text-sm border border-slate-200 rounded px-3 py-2 mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
        maxlength="16" required />

      <button
        class="w-full h-10 bg-slate-800 text-white text-sm rounded px-3 py-2 mb-4 hover:bg-slate-700 transition duration-300">
        Continue
      </button>

      <div class="flex items-center justify-center mb-4">
        <hr class="w-full border-slate-200" />
        <span class="px-2 text-sm text-slate-500 dark:text-gray-200">Or</span>
        <hr class="w-full border-slate-200" />
      </div>

      <!-- Google Login Button -->
      <div class="flex flex-row w-full justify-between">
        <div v-if="user">
          <!-- Hiển thị thông tin người dùng nếu đã đăng nhập -->
          <div class="mt-4 p-4 bg-gray-100 rounded shadow-sm">
            <img :src="user.picture" alt="Avatar" class="w-16 h-16 rounded-full mx-auto" />
            <p class="text-center mt-2 text-lg font-medium">{{ user.name }}</p>
            <p class="text-center text-sm text-gray-600">{{ user.email }}</p>
          </div>
        </div>
        <div v-else>
          <!-- Hiển thị nút Google Login nếu chưa đăng nhập -->
          <GoogleLogin :callback="callback" />
        </div>
     

      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '@/config/axios.js';
import csrf from '@/config/csrf';
import Cookies from 'js-cookie';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { decodeCredential } from 'vue3-google-login';

const user = ref(null);
const router = useRouter(); // Sử dụng router để điều hướng

// Kiểm tra trạng thái đăng nhập khi component được mount
onMounted(() => {
  const token = csrf.getCookie();
  if (token) {
    router.push('/product');
  }
});

const callback = (response) => {

  const userInfo = decodeCredential(response.credential);

  user.value = {
    name: userInfo.name,
    email: userInfo.email,
    avatar: userInfo.picture,
    social_id: userInfo.sub,
  };

  const sendUserInfo = async (userInfo) => {
    try {
      const response = await axios.post('auth/login', userInfo);

      console.log('User info:', response)
      localStorage.setItem('token', response.token)
      router.push('/product');
      location.reload()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  sendUserInfo(user.value)

  
};


</script>

<style>
/* CSS */
</style>
