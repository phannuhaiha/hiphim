<template>
  <div class="min-h-screen p-6 ">
    <div class="flex flex-col space-y-3 bg-auto rounded shadow p-6">
      <h1 class="text-2xl font-bold dark:text-white">Tài khoản</h1>
      <div class="flex w-full justify-between">
        <div class="flex w-[50%] flex-row space-x-3">
          <button @click="setList('users')" :class="{
            'bg-gray-700 text-white': currentList === 'users',
            'bg-gray-200 text-gray-800 hover:underline': currentList !== 'users'
          }" class="flex rounded-md bg-gray-200 text-gray-800 hover:underline px-4 items-center"> User </button>
          <button @click="setList('admins')" :class="{
            'bg-gray-700 text-white': currentList === 'admins',
            'bg-gray-200 text-gray-800 hover:underline': currentList !== 'admins'
          }" class="flex rounded-md bg-gray-200 text-gray-800 hover:underline px-2 items-center"> Admin </button>
          <input type="text" v-model="searchQuery" placeholder="Search"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />

        </div>
        <button class="flex rounded-md bg-[#2b63b2] text-white items-center px-2 hover:underline">Add admin</button>
      </div>

      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b border-gray-300 dark:bg-slate-700 dark:text-white">
            <th class="px-4 py-2 text-left">Tên</th>
            <th class="px-4 py-2 text-left">Email</th>
            <th class="px-4 py-2 text-center">Số lượng video</th>
            <th class="px-4 py-2 text-center">Tài khoản Premium</th>
            <th class="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="index" class="border-b border-gray-300 dark:text-white">

            <td class="px-4 py-2 flex items-center">
              <!-- <div
                class="w-8 h-8 bg-pink-500 text-black dark:text-white rounded-full flex items-center justify-center font-bold mr-3">
                {{ user.initials }}
              </div> -->
              {{ user.name }}
            </td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2 text-center">{{ user.videos }}</td>
            <td class="px-4 py-2 text-center">
              <span :class="user.premium ? 'text-green' : 'text-red'">
                {{ user.premium == 1 ? user.expired_premium : 'Không' }}
              </span>
            </td>
            <td class="px-4 py-2 text-center">
              <button v-if="user.isBlock == 0" @click="openModal('block',index,user.id)" class="text-red-500 hover:text-red-700">
                <i class="bx bx-lock-open-alt text-2xl"></i>
              </button>
              <button v-else @click="openModal('unblock',index,user.id)" class="text-red-500 hover:text-red-700">
                <i class="bx bx-lock-alt text-2xl text-red"></i>
              </button>

            </td>
          </tr>
        </tbody>
      </table>
      <!-- Modal -->
      <div v-if="typeModal == 'block'" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-lg font-semibold mb-4">Bạn có muốn khóa người dùng này không?</h2>

          <div class="flex justify-end space-x-3">
            <button @click="blockUser()" class="px-4 py-2 bg-rose-500 text-black rounded-lg hover:bg-red-700">
              Có
            </button>
            <button @click="cancelDelete()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Không
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="typeModal == 'unblock'"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-lg font-semibold mb-4">Bạn có muốn mở khóa người dùng này không?</h2>

          <div class="flex justify-end space-x-3">
            <button @click="unBlockUser()" class="px-4 py-2 bg-rose-500 text-black rounded-lg hover:bg-red-700">
              Có
            </button>
            <button @click="cancelDelete()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Không
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
          previous
        </button>
        <div class="flex justify-between space-x-2">
          <button @click="preNumber" class="px-3 py-2  "> &lt; </button>
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
            class="px-3 py-1 rounded hover:bg-blue-100 dark:text-white"
            :class="{ 'bg-blue-500 text-black text-xl font-bold': page === currentPage }">
            {{ page }}
          </button>
          <button @click="nextNumber" class="px-3 py-2  "> &gt; </button>
        </div>
        <button @click="nextPage" class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
          next
        </button>
      </div> -->
      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Previous
        </button>
        <div class="flex justify-between space-x-2">
          <button @click="nextPage" class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import csrf from '@/config/csrf';
import admins from '@/router/admins';
import axios from '@/config/axios';
import { checkAuthAdmin } from '@/config/admin';


let isLocked = false;
let typeModal = false;

export default {
  data() {
    return {
      typeModal: null,
      selectedUserIndex: null,
      currentPage: 1,
      pageSize: 10,
      currentList: 'users',
      paginatedUsers: [],
      users: [],
      admins: [],
      totalUsers: 0,
      totalAdmins: 0,
      user: [],
      searchQuery: '',
      idUserToBlock: null,
    };
  },
  computed: {
    filteredUsers() {
      return this.paginatedUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    openModal(typeModal,index, userID) {
      this.selectedUserIndex = index;
      this.typeModal = typeModal;
      this.idUserToBlock = userID
    },
    nextPage() {
      const totalPages = this.currentList === 'users' ? this.totalUsers : this.totalAdmins;
      if (this.currentPage < Math.ceil(totalPages / this.pageSize)) {
        this.currentPage++;
        this.getUser(this.currentList);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getUser(this.currentList);
      }
    },
    // goToPage(page) {
    //   this.currentPage = page;
    // },
    // nextNumber() {
    //   const maxGroup = Math.ceil(this.totalPages / this.maxVisiblePages) - 1;
    //   if (this.currentPageGroup < maxGroup) {
    //     this.currentPageGroup++;
    //   }
    // },
    // preNumber() {
    //   if (this.currentPageGroup > 0) {
    //     this.currentPageGroup--;
    //   }
    // },
    setList(listType) {
      this.currentList = listType;
      this.getUser(listType);
    },
    async getUser(list) {
      try {
        let response;
        const token = csrf.getCookieAdmin()
        if (list === 'users') {
          response = await axios.get('admin/get-user', {
            params: {
              page: this.currentPage,
              pageSize: this.pageSize,
            },
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          this.users = response.users;
          this.totalUsers = response.totalUsers;
        } else if (list === 'admins') {
          response = await axios.get('admin/get-admin', {
            params: {
              page: this.currentPage,
              pageSize: this.pageSize,
            },
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          this.admins = response.users;
          this.totalAdmins = response.totalUsers;
        }

        this.paginateUsers(list);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    },
    paginateUsers(list) {
      const data = list === 'users' ? this.users : this.admins;
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedUsers = data.slice(start, end);
    },
    setList(list) {
      this.currentList = list;
      this.currentPage = 1; // Reset trang về 1 khi đổi danh sách
      this.getUser(list);
    },
    async blockUser() {
      if (!this.idUserToBlock) return;
      try {
        const token = csrf.getCookieAdmin()
        const response = await axios.get(`admin/block-user/${this.idUserToBlock}`,{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        this.paginatedUsers[this.selectedUserIndex].isBlock = 1;
      } catch (error) {
        console.log(error)
      }finally{
        this.cancelDelete()
      }
    },
    async unBlockUser() {
      if (!this.idUserToBlock) return;
      try {
        const token = csrf.getCookieAdmin()
        const response = await axios.get(`admin/unblock-user/${this.idUserToBlock}`,{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        this.paginatedUsers[this.selectedUserIndex].isBlock = 0;
      } catch (error) {
        console.log(error)
      }finally{
        this.cancelDelete()
      }
    },
    cancelDelete() {
      this.idUserToBlock = null
      this.typeModal = null
      this.selectedUserIndex = null
    },

  },
  async mounted() {
    await this.getUser('users')
    this.user = await checkAuthAdmin()
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
