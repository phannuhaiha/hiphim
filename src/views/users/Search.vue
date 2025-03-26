<template>
  <div class="flex w-full items-center justify-center">
    <!-- list video -->
    <div class="flex flex-col gap-2 mt-5 w-[1100px] ">

      <!-- Content -->
      <div v-for="(video, index) in videos" :key="index"
        >
        <a :href="`/productdetail/${video.slug}`" class="flex flex-col sm:flex-row  bg-auto  overflow-hidden w-full gap-2 font-roboto">
          <!-- Thumbnail -->
          <div class="w-full sm:w-1/3 h-[200px] rounded-xl bg-[#3db2e1]">
            <img :src="video.thumbnail" class="w-full h-full rounded-xl object-cover">
          </div>

          <div class="w-full sm:w-[650px] p-3 flex flex-col gap-1">
            <h3
              class="w-full text-xl dark:text-gray-100 font-semibold line-clamp-2 sm:line-clamp-1 overflow-hidden text-ellipsis">
              {{ video.title }}</h3>
            <p class="text-base text-gray-600 dark:text-gray-300">{{ video.view }} lượt xem - {{ video.created_at }}</p>
            <div class="flex flex-row gap-1 w-full items-center ">
              <img :src="video.user.avatar" class="w-10 h-10 bg-gray-200 rounded-full"/>
              <p class="text-base text-gray-500 dark:text-gray-100">{{ video.user.name }}</p>
            </div>
            <p class="w-full text-base  dark:text-gray-100 line-clamp-1 overflow-hidden text-ellipsis">{{
              video.description }}
            </p>
            
          </div>
          <!-- icon 3 points -->
          <div class="sm:block hidden flex w-[5%] pt-3 top-0">
            <button @click.stop="toggleDropdown(index)" class="flex w-full bg-auto top-0">
              <i class="bx bx-dots-vertical-rounded dark:text-white text-2xl"></i>
            </button>
            <!-- dropdown dots -->
            <div v-if="activeDropdownIndex === index" @click.stop
              class="absolute -translate-x-full w-[300px] bg-white dark:bg-gray-800 shadow-md rounded-md z-50">
              <ul class="py-1">
                <li>
                  <button
                    class="flex flex-row w-full items-center  text-left dark:text-black px-4 py-2 hover:bg-gray-100 gap-1">
                    <i class="bx bx-menu dark:text-white text-xl"></i>
                    <p class="text-base text-gray-700 dark:text-gray-300"> Thêm vào danh sách chờ</p>

                  </button>

                </li>
                <li>
                  <button
                    class="flex flex-row w-full text-left items-center  dark:text-black px-4 py-2 hover:bg-gray-100 gap-1">
                    <i class="bx bx-history  dark:text-white text-xl"></i>
                    <p class="text-base text-gray-700 dark:text-gray-300"> Lưu vào danh sách Xem sau</p>

                  </button>
                </li>
                <li>
                  <button
                    class="flex flex-row w-full text-left items-center  dark:text-black px-4 py-2 hover:bg-gray-100 gap-1">
                    <i class="bx bx-bookmark   dark:text-white text-xl"></i>
                    <p class="text-base text-gray-700 dark:text-gray-300"> Lưu vào danh sách phát </p>

                  </button>
                </li>
                <li>
                  <button
                    class="flex flex-row w-full text-left items-center  dark:text-black px-4 py-2 hover:bg-gray-100 gap-1">
                    <i class="bx bx-download   dark:text-white text-xl"></i>
                    <p class="text-base text-gray-700 dark:text-gray-300"> Tải xuống</p>

                  </button>
                </li>
                <li>
                  <button
                    class="flex flex-row w-full text-left items-center  dark:text-black px-4 py-2 hover:bg-gray-100 gap-1">
                    <i class="bx bx-share   dark:text-white text-xl"></i>
                    <p class="text-base text-gray-700 dark:text-gray-300"> Chia sẻ</p>

                  </button>
                </li>
              </ul>
            </div>

          </div>
        </a>




      </div>

    </div>
  </div>
</template>

<script>
import router from '@/router';
import axios from '@/config/axios';

export default {
  data() {
    return {
      isDarkMode: false,
      activeDropdownIndex: null,

      videos: []
    }

  },
  props: ['search'],
  methods: {
    toggleDropdown(index) {
      this.activeDropdownIndex = this.activeDropdownIndex === index ? null : index;
    },
    closeAllDropdown(event) {
      if (!event.target.closest(".bx-dots-vertical-rounded")) {
        this.activeDropdownIndex = null;
      }
    },
    async searchVideo(keyword) {
      try {
        // const formData = new FormData()
        // formData.append('search',keyword)
        const response = await axios.get(`video/search-video/${keyword}`)
        this.videos = response.videos
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

  },
  async mounted() {
    document.addEventListener("click", this.closeAllDropdown);
    if (!this.search) {
      router.push('/')
    } else {
      await this.searchVideo(this.search)
    }


  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeAllDropdown);
  },
}
</script>
