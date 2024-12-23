<template>
  <div
    :class="[isOpen ? 'w-50' : 'w-17', isDarkMode ? 'bg-gray-800' : 'bg-slate-100']"
    class="fixed text-black min-h-screen transition-all duration-300 ease-in-out p-3 shadow-right">
     
    <div class="flex flex-col space-y-5">

      <!-- Trang Chủ -->
      <RouterLink to="/product">
        <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu ">
        <i class="bx bx-home-alt icon"></i>
        <span :class="isOpen ? '':'text-xs'" class="text-short ">Trang chủ</span>
      </button>
      </RouterLink>
    
      <!-- Kênh Đăng Ký -->
      <router-link to="/subscription">
        <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu">
        <i  class="bx bx-slideshow icon"></i>
        <span :class="isOpen ? 'w-13':'w-12 text-xs'" class="text-short">Kênh đăng ký</span>
      </button>
      </router-link>
      
      <!-- Phim Bộ -->
      <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu">
        <i  class="bx bx-movie icon"></i>
        <span :class="isOpen ? 'w-13':'w-12 text-xs'" class="text-short">Phim bộ</span>
      </button>

      <!-- Cài Đặt -->
      <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1' " class="navmenu">
        <i class="bx bx-cog icon"></i>
        <span :class="isOpen ? 'w-13':'w-12 text-xs'" class="text-short" >Cài đặt</span>
      </button>

      <!-- NỘI DUNG THÊM KHI NAV MỞ -->
      <div v-if="isOpen">
        <div class="flex flex-col space-y-6 ">
          <!-- Phim Đã Xem -->
          <button class="navmenu space-x-2">
            <i class="bx bx-repost icon"></i>
            <span>Phim đã xem</span>
          </button>

          <!-- Kênh đã thích -->
          <button class="navmenu space-x-2">
            <i class="bx bx-like icon "></i>
            <span>Kênh đã thích</span>
          </button>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  name: 'Nav',
  props: {
    isOpen: {
      type: Boolean,
      default: false, // Thanh nav bắt đầu ở trạng thái đóng
    },
    isDarkMode: {
      type: Boolean,
      default: false, // Trạng thái Dark Mode
    }
  },
  
};
</script>

<style scoped>
/* Các style bổ sung nếu cần */
.navmenu{
display: flex;
width: 100%;
height: 50px;
align-items: center;
background-color: auto;
border-radius: 0.125rem;
transition: background-color 0.1s ease-in-out;
}
.navmenu:hover{
background-color: #969ca5;
}
.dark .navmenu{
color: #ededed;
}
.icon {
font-family: 'Boxicons'; 
font-size: 1.875rem; 
color: inherit; 
transition: color 0.1s ease-in-out; 
}

.dark .icon {
color: #ededed; 
}

.text-short {
height: 1.5rem; 
white-space: nowrap; 
overflow: hidden; 
text-overflow: ellipsis; 
font-family: 'Roboto';
}
.shadow-right{
box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
}

</style>
