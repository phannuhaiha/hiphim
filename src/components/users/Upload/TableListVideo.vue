<template>
  <div class="w-full">
    <table class="w-full border-collapse border border-gray-300 text-left text-sm">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-4 py-2 text-center">STT</th>
          <!-- <th class="border border-gray-300 px-4 py-2 text-center">PLAY LIST</th> -->
          <th class="border border-gray-300 px-4 py-2 text-center">VIDEO</th>
          <!-- <th class="border border-gray-300 px-4 py-2 text-center">QUYỀN RIÊNG TƯ</th> -->
          <th class="border border-gray-300 px-4 py-2 text-center">SỐ LƯỢT XEM</th>
          <!-- <th class="border border-gray-300 px-4 py-2 text-center">LIKE/DISLIKE</th> -->
          <th class="border border-gray-300 px-4 py-2 text-center">TRẠNG THÁI</th>
          <th class="border border-gray-300 px-4 py-2 text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in videos" :key="index" class="hover:bg-gray-100">
          <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
          <!-- <td class="border border-gray-300 px-4 py-2">{{ row.playlist }}</td> -->
          <td class="border border-gray-300 px-4 py-2 flex items-center">
            <img :src="row.thumbnail" class="w-16 h-12 bg-gray-300 mr-2" />
            <div>
              <p class="font-bold">{{ row.title }}</p>
              <!-- <p class="text-gray-500 text-xs">{{ row.url }}</p> -->
            </div>
          </td>
          <!-- <td class="border border-gray-300 px-4 py-2"
          :class="{
              ' text-rose-950': row.privacy === 'Chỉ mình tôi',
              ' text-blue': row.privacy === 'Công khai',
             }"
          >
            <select
                v-model="row.privacy"
                @change="updatePrivacy(row)"   
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue sm:text-sm"
              >
                <option value="Chỉ mình tôi" class=" text-black">Chỉ mình tôi</option>
                <option  value="Công khai" class="text-black">Công khai</option>
                                
              </select>
          </td> -->
          <td class="border border-gray-300 px-4 py-2">{{ row.view }}</td>
          <!-- <td class="border border-gray-300 px-4 py-2">{{ row.likes }}/{{ row.dislikes }}</td> -->
          <td class="border border-gray-300 px-4 py-2">
            <span :class="row.statusClass" class="px-2 py-1 text-xs font-bold rounded">
              {{ row.status }}
            </span>
          </td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            <button class="text-blue-500 hover:text-blue-700 mr-2" title="Chỉnh sửa">
                  <i class="bx bx-edit"></i>
                </button>
            <button @click="showModal(index,row.slug)" title="Xóa vĩnh viễn">
              <i class="bx bx-trash text-rose-500"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-md shadow-md">
        <p>Bạn có chắc muốn xóa vĩnh viễn không?</p>
        <div class="flex justify-between space-x-4 mt-4">
          <button @click="applyDelete" class="px-4 py-2 bg-green text-black rounded">Có</button>
          <button @click="cancelDelete" class="px-4 py-2 bg-red text-black rounded">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/config/axios.js';
import csrf from '@/config/csrf';

export default {
  props:{
    videos: {
    type: Array,
    required: true,
    default: () => [],
  },
  },
  data() {
    return {
      rows: this.videos,
      showConfirmModal: false,
      rowToDelete: null,
      slugDeleteVideo: null,
    };
  },
  methods: {
    confirmStatusChange(user) {
      this.currentUser = user; 
      this.showConfirmModal = true; 
    },
    showModal(index,slug) {
      this.rowToDelete = index;
      this.showConfirmModal = true;
      this.slugDeleteVideo = slug
    },
    async applyDelete() {
      if (!this.slugDeleteVideo) return;
      try {
        const token = csrf.getCookie();
        const response = await axios.get(`video/delete/${this.slugDeleteVideo}`,{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        console.log(response)
        // if (this.rowToDelete !== null) {
        //   this.rows.splice(this.rowToDelete, 1); // Xóa hàng
        //   this.rowToDelete = null;
        // }
        // this.showConfirmModal = false;
        if (this.rowToDelete !== null) {
          this.videos.splice(this.rowToDelete, 1);
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.cancelDelete()
      }
    },
    cancelDelete() {
      this.rowToDelete = null;
      this.slugDeleteVideo = null
      this.showConfirmModal = false;
    },
    updatePrivacy(row) {
      
      row.privacyClass =
        row.privacy === "Công khai"
          ? "bg-lime-500 text-black"
          : "bg-gray-100 text-blue";

      
      localStorage.setItem("rows", JSON.stringify(this.rows));
    },
  },
};
</script>
