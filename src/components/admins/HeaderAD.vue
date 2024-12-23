<template>
  <div 
    :class="{'w-[calc(100%-14rem)]': isNavOpen, 'w-[calc(100%-5rem)]': !isNavOpen}" 
    class="flex fixed z-50 justify-between items-center p-2  text-black transition-all duration-300 shadow-bottom"
  >
    <!-- Góc trái: Menu Icon và tìm kiếm -->
    <div class="flex items-center space-x-4">
      <!-- Menu Icon -->
      <div @click="$emit('toggle-menu')" class="ml-4 space-y-1 cursor-pointer text-black">
        <div class="menu"></div>
        <div class="menu"></div>
        <div class="menu"></div>
      </div>
      <div class="flex-row max-w-md mx-auto">
  <!-- Nút tìm kiếm và input tìm kiếm -->
  <div class="flex items-center relative">
    <!-- Nút tìm kiếm -->
    <button @click="toggleSearch" class="p-2 w-12 h-12 items-center justify-center rounded-full hover:bg-white focus:outline-none">
      <i class="bx bx-search icon"></i>
    </button>

    <!-- Input tìm kiếm, hiển thị khi isSearchOpen là true -->
    <div  
      v-if="isSearchOpen"
      class="absolute left-full ml-2 mt-0 w-48 bg-white shadow-md rounded-full z-50 font-roboto"
    >
      <input 
        type="text" 
        placeholder="Tìm kiếm" 
        class="block w-full py-2 px-4 text-left border border-gray-500 rounded-full focus:outline-none"
      />
    </div>
  </div>
</div>
        
    </div>

    <!-- Góc phải: avt, dark, thông báo -->
    <div class="flex items-center space-x-4">
      <!-- dark -->
      <button @click="$emit('toggle-theme')" class="w-10 h-10 rounded-full hover:bg-white">
        <i v-if="isDarkMode" class="bx bx-sun icon"></i>
        <i v-else class="bx bx-moon icon"></i>
      </button>
      <!-- Thoong bao -->
      <button class="w-10 h-10 rounded-full hover:bg-white">
        <i class="bx bx-bell icon "></i>
      </button>
      <!-- avt -->
      <button class="w-10 h-10 rounded-full hover:bg-white">
        <i class='bx bx-user-circle icon'></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isNavOpen: {
      type: Boolean,
      required: true,
    },
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isSearchOpen: false, // Trạng thái mở/đóng menu tìm kiếm
    };
  },
  methods: {
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },
  },
};
</script>

<style scoped>
.menu {
  width: 30px;
  height: 3px;
  background-color: black;
}
.dark .menu{
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Đổ bóng phía dưới */
}
</style>
