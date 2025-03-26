<template>
  <div :class="{'dark': isDarkMode}" class="min-h-screen flex flex-col ">
    <!-- Header -->
    <Header 
     
      @toggle-theme="toggleTheme" 
      :isDarkMode="isDarkMode" 
    />

    <!-- Nội dung chính: Flex Row để căn Nav và RouterView cạnh nhau -->
    <div class="flex flex-row flex-grow mt-16 transition-all duration-300 dark:bg-gray-800">
      <!-- Menu Drawer (Nav) -->
      <div 
      :class="{ 'hidden': route.name === 'detail' }"
        class="h-full sm:z-40 sm:w-52 z-[-1]  bg-gray-300 dark:bg-gray-900 transition-all duration-300"
      >
        <Nav  :isDarkMode="isDarkMode" class="dark:bg-gray-800" />
      </div>
      
      <!-- Nội dung chính (được render thông qua RouterView) -->
      <div 
      
        class="flex-grow w-full max-w-screen bg-white dark:bg-gray-900 sm:py-3  transition-all duration-300"
      >
        <RouterView  :isDarkMode="isDarkMode" />
      </div>
    </div>
    <!-- footer -->
    <Footer
    @toggle-theme="toggleTheme" 
    :isDarkMode="isDarkMode"/>
  </div>
</template>

<script> 
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';
import Header from '@/components/users/Header.vue';
import Nav from '@/components/users/Nav.vue';
import Footer from '@/components/users/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Nav,
    Footer,
  },
  data() {
    return {
      isNavOpen: true,  // Trạng thái mở/đóng của menu Nav
      isDarkMode: false, // Trạng thái chế độ sáng/tối
    };
  },
  setup() {
    const route = useRoute(); // Lấy thông tin route hiện tại
    return { route };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen; // Đảo ngược trạng thái khi nhấn vào nút
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode; // Đổi trạng thái sáng/tối
    },
  },
};
</script>

<style scoped>
/* Header */
header {
  background-color: #f8f8f8;
  z-index: 50;
}

/* Nav */
nav {
  height: 100%; /* Đảm bảo Nav chiếm toàn bộ chiều cao */
}

/* Flexbox */
.flex {
  display: flex;
}

.flex-row {
  flex-grow: 11;
}

.flex-col {
  flex-direction: column;
}

/* Transition để tạo hiệu ứng mượt mà */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Đặt chiều rộng cho Nav khi mở và đóng */
.w-64 {
  width: 16rem; /* Nav mở rộng */
}

.w-20 {
  width: 5rem; /* Nav thu gọn */
}
/* Căn chỉnh lại khoảng cách của nội dung chính phía dưới header */
.mt-16 {
  margin-top: 4rem; /* Chừa khoảng cách cho header (khoảng 64px) */
}


</style>
