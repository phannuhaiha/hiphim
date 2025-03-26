<template>
  <!-- computer -->
  <div class="sm:block hidden w-full p-5">
    <div class="w-full py-2">
      <h1 class="bg-auto ml-4 text-lg sm:text-3xl font-bold font-roboto text-black dark:text-white ">VIDEO ĐÃ THÍCH</h1>
    </div>
    <div class="flex flex-row w-full bg-auto gap-3 ">
      <!-- Video -->
      <div class="grid gap-4 w-[70%]">
        <div v-for="video in videos" :key="video.id" class="flex bg-white dark:bg-gray-800 p-4 w-full rounded-lg shadow-md">
          <a :href="`/productdetail/${video.slug}`" class="flex w-full">
            <img :src="video.thumbnail" class=" w-44 h-24 object-cover rounded-lg " />
            <div class="ml-4 flex-1 w-[300px] ">
              <h3 class="text-lg text-black dark:text-gray-300 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">{{ video.title }}
              </h3>
              <p class="text-gray-500 dark:text-gray-300 text-sm">{{ video.user.name }} • {{ video.view }} lượt xem</p>
            </div>

          </a>
          <div>
            <button @click="removeVideo(index, video.id)" class=""><i
                class="bx bx-x text-2xl text-gray-700 dark:text-white "></i></button>
          </div>
        </div>

      </div>
      <!-- search -->
      <div class="hidden lg:block w-[20%]">
        <div class="relative mb-4 border-b border-gray-300">
          <input type="text" placeholder="Tìm kiếm phim đã thích"
            class="w-full p-2 pl-10 bg-purple-100 rounded-full focus:outline-none" />
          <i class="absolute bx bx-search left-3 top-2.5 text-gray-500"></i>
        </div>

        <!-- Delete Button -->
        <button @click="confirmDeleteAll" class="flex items-center text-black hover:text-red hover:underline dark:text-gray-300">
          <i class="bx bx-trash text-xl"></i>
          <span class="ml-2">Xóa tất cả video đã thích</span>
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import csrf from '@/config/csrf';
import axios from '@/config/axios';

export default {
  data() {
    return {
      isDotsMenuOpen: false,
      videos: [],
    };
  },
  methods: {
    toggleDotsMenu() {
      this.isDotsMenuOpen = !this.isDotsMenuOpen;
    },
    closeAllDropdown(event) {
      // Đóng menu video nếu nhấn ngoài menu video
      if (this.$refs.dotsMenu && !this.$refs.dotsMenu.contains(event.target)) {
        this.isDotsMenuOpen = false;
      }
    },
    async getVideo() {
      try {
        const token = csrf.getCookie()
        const response = await axios.get('video/get-video-like', {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        })
        this.videos = response.videos
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },

    // Xóa video đơn lẻ
    async removeVideo(index, id) {
      try {
        const token = csrf.getCookie();
        await axios.get(`video/delete-video-like/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        // Cập nhật danh sách video sau khi xóa
        this.videos.splice(index, 1);
      } catch (error) {
        console.error("Lỗi khi xóa video:", error);
      }
    },
    confirmDeleteAll() {
      if (confirm("Bạn có chắc muốn xóa tất cả video đã thích không?")) {
        this.clearAllVideos();
      }
    },
    // Xóa toàn bộ video đã thích
    async clearAllVideos() {
      try {
        const token = csrf.getCookie();
        await axios.get('video/delete-all-video-like', {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        this.videos.length = 0;
      } catch (error) {
        console.error("Lỗi khi xóa tất cả video:", error);
      }
    }
  },
  async mounted() {
    await this.getVideo()

    document.addEventListener("click", this.closeAllDropdown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeAllDropdown);
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
