<template>
  <div class="relative">
    <!-- Header -->
    <div :class="isDarkMode ? 'dark' : ''"
      class="flex fixed z-50 w-screen justify-between items-center transition-all duration-300 p-2 bg-white dark:bg-gray-500 text-black dark:text-white shadow-bottom space-x-2">

      <!-- Góc trái: Menu Icon và Logo -->
      <div class="flex flex-row items-center space-x-1 md:space-x-4">
        <!-- Menu Icon (Hamburger) -->
        <div class="sm:block hidden">
          <div @click="$emit('toggle-menu')" class="flex flex-col w-1/5 h-full ml-1 md:ml-4 gap-1 cursor-pointer">
            <i class="bx bx-menu text-xl sm:text-4xl"></i>
          </div>
        </div>

        <router-link to="/product" @click.native="navigateAndReload">
          <div class="sizelogo bg-auto rounded-full py-1 sm:py-2 text-white font-bold">
            <!-- Hiển thị logo khi chưa đăng nhập, avatar khi đã đăng nhập -->
            <img v-if="user && user.premium == 1" src="../icons/LogoPremium.png" class="flex w-full h-full" />
            <img v-else src="../icons/NewLogo.png" class="flex w-full h-full" />
          </div>
        </router-link>
      </div>

      <!-- Thanh tìm kiếm -->
      <div class="flex flex-grow mx-auto items-center">
        <div class="flex w-full px-3 sm:px-10 lg:px-32 items-center justify-center space-x-1">
          <input type="text" placeholder="Tìm kiếm" v-model="searchQuery"
            class="w-full py-0 md:py-2 px-2 md:px-4 border border-gray-500 rounded-full dark:text-black focus:outline-none" />
          <button @click="searchVideo()"
            class="flex p-2 w-4 h-4 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 items-center justify-center rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 focus:outline-none">
            <i class="bx bx-search text-xl sm:text-3xl"></i>
          </button>
        </div>
      </div>

      <!-- Các biểu tượng bên phải -->
      <div class="clearfix gap-3 pr-3 hidden sm:block">
        <!-- Icon Video -->
        <div class="float-left relative sm:mr-3" ref="videoMenu">
          <button @click.stop="toggleVideoMenu" class="w-10 h-10 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800">
            <i class="bx bx-video text-lg sm:text-3xl"></i>
          </button>
          <div v-if="isVideoMenuOpen" @click.stop class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
            <ul class="py-1">
              <li>
                <button @click="handleOnlineVideo"
                  class="block w-full text-left dark:text-black px-4 py-2 hover:bg-gray-100">
                  Video trực tuyến
                </button>
              </li>
              <li>
                <router-link to="/uploadvideo"
                  class="block w-full text-left px-4 dark:text-black py-2 hover:bg-gray-100">
                  Tạo video
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Icon Bell -->
        <div class="float-left sm:mr-3">
          <button class="w-10 h-10 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800">
            <i class="bx bx-bell text-lg sm:text-3xl"></i>
          </button>
        </div>

        <!-- Avatar -->
        <div class="float-left relative sm:mr-3">
          <button @click="handleAvatarClick" class="w-10 h-10 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800">
            <img v-if="user && user.avatar" :src="user.avatar" alt="Avatar" class="w-full h-full rounded-full" />
            <i v-else class="bx bx-user-circle text-lg sm:text-3xl"></i>
          </button>

          <!-- Dropdown menu -->
          <div v-if="user && isAvatarMenuOpen" ref="avatarMenu"
            class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
            <ul class="py-2">
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800">
                <div>{{ user.name }}</div>
                <div class="text-xs text-gray-500">{{ user.email }}</div>
              </li>
              <hr class="my-1" />
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <router-link to="/mychannel">Kênh của bạn</router-link>
              </li>
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <button @click="handleAccount">Tài khoản Google</button>
              </li>
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <button @click="handleSwitchAccount">Chuyển đổi tài khoản</button>
              </li>
              <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <button @click="logout">Đăng xuất</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Chuyển đổi giữa chế độ sáng và tối -->
        <button @click="toggleTheme"
          class="float-left sm:mr-3 w-10 h-10 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800">
          <i v-if="isDarkMode" class="bx bx-sun text-lg sm:text-3xl"></i>
          <i v-else class="bx bx-moon text-lg sm:text-3xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkAuthStatus } from '@/config/auth';
import axios from '@/config/axios.js';
import csrf from '@/config/csrf';
import 'boxicons/css/boxicons.min.css';

export default {
  name: 'Header',
  data() {
    return {
      isDarkMode: false,
      isVideoMenuOpen: false,
      isAvatarMenuOpen: false,
      user: null, // Dữ liệu người dùng
      searchQuery: null,


    };
  },
  methods: {
    navigateAndReload(event) {
      // Ngừng hành động mặc định của router-link
      event.preventDefault();

      // Điều hướng đến /product và reload trang sau khi điều hướng thành công
      this.$router.push('/product').then(() => {
        // Reload trang sau khi đã điều hướng
        window.location.reload();
      }).catch(error => {
        console.error('Navigation failed:', error);
      });
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
    toggleVideoMenu() {
      this.isVideoMenuOpen = !this.isVideoMenuOpen;
    },
    handleAvatarClick(event) {
      // Nếu chưa đăng nhập, chuyển đến trang login
      if (!this.user) {
        this.$router.push({ name: 'login' });
      } else {
        // Đã đăng nhập, mở hoặc đóng menu avatar
        this.isAvatarMenuOpen = !this.isAvatarMenuOpen;
      }
      // Dừng sự kiện để không đóng dropdown khi nhấn vào avatar
      event.stopPropagation();
    },
    closeAllDropdown(event) {
      // Đóng menu video nếu nhấn ngoài menu video
      if (this.$refs.videoMenu && !this.$refs.videoMenu.contains(event.target)) {
        this.isVideoMenuOpen = false;
      }
      // Đóng menu avatar nếu nhấn ngoài menu avatar
      if (this.$refs.avatarMenu && !this.$refs.avatarMenu.contains(event.target)) {
        this.isAvatarMenuOpen = false;
      }
    },
    handleAccount() {
      window.open('https://myaccount.google.com/', '_blank');
    },
    handleSwitchAccount() {
      alert('Tính năng chuyển đổi tài khoản chưa được triển khai.');
    },
    logout() {
      this.user = null;
      location.reload();
      csrf.removeCookie();
    },
    handleOnlineVideo() {
      alert('Đang hiển thị Video trực tuyến!');
      this.isVideoMenuOpen = false;
    },
    async getUserInfo() {
      try {
        const token = csrf.getCookie();
        const response = await axios.get('user/info', {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        this.user = response.data.user;
      } catch (error) {
        console.error(error);
      }
    },
    searchVideo() {
      if (this.searchQuery.trim() != "") {
        window.location.href = `/search/${this.searchQuery}`
      }
    }
  },
  async mounted() {
    this.user = await checkAuthStatus();
    console.log(this.user)
    document.addEventListener("click", this.closeAllDropdown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeAllDropdown);
  },
};
</script>

<style scoped>
.dark {
  background-color: #1a202c;
  color: #f7fafc;
}

.sizelogo {
  width: 80px;
  height: 40px;
}

.searchsize {
  max-width: 250px;
}

/* sm */
@media (min-width: 640px) {
  .menu {
    width: 25px;
    height: 2px;
    background-color: black;
  }

  .sizelogo {
    width: 100px;
    height: 50px;
  }

  .searchsize {
    max-width: 400px;
  }
}

/* md */
@media (min-width: 768px) {
  .menu {
    width: 25px;
    height: 2px;
    background-color: black;
  }

  .sizelogo {
    width: 110px;
    height: 55px;
  }

  .searchsize {
    max-width: 428px;
  }
}

/* lg */
@media (min-width: 1024px) {
  .menu {
    width: 30px;
    height: 3px;
    background-color: black;
  }

  .sizelogo {
    width: 120px;
    height: 60px;
  }

  .searchsize {
    max-width: 448px;
  }
}

.dark .menu {
  background-color: #cac3c3;
}

.dark .icon {
  color: #cac3c3;
}

.shadow-bottom {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
