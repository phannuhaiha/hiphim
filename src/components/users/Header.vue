<template>
  <div class="relative">
    <!-- Header -->
    <div :class="isDarkMode ? 'dark' : ''" 
    class="flex fixed z-50 w-screen justify-between items-center p-2 bg-darkCustom dark:bg-gray-500 text-black dark:text-white shadow-bottom">
      <!-- Góc trái: Menu Icon và Logo -->
      <div class="flex items-center space-x-4">
        <!-- Menu Icon (Hamburger) -->
        <div @click="$emit('toggle-menu')" class="ml-4 space-y-1 cursor-pointer">
          <div class="menu "></div>
          <div class="menu"></div>
          <div class="menu"></div>
        </div>

        <!-- Logo -->
        <router-link to="/product">
          <div class="bg-auto rounded-full py-2 text-white text-4xl font-bold" style="width: 120px; height: 70px;">
            <img src="../icons/Logo.png" class="flex w-full h-full">
          </div>
        </router-link>
      </div>

      <!-- Ở giữa: Thanh tìm kiếm -->
      <div class="flex-grow max-w-md mx-auto">
        <!-- Input tìm kiếm -->
        <div class="flex items-center">
          <input 
            type="text" 
            placeholder="Tìm kiếm" 
            class="w-full py-2 px-4 border border-gray-500 rounded-full focus:outline-none"
          />
          <!-- Nút tìm kiếm -->
          <button class="p-2 w-12 h-12 items-center justify-center rounded-full hover:bg-white focus:outline-none">
            <i class="bx bx-search icon  "></i>
          </button>
        </div>
      </div>

      <!-- Góc phải: Các biểu tượng khác -->
      <div class="flex items-center space-x-4 pr-3">
        <!-- Icon Video -->
        <div class="relative" ref="videoMenu">
          <button @click="toggleVideoMenu" class="w-10 h-10 rounded-full hover:bg-white">
            <i class="bx bx-video icon "></i>
          </button>
          <!-- Dropdown Menu -->
          <div 
            v-if="isVideoMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50 font-roboto">
            <ul class="py-1">
              <!-- Tùy chọn Video trực tuyến -->
              <li>
                <button 
                  @click="handleOnlineVideo"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Video trực tuyến
                </button>
              </li>
              <!-- Tùy chọn Tạo video -->
              <li>
                <router-link 
                  to="/uploadvideo"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Tạo video
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Icon Bell -->
        <button class="w-10 h-10 rounded-full hover:bg-white">
          <i class="bx bx-bell icon "></i>
        </button>

        <!-- Avatar tròn -->
        <router-link to="/login">
          <button class="w-10 h-10 rounded-full hover:bg-white">
            <i class='bx bx-user-circle icon'></i>
          </button>
        </router-link>

        <!-- Nút chuyển đổi giữa chế độ tối và sáng -->
        <button @click="toggleTheme" class=" w-10 h-10 rounded-full hover:bg-white">
          <i v-if="isDarkMode" class="bx bx-sun icon "></i>
          <i v-else class="bx bx-moon icon "></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import 'boxicons/css/boxicons.min.css'; // Import Boxicons
import { RouterLink } from 'vue-router';

export default {
  name: 'Header',
  data() {
    return {
      isDarkMode: false, // Bắt đầu với chế độ sáng
      isNavOpen: false,  // Trạng thái mở/đóng thanh nav
      isVideoMenuOpen: false, // Trạng thái mở/đóng menu Video
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark'); // Thêm chế độ tối
      } else {
        document.documentElement.classList.remove('dark'); // Xóa chế độ tối
      }
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen; // Mở hoặc đóng thanh nav
    },
    toggleVideoMenu() {
      this.isVideoMenuOpen = !this.isVideoMenuOpen; // Mở hoặc đóng menu Video
    },
    handleOnlineVideo() {
      alert('Đang hiển thị Video trực tuyến!');
      this.isVideoMenuOpen = false; // Đóng menu sau khi chọn
    },
    closeVideoMenu(event) {
      // Kiểm tra nếu click bên ngoài menu và nút
      if (this.$refs.videoMenu && !this.$refs.videoMenu.contains(event.target)) {
        this.isVideoMenuOpen = false; // Đóng menu
      }
    },
  },
  mounted() {
    // Lắng nghe sự kiện click toàn cục
    document.addEventListener('click', this.closeVideoMenu);
  },
  beforeUnmount() {
    // Gỡ bỏ sự kiện khi component bị hủy
    document.removeEventListener('click', this.closeVideoMenu);
  },
};
</script>
<style scoped>
/* Dark mode styles */
.dark {
  background-color: #1a202c; /* Dark background */
  color: #f7fafc; /* Light text */
}

/* Dropdown menu */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-md {
  border-radius: 0.375rem;
}

.z-50 {
  z-index: 50;
}

.hover\:bg-gray-100:hover {
  background-color: #f7f7f7;
}
/* nut menu 3 vach */
.menu{
  width: 30px;
  height: 3px;
  background-color: black;
}
.dark .menu{
  background-color: #cac3c3;
}

/* cac icon */
.icon{
  font-family: 'Boxicons'; 
  font-size: 1.875rem; 
  color: inherit; 
  transition: color 0.1s ease-in-out; 
}
.dark .icon{
  color: #cac3c3;
}
.shadow-bottom {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Đổ bóng phía dưới */
}
</style>
