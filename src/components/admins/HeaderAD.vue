<template>
  <div
    class=" flex w-[calc(100%-12rem)] fixed z-50 justify-between  p-2 text-black transition-all duration-300 shadow-bottom">
    <!-- Góc trái: Menu Icon và tìm kiếm -->
    <div class="flex items-center space-x-4">
      <!-- Menu Icon -->
      <!-- <div @click="$emit('toggle-menu')" class="ml-4 space-y-1 cursor-pointer text-black">
        <div class="menu"></div>
        <div class="menu"></div>
        <div class="menu"></div>
      </div> -->


    </div>

    <!-- Góc phải: avt, dark, thông báo -->
    <div class="flex items-center space-x-4">
      <!-- dark -->
      <!-- <button @click="$emit('toggle-theme')" class="w-10 h-10 rounded-full hover:bg-white">
        <i v-if="isDarkMode" class="bx bx-sun icon"></i>
        <i v-else class="bx bx-moon icon"></i>
      </button> -->

      <!-- avt -->

      <div class="relative" ref="Avt">
        <button @click="toggleAvt" class="w-10 h-10 rounded-full hover:bg-white">
          <i class="bx bx-user-circle icon "></i>
        </button>
        <!-- Dropdown Menu -->
        <div v-if="isAvtOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50 font-roboto">
          <ul class="py-1">
            <!-- Tùy chọn Video trực tuyến -->
            <!-- <li>
              <router-link to="/admin/loginAD">
                <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Đăng nhập tài khoản
                </button>
              </router-link>

            </li> -->
            <!-- Tùy chọn Tạo video -->
            <li v-if="user != null">
              <button @click="logout()" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import csrf from '@/config/csrf';
import axios from '@/config/axios';
import { checkAuthAdmin } from '@/config/admin';
import router from '@/router';

export default {
  props: {

    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isAvtOpen: false,
      user: null,

    };
  },
  methods: {
    toggleAvt() {
      this.isAvtOpen = !this.isAvtOpen;
    },

    logout() {
      csrf.removeCookieAdmin()
      router.push('/admin/login')
    },

  },
  async mounted() {
    const token = csrf.getCookieAdmin()
    if(token){
      this.user = await checkAuthAdmin()
    }
  },


};
</script>

<style scoped>
.menu {
  width: 30px;
  height: 3px;
  background-color: black;
}

.dark .menu {
  background-color: #cac3c3;
}

.icon {
  font-family: 'Boxicons';
  font-size: 1.875rem;
  color: inherit;
  transition: color 0.1s ease-in-out;
}

.dark .icon {
  color: #cac3c3;
}

.shadow-bottom {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* Đổ bóng phía dưới */
}
</style>
