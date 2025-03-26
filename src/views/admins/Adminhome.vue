<template>
  <div  class="min-h-screen flex flex-row">
    <!-- Container chính -->
    <div class="flex flex-row flex-grow transition-all duration-300 dark:bg-gray-500">
      <!-- Nav -->
      <div 
        
        class="h-full w-48 bg-gray-300 dark:bg-gray-900 transition-all duration-300"
      >
        <Nav class="dark:bg-gray-800" />
      </div>
      <!-- Nội dung chính bên phải Nav -->
    <div class="flex flex-col flex-grow">
      <!-- Header -->
        <Header 
          @toggle-menu="toggleNav" 
          @toggle-theme="toggleTheme" 
          
        />
      

      <!-- Nội dung chính -->
      <div class="flex-grow  pt-16 bg-white dark:bg-gray-900 transition-all duration-300">
        <RouterView />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from "@/components/admins/HeaderAD.vue";
import Nav from "@/components/admins/NavAD.vue";
import { checkAuthAdmin } from '@/config/admin';
import router from '@/router';

export default {
 name: 'admin-home',
 components: {
   Header,
   Nav,
 },
 data() {
   return {
    //  isNavOpen: false,  
    //  isDarkMode: false,
    user: [],

   };
 },
 methods: {
  //  toggleNav() {
  //    this.isNavOpen = !this.isNavOpen; 
  //  },
  //  toggleTheme() {
  //    this.isDarkMode = !this.isDarkMode; 
  //  },
 },
 async mounted(){
  this.user = await checkAuthAdmin()
 }
};
</script>

<style>
/* CSS không thay đổi */
</style>
