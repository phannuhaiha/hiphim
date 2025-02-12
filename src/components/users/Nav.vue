<template>
  <div 
    :class="[isDarkMode ? 'bg-gray-800' : 'bg-white']"
    class="fixed z-40 w-50 top-16 h-full items-center  text-black transition-all duration-300 ease-in-out p-3 ">
     
    <div class="flex flex-col w-full space-y-2">

      <!-- Trang Chủ -->
      <RouterLink to="/product">
        <button  class="navmenu h-16 flex-row space-x-2">
        <i class="bx bx-home-alt icon text-3xl"></i>
        <span  class="text-short text-[18px] hover:underline">Trang chủ</span>
      </button>
      </RouterLink>
    
      <!-- Kênh Đăng Ký -->
      <router-link to="/subscription">
        <button  class="navmenu h-16 flex-row space-x-2">
        <i  class="bx bx-slideshow icon text-3xl"></i>
        <span  class="text-short text-[18px] hover:underline">Kênh đăng ký</span>
      </button>
      </router-link>
      
      <!-- Phim Bộ -->
       <router-link to="/series">
        <button  class="navmenu h-16 flex-row space-x-2">
        <i  class="bx bx-movie icon text-3xl"></i>
        <span  class="text-short text-[18px] hover:underline">Phim bộ</span>
      </button>
       </router-link>
      

      <!-- Cài Đặt -->
       <router-link>
        <button  class="navmenu h-16 flex-row space-x-2">
        <i class="bx bx-cog icon text-3xl"></i>
        <span  class="text-short text-[18px] hover:underline" >Cài đặt</span>
      </button>

       </router-link>
      

      <!-- NỘI DUNG THÊM KHI NAV MỞ -->
      <div v-if="isOpen">
        <div class="flex flex-col space-y-2 ">
          <!-- Phim Đã Xem -->
           <router-link to="/watched">
            <button class="navmenu space-x-2 h-16 ">
            <i class="bx bx-repost icon text-3xl"></i>
            <span class="text-short text-[18px] hover:underline">Phim đã xem</span>
          </button>
           </router-link>
          

          <!-- Kênh đã thích -->
          <button class="navmenu space-x-2 h-16 ">
            <i class="bx bx-like icon text-3xl"></i>
            <span class="text-short text-[18px] hover:underline">Kênh đã thích</span>
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
      default: true, // Thanh nav bắt đầu ở trạng thái đóng
    },
    isDarkMode: {
      type: Boolean,
      default: false, // Trạng thái Dark Mode
    }
  },
  data() {
    return {
      isSmallScreen: false, 
    };
  },
  methods: {
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth < 640; // Kiểm tra kích thước màn hình nhỏ hơn sm
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  
};
</script>

<style scoped>
/* Các style bổ sung nếu cần */
.navmenu{
display: flex;
width: 100%;

align-items: center;
background-color: auto;
border-radius: 0.125rem;
transition: background-color 0.3s ease-in-out;
}

.dark .navmenu{
color: #ededed;
}
.icon {
font-family: 'Boxicons'; 
 
color: inherit; 
transition: color 0.3s ease-in-out; 
}

.dark .icon {
color: #ededed; 
}

.text-short {
white-space: nowrap; 
overflow: hidden; 
text-overflow: ellipsis; 
font-family: 'Roboto';
}
.shadow-right{
box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);

}


</style>
