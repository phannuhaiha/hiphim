<template>
    <div class="sm:hidden block">
        <div class="fixed bottom-0 left-0 w-full bg-white shadow-md border-t  p-2">
            <div class="flex flex-row space-x-2 justify-between">
                <router-link to="/product" class="w-[25%]">
                <div class="flex flex-col space-y-1 text-black  items-center ">
                   <i  class="bx bx-home text-2xl"></i>
                   <span class="text-sm text-black font-roboto">Trang chủ</span>
            </div>
            </router-link>
                
            <Router-link to="/subscription" class="w-[26%]">
                <div class="flex flex-col space-y-1 text-black  items-center ">
            <i  class="bx bx-play-circle text-2xl"></i>
            <span class="text-sm text-black font-roboto">Kênh đăng kí</span>
        </div>
            </Router-link>

            <Router-link to="/series" class="w-[25%]">
                <div class="flex flex-col space-y-1 text-black  items-center ">
            <i  class="bx bx-book text-2xl"></i>
            <span class="text-sm text-black font-roboto">Phim lẻ</span>
        </div>
            </Router-link>

            <button
             @click="handleClick" class="w-[24%]">
            <div class="flex flex-col space-y-1 text-black  items-center ">
                <i  class="bx bx-user-circle  text-2xl"></i>
                <span class="text-sm text-black font-roboto">Bạn</span>
            </div>
        </button>
            </div> 
    </div></div>
    
  </template>
  
  <script>
  
  export default {
    computed: {
    isLoggedIn() {
      return localStorage.getItem("token") !== null; // Kiểm tra xem token có tồn tại không
    }
  },
  methods: {
    handleClick() {
      this.$router.push(this.isLoggedIn ? "/mychannel" : "/login");
    }
  }
  };
  </script>
  
  <style>
  /* Nếu cần thêm style tùy chỉnh */
  </style>
  