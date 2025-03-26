<template>
  <div class="w-full">
    <table class="w-full border-collapse border border-gray-300 text-left text-sm">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-400">
          <th class="border border-gray-300 px-2 py-2 text-center w-[5%]">STT</th>
          <th class="border border-gray-300 px-2 py-2 text-center w-[27%]">VIDEO</th>
          <th class="border border-gray-300 px-2 py-2 text-center w-[27%]">MÔ TẢ</th>
          <th class="border border-gray-300 px-2 py-2 text-center w-[7%]">TRẠNG THÁI</th>
          <th class="border border-gray-300 px-2 py-2 text-center w-[13%]">SỐ LƯỢT XEM</th>
          <th class="border border-gray-300 px-2 py-2 text-center w-[13%]">CHẾ ĐỘ XEM</th>
          <th class="border border-gray-300 px-2 py-2 text-center w-[8%]"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in videos" :key="index" class="hover:bg-gray-100 dark:bg-gray-200">
          <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>

          <!-- THUMBNAIL + TIÊU ĐỀ -->
          <td class="border border-gray-300 px-4 py-2 flex items-center">
            <img :src="row.thumbnail" class="w-[80px] h-[60px] bg-gray-300 mr-2 rounded-md" />

            <!-- title -->
            <div v-if="editIndex !== index">
              <p class="font-bold line-clamp-2 overflow-hidden text-ellipsis">{{ row.title }}</p>
            </div>
            <input v-else v-model="editVideo.title" class="border border-gray-300 px-2 py-1 " />
          </td>

          <!-- MÔ TẢ -->
          <td class="border border-gray-300 px-4 py-2">
        <div class="flex items-center justify-between w-full space-x-2">
          <p v-if="editIndex !== index" 
            class="flex-1 text-sm text-gray-500 break-words line-clamp-2 text-ellipsis overflow-hidden font-roboto">
            {{ row.description }}
          </p>

          <input v-else v-model="editVideo.description" class="flex-1 text-sm text-gray-500 line-clamp-2 text-ellipsis overflow-hidden font-roboto px-2 py-1 w-full" />
          
        </div>
        </td>
        <!-- trang thai -->
        <td class="border border-gray-300 px-4 py-2">
          <div class="items-center justify-between w-full" >
           <div v-if="row.verified_status == 0" class="px-3 py-1 text-white text-sm rounded-md bg-red shrink-0 whitespace-nowrap">Chưa duyệt</div>
           <div v-else class="px-3 py-1 text-white text-sm rounded-md bg-green shrink-0 whitespace-nowrap">Đã duyệt</div>
           </div>
        </td>

          <!-- LƯỢT XEM -->
          <td class="border border-gray-300 px-4 py-2 text-center">
            {{ row.view }}
          </td>

          <!-- CHE DO XEM VIDEO -->
          <td class="border border-gray-300 px-4 py-2 text-center">
            <span v-if="editIndex !== index" :class="row.statusClass" class="px-2 py-1 text-xs font-bold rounded">
              {{ row.status == 'public' ? 'Công khai' : 'Riêng tư' }}
            </span>
            <select v-else v-model="editVideo.status" class="border border-gray-300 px-2 py-1 w-full" :class="{
              'text-black dark:text-gray-300': editVideo.status === 'public',
              'text-red bg-gray-100': editVideo.status === 'private'
            }">
              <option value="public">Công khai</option>
              <option value="private">Riêng tư</option>
            </select>
          </td>

          <!-- ACTION -->
          <td class="border border-gray-300 px-4 py-2 text-center">
            <button v-if="editIndex !== index" @click="openEditModal(index, row)" class="text-[#2d24cc] mr-2"
              title="Chỉnh sửa">
              <i class="bx bx-edit"></i>
            </button>

            <button v-else @click="saveChanges(index,row.slug)" class="text-green hover:text-[#185416] mr-2"
              title="Lưu thay đổi">
              <i class="bx bx-check"></i>
            </button>

            <button v-if="editIndex === index" @click="cancelEdit" class="text-gray-500 hover:text-black" title="Hủy">
              <i class="bx bx-x"></i>
            </button>

            <button @click="showModal(index, row.slug)" title="Xóa vĩnh viễn">
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
          <button @click="applyDelete()" class="px-4 py-2 bg-green text-black rounded">Có</button>
          <button @click="cancelDelete()" class="px-4 py-2 bg-red text-black rounded">Không</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/config/axios.js';
import csrf from '@/config/csrf';

export default {
  props: {
    videos: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      editIndex: null,
      editVideo: {},
      rows: this.videos,
      showConfirmModal: false,
      rowToDelete: null,
      slugDeleteVideo: null,
    };
  },
  methods: {
    openEditModal(index, video) {
      this.editIndex = index;
      this.editVideo = JSON.parse(JSON.stringify(video)); // Sao chép dữ liệu để chỉnh sửa
    },
    saveChanges(index,slug) {
      if (this.editIndex !== null) {
        this.videos[index] = { ...this.editVideo };
        this.changeInfoVideo(slug)
      }
      this.editIndex = null;
    },
    cancelEdit() {
      this.editIndex = null;
      this.editVideo = {};
    },
    confirmStatusChange(user) {
      this.currentUser = user;
      this.showConfirmModal = true;
    },
    showModal(index, slug) {
      this.rowToDelete = index;
      this.showConfirmModal = true;
      this.slugDeleteVideo = slug
    },
    async applyDelete() {
      if (!this.slugDeleteVideo) return;
      try {
        const token = csrf.getCookie();
        const response = await axios.get(`video/delete/${this.slugDeleteVideo}`, {
          headers: {
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
        console.log("Lỗi khi xóa video:", error);
      } finally {
        this.cancelDelete()
      }
    },
    cancelDelete() {
      this.rowToDelete = null;
      this.slugDeleteVideo = null
      this.showConfirmModal = false;
    },
    async changeInfoVideo(slug) {
      try {
        const token = csrf.getCookie()
        const formData = new FormData()
        formData.append('title', this.editVideo.title)
        formData.append('description', this.editVideo.description)
        formData.append('status', this.editVideo.status)
        const response = await axios.post(`video/edit-video/${slug}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }
        })
      } catch (error) {
        console.log(error)
      }
    }


  },
};
</script>
