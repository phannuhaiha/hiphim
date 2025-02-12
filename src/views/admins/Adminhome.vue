<template>
  <div :class="{'dark': isDarkMode}" class="min-h-screen flex flex-row">
    <!-- Container chính -->
    <div class="flex flex-row flex-grow transition-all duration-300 dark:bg-gray-500">
      <!-- Nav -->
      <div 
        :class="{'w-48': isNavOpen, 'w-20': !isNavOpen}" 
        class="h-full bg-gray-300 dark:bg-gray-900 transition-all duration-300"
      >
        <Nav :isOpen="isNavOpen" :isDarkMode="isDarkMode" class="dark:bg-gray-800" />
      </div>
      <!-- Nội dung chính bên phải Nav -->
    <div class="flex flex-col flex-grow">
      <!-- Header -->
        <Header 
          @toggle-menu="toggleNav" 
          @toggle-theme="toggleTheme" 
          :isDarkMode="isDarkMode"
          :isNavOpen="isNavOpen"
        />
      

      <!-- Nội dung chính -->
      <div class="flex-grow  pt-16 bg-white dark:bg-gray-900 transition-all duration-300">
        <RouterView :isNavOpen="isNavOpen" :isDarkMode="isDarkMode"/>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from "@/components/admins/HeaderAD.vue";
import Nav from "@/components/admins/NavAD.vue";

export default {
 name: 'admin-home',
 components: {
   Header,
   Nav,
 },
 data() {
   return {
     isNavOpen: true,  
     isDarkMode: false, 
   };
 },
 methods: {
   toggleNav() {
     this.isNavOpen = !this.isNavOpen; 
   },
   toggleTheme() {
     this.isDarkMode = !this.isDarkMode; 
   },
 },
};
</script>

<style>
/* CSS không thay đổi */
</style>
