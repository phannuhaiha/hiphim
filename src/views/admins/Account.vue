<template>
    <div class="min-h-screen p-6 ">
      <div class="flex flex-col space-y-3 bg-auto rounded shadow p-6">
        <h1 class="text-2xl font-bold dark:text-white">Tài khoản</h1>
        <div class="flex w-full justify-between">
          <div class="flex w-[50%] flex-row space-x-3">
            <button @click="setList('users')" 
            :class="{'bg-gray-700 text-white': currentList === 'users',
                   'bg-gray-200 text-gray-800 hover:underline': currentList !== 'users'}"
            class="flex rounded-md bg-gray-200 text-gray-800 hover:underline px-4 items-center" > User </button>
            <button  @click="setList('admins')" 
            :class="{'bg-gray-700 text-white': currentList === 'admins',
                     'bg-gray-200 text-gray-800 hover:underline': currentList !== 'admins'}"
            class="flex rounded-md bg-gray-200 text-gray-800 hover:underline px-2 items-center"> Admin </button>
          <input
            type="text"
            placeholder="Search"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button class="flex rounded-md bg-[#2b63b2] text-white items-center px-2 hover:underline">Add admin</button>
        </div>
        
        <table class="table-auto w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 border-b border-gray-300 dark:bg-slate-700 dark:text-white">
              <th class="px-4 py-2 text-left">Tên</th>
              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-center">Số lượng video</th>
              <th class="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in paginatedUsers"
              :key="index"
              class="border-b border-gray-300 dark:text-white"
            >
              <td class="px-4 py-2 flex items-center">
                <div class="w-8 h-8 bg-pink-500 text-black dark:text-white rounded-full flex items-center justify-center font-bold mr-3">
                  {{ user.initials }}
                </div>
                {{ user.name }}
              </td>
              <td class="px-4 py-2">{{ user.email }}</td>
              <td class="px-4 py-2 text-center">{{ user.videoCount }}</td>
              <td class="px-4 py-2 text-center">
                <button class="text-blue mr-2">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="text-red hover:text-red">
                  <i class="bx bx-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between items-center mt-4">
          <button
            @click="prevPage"
            class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            previous
          </button>
          <div class="flex justify-between space-x-2">
            <button @click="preNumber"
            class="px-3 py-2  "> &lt; </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              class="px-3 py-1 rounded hover:bg-blue-100 dark:text-white"
              :class="{'bg-blue-500 text-black text-xl font-bold': page === currentPage}"
            >
              {{ page }}
            </button>
            <button @click="nextNumber"
            class="px-3 py-2  "> &gt; </button>
          </div>
          <button
            @click="nextPage"
            class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import admins from '@/router/admins';

  export default {
    data() {
        return {
      users: Array.from({ length: 50 }, (_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        videoCount: Math.floor(Math.random() * 100),
        initials: `U${i + 1}`,
      })),
      admins: Array.from({ length: 50 }, (_, i) => ({
        name: `Admin ${i + 1}`,
        email: `admin${i + 1}@example.com`,
        videoCount: Math.floor(Math.random() * 100),
        initials: `U${i + 1}`,
      })),
      currentPage: 1,
      itemsPerPage: 5,
      maxVisiblePages: 5, 
      currentPageGroup: 0,
      currentList:'users',
      
    };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.users.length / this.itemsPerPage);
      },
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this[this.currentList].slice(start, end);
      },
      visiblePages() {
        const startPage = this.currentPageGroup * this.maxVisiblePages + 1;
      const endPage = Math.min(
        startPage + this.maxVisiblePages - 1,
        this.totalPages
      );
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
    },
    methods: {
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
        if (
        this.currentPage >
        (this.currentPageGroup + 1) * this.maxVisiblePages
      ) {
        this.nextNumber();
      }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
        if (
        this.currentPage <=
        this.currentPageGroup * this.maxVisiblePages
      ) {
        this.preNumber();
      }
      },
      goToPage(page) {
        this.currentPage = page;
      },
      nextNumber() {
      const maxGroup = Math.ceil(this.totalPages / this.maxVisiblePages) - 1;
      if (this.currentPageGroup < maxGroup) {
        this.currentPageGroup++;
      }
    },
    preNumber() {
      if (this.currentPageGroup > 0) {
        this.currentPageGroup--;
      }
    },
    setList(listType) {
      this.currentList = listType; 
      this.currentPage = 1; 
      this.currentPageGroup = 0; 
    },
    },
  };
  </script>
  
  <style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
  </style>
  