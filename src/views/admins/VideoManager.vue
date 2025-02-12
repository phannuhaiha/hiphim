<template>
  <div class="min-h-screen p-6">
    <div class="flex flex-col space-y-3 bg-auto rounded shadow p-6">
      <h1 class="text-2xl font-bold dark:text-white">Nội dung</h1>
      <div class="flex w-[50%]">
        <input
          type="text"
          placeholder="Search"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="w-full bg-gray-100 border-b border-gray-300 dark:bg-slate-700 dark:text-white">
            <th class="w-[1%] p-2 text-left">STT</th>
            <th class="w-[10%] p-2 text-left ">Thumbnail</th>
            <th class="w-[30%] p-2 text-left">Mô tả video</th>
            <th class="w-[15%] p-2 text-left">Thời gian đăng</th>
            <th class="w-[10%] p-2 text-left">Tác giả</th>
            <th class="w-[10%] p-2 text-left">Trạng thái</th>
            <th class="w-[15%] p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="index" class="border-b border-gray-300 dark:text-white">
            <td class="w-[1%] p-2 items-center">{{ user.stt }}</td>
            <td class="w-[10%] p-2">{{ user.thumbnail }}</td>
            <td class="w-[30%] p-2 text-left">
              <div class="flex w-full flex-col space-y-2">
                <span class="flex w-[390px] font-bold text-base overflow-hidden whitespace-nowrap overflow-ellipsis">{{ user.name }}</span>
                <span class="flex text-sm w-[390px]  whitespace-nowrap overflow-ellipsis overflow-hidden">{{ user.detail }}</span>
              </div>
            </td>
            <td class="w-[15%] p-2 text-left over">{{ user.time }}</td>
            <td class="w-[10%] p-2 text-left">{{ user.author }}</td>
            <!-- statusauto -->
            <td class="w-[10%] p-2 text-left"
            :class="{
              ' text-yellow': user.status === 'Chờ xét duyệt',
              ' text-red': user.status === 'Không được duyệt',
              'b text-green': user.status === 'Đăng thành công',
             }"
            >{{ user.status }}</td>
            <!-- statusremote -->
            <td class="w-[15%] p-2 text-center">
                <div class="flex flex-row space-x-3 w-[80%]">
                    <select
                v-model="user.tempStatus"
                @change="confirmStatusChange(user)"   
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="Chờ xét duyệt" class="text-blue">Chờ xét duyệt</option>
                <option  value="Đăng thành công" class="text-green">Đăng thành công</option>
                <option value="Không được duyệt" class="text-red">Không được duyệt</option>
              </select>
              <button @click="deleteUser(index)" class="text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
              </button>
                </div>
               <!-- Modal -->
      <div v-if="showConfirmModal" class="fixed inset-0 z-2025 flex items-center justify-center border-2 border-gray-800 shadow">
        <div class="bg-white p-6 rounded-md shadow-md">
          <p>Bạn có chắc muốn thay đổi không?</p>
          <div class="flex justify-between space-x-4 mt-4">
            <button @click="applyChange" class="px-4 py-2 bg-green text-white rounded">Có</button>
            <button @click="cancelChange" class="px-4 py-2 bg-red text-white rounded">Không</button>
          </div>
        </div>
      </div>      
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">previous</button>
        <div class="flex justify-between space-x-2">
          <button @click="preNumber" class="px-3 py-2">&lt;</button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 rounded hover:bg-blue-100 dark:text-white"
            :class="{'bg-blue-500 text-black text-xl font-bold': page === currentPage}"
          >
            {{ page }}
          </button>
          <button @click="nextNumber" class="px-3 py-2">&gt;</button>
        </div>
        <button @click="nextPage" class="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "index"],
  data() {
    return {
      users: JSON.parse(localStorage.getItem("users")) || Array.from({ length: 50 }, (_, i) => ({
        stt: `${i + 1}`,
        thumbnail: `thumbnail${i + 1}`,
        name: `Tên Video ${i + 1}`,
        detail: `Đây là video chíu híu chi chic đó á hhaa haha haha ahah hah ahahahah ah ahah ah    ${i + 1}`,
        time: this.getRandomDateTime(new Date(2020, 0, 1), new Date(2025, 0, 1)),
        author:`Tên tac gia ${i + 1}`,
        status: "Chờ xét duyệt",
        tempStatus: "Chờ xét duyệt",
        
      })),
      currentUser: null,
      showConfirmModal: false, // Hiển thị modal
      
      currentPage: 1,
      itemsPerPage: 5,
      maxVisiblePages: 5,
      currentPageGroup: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.users.slice(start, start + this.itemsPerPage);
    },
    visiblePages() {
      const startPage = this.currentPageGroup * this.maxVisiblePages + 1;
      const endPage = Math.min(startPage + this.maxVisiblePages - 1, this.totalPages);
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    getRandomDate(start, end) {
      const startTime = start.getTime();
      const endTime = end.getTime();
      const randomTime = Math.floor(Math.random() * (endTime - startTime)) + startTime;
      return new Date(randomTime);
    },
    getRandomDateTime(start, end) {
      const randomDate = this.getRandomDate(start, end);
      const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0'); // Giờ: 0-23
      const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0'); // Phút: 0-59
      const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0'); // Giây: 0-59
      return `${hours}:${minutes}:${seconds} ${randomDate.toLocaleDateString()} `;
    },
    deleteUser(index) {
      this.users.splice(index, 1);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      if (this.currentPage > (this.currentPageGroup + 1) * this.maxVisiblePages) {
        this.nextNumber();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      if (this.currentPage <= this.currentPageGroup * this.maxVisiblePages) {
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
    confirmStatusChange(user) {
      this.currentUser = user; 
      this.showConfirmModal = true; 

    },
    applyChange() {
      if (this.currentUser) {
        this.currentUser.status = this.currentUser.tempStatus; 
        this.currentUser.tempStatus = ""; 
        localStorage.setItem("users", JSON.stringify(this.users));
      }
      this.showConfirmModal = false; 
      this.currentUser = null; 
    },
    cancelChange() {
      if (this.currentUser) {
        this.currentUser.tempStatus = this.currentUser.status; 
      }
      this.showConfirmModal = false; 
      this.currentUser = null; 
    },
    deleteUser(index) {
      const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
      this.users.splice(globalIndex, 1); 
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    getRandomDateTime(start, end) {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().slice(0, 16).replace("T", " ");
    },
   
    
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
