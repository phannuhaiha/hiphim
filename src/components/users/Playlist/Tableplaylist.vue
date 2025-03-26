<template>
  <div class="w-full">
    <button @click="openWizard" class="px-4 py-2 bg-blue-600 text-blue rounded font-bold">Tạo danh sách phát ấn ở
      đây</button>

    <table class="w-full border-collapse border border-gray-300 text-left text-sm mt-4">
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-gray-300 px-2 py-2 text-left w-[40%]">Danh sách phát</th>
          <th class="border border-gray-300 px-2 py-2 text-left w-[15%]">Mô tả</th>
          <th class="border border-gray-300 px-2 py-2 text-left w-[15%]">Chế độ hiển thị</th>
       
          <th class="border border-gray-300 px-2 py-2 text-left w-[10%]">Số lượng video</th>
          <th class="border border-gray-300 px-2 py-2 text-left w-[5%]"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(playlist, index) in playlists" :key="index" class="hover:bg-gray-100">
          <a :href="`playlistdetail/${playlist.id}`">
            <td class="border border-gray-300 px-4 py-2 flex items-center">
              <img v-if="playlist.videos.length > 0" :src="playlist.videos[0].thumbnail" class="w-[80px] h-[60px] bg-gray-300 mr-2 rounded-md" />
              <img v-else src="https://via.placeholder.com/80x60" class="w-[80px] h-[60px] bg-gray-300 mr-2 rounded-md" />
              <div>
                <p class="font-bold text-sm">{{ playlist.title }}</p>
              </div>
            </td>
          </a>
       
            <td class="border border-gray-300 px-4 py-2">{{ playlist.description }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ playlist.status == 'public' ? 'Công khai' : 'Riêng tư' }}
            </td>
         
            <td class="border border-gray-300 px-4 py-2 text-center">{{ playlist.total_videos }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            <button @click="deletePlaylist(index,playlist.id)" class="text-red-600 font-bold" title="Xóa">
              <i class="bx bx-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Wizard Modal -->
    <div v-if="showWizard" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-md shadow-md w-[700px]">
        <div class="flex flex-row justify-between ">
          <h2 class="text-lg font-bold text-black  ">Tạo danh sách phát mới </h2>
          <button @click="showWizard = false" class="bx bx-x text-lg font-roboto"></button>
        </div>

        <!-- Bước 1: Nhập thông tin -->
        <div v-if="step === 1">
          <label class="block text-sm font-medium text-gray-700 mt-4">Tiêu đề (bắt buộc)</label>
          <input v-model="newPlaylist.title" class="w-full border border-gray-300 px-2 py-2 mt-2 rounded"
            placeholder="Thêm tiêu đề" />

          <label class="block text-sm font-medium text-gray-700 mt-4">Mô tả</label>
          <textarea v-model="newPlaylist.description" class="w-full border border-gray-300 px-2 py-2 mt-2 rounded"
            placeholder="Thêm nội dung mô tả"></textarea>

          <label class="block text-sm font-medium text-gray-700 mt-4">Chế độ hiển thị</label>
          <select v-model="newPlaylist.visibility" class="w-full border border-gray-300 px-2 py-2 mt-2 rounded">
            <span>{{ newPlaylist.visibility }}</span>
            <option value="public">Công khai</option>
            <option value="private">Riêng tư</option>
          </select>

          <h1 class="block text-sm font-medium text-gray-700 mt-4">Video</h1>
          <button @click="nextStep"
            class="block text-sm text-gray-700 mt-4 bg-gray-400 px-4 py-2 rounded font-bold">Thêm video</button>
        </div>

        <!-- Bước 2: Thêm video -->
        <div v-if="step === 2">
          <h2 class="text-lg font-bold">Thêm video</h2>
          <p class="text-gray-600 mb-4">Chọn các video trong danh sách dưới đây sẵn để thêm vào danh sách phát.</p>
          <div class="border-t border-gray-300"></div>
          <div class="mt-4" v-if="availableVideos.length">
            <div v-for="video in availableVideos" :key="video.id" class="flex items-center gap-2 py-2">
              <input type="checkbox" v-model="selectedVideos" :value="video" class="mr-2" />
              <img :src="video.thumbnail" class="inline-block w-16 h-10 mr-2" />
              <span>{{ video.title }}</span>
            </div>
          </div>
          <p v-else class="text-gray-500">Không có video nào.</p>
        </div>

        <div class="flex justify-between mt-4">
          <button v-if="step > 1" @click="step--" class="px-4 py-2 bg-gray-600 text-black rounded">Quay lại</button>
          <button v-if="step < 2" @click="nextStep" class="px-4 py-2 bg-blue-600 text-black rounded font-bold">Tiếp
            theo</button>
          <button v-if="step === 2" @click="closeWizard"
            class="px-4 py-2 bg-green-600 text-black rounded font-bold">Xong</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/config/axios';
import csrf from '@/config/csrf';

export default {
  data() {
    return {
      playlists: [],
      showWizard: false,
      step: 1,
      selectedVideos: [],
      availableVideos: [],
      newPlaylist: {
        title: "",
        description: "",
        visibility: "public",
        // thumbnail: "https://via.placeholder.com/80x60",
        // lastUpdated: new Date().toLocaleDateString(),
        // videoCount: 0,
      },
    };
  },
  methods: {
    openWizard() {
      this.showWizard = true;
      this.step = 1;
    },
    nextStep() {
      if (this.step === 1 && !this.newPlaylist.title.trim()) {
        alert("Vui lòng nhập tiêu đề danh sách phát!");
        return;
      }
      this.step++;
      this.$nextTick(() => {
        this.getVideo()
      })
    },
    closeWizard() {
      this.showWizard = false;
      this.step = 1;
      this.createPlaylist()
    },
    async getVideo() {
      try {
        const token = csrf.getCookie()
        const response = await axios.get('video/get-video-user', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        this.availableVideos = response.videos
      } catch (error) {
        console.log(error)
      }
    },
    async createPlaylist() {
      try {
        const token = csrf.getCookie()
        const formData = new FormData()
        formData.append('title', this.newPlaylist.title)
        formData.append('description', this.newPlaylist.description)
        formData.append('status', this.newPlaylist.visibility)
        formData.append('videos', JSON.stringify(this.selectedVideos))
        const response = await axios.post('playlist/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async getPlaylists() {
      try {
        const token = csrf.getCookie()
        const response = await axios.get('/playlist/get-playlist', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        console.log(response)
        this.playlists = response.playlists
      } catch (error) {
        console.log(error)
      }
    },
    async deletePlaylist(index,id){
      try {
        const token = csrf.getCookie()
        const response = await axios.get(`playlist/delete/${id}`,{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        this.playlists.splice(index,1)
      } catch (error) {
        console.log(error)
      }
    }


  },
  async mounted() {
    await this.getPlaylists()
  }
};
</script>
