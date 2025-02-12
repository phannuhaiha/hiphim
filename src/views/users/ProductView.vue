<template>
  <div class="product w-full sm:m-5 sm:pr-5 bg-white dark:bg-gray-900 duration-300 transition-all">
    <div class="sm:block hidden">
      <!-- Container chứa các video -->
      <div v-if="videos.length === 0" class="text-center p-5">
        <p>Không có video nào để hiển thị.</p>
      </div>
      <div v-else class="grid bg-auto" :class="isNavOpen ? 'grid-cols-nav' : 'grid-cols-auto'">

        <div v-for="(video, index) in videos" :key="index" class="" @click="goToVideoDetails(video.slug)"
          style="width: 100%">
          <div
            class="thumbnail-wrapper flex flex-col rounded-xl text-black transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue">
            <img :src="video.thumbnail || '/default-thumbnail.jpg'" :alt="video.title" class="thumbnail" />
          </div>

          <!-- Tiêu đề và thông tin -->
          <div class="flex flex-row justify-between  pt-2 w-[95%] mb-3">
            <div class="flex flex-row w-full">
              <!-- Avatar -->
              <img v-if="video.user.avatar" :src="video.user.avatar"
                class="flex w-[10%] h-[40%] rounded-full items-center ml-1 bg-gray-400" />
              <div v-else class="flex w-[10%] h-[40%] rounded-full items-center ml-1 bg-gray-400"></div>
              <!-- Tiêu đề -->
              <div class="flex w-[70%] flex-col justify-left text-left font-roboto ml-3 text-black dark:text-white">
                <h1 class="text-short">{{ video.title }}</h1>
                <h2>{{ video.user.name }}</h2>
                <h2>{{ video.view }} lượt xem</h2>
              </div>
              <div class="flex w-[10%]">
                <i class="bx bx-dots-vertical-rounded dark:text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- hieenr thij tren DIEN THOAI -->
    <div class="sm:hidden block">
      <div class="flex flex-col space-y-3 items-center w-full h-full px-7">
        <!-- Video Card -->
        <div v-if="videos.length === 0" class="text-center p-5">
        <p>Không có video nào để hiển thị.</p>
      </div>
      <div v-else class="flex flex-col space-y-3 bg-auto w-full h-full" >

        <button v-for="(video, index) in videos" :key="index" class="w-full h-full object-cover rounded-lg" @click="goToVideoDetails(video.slug)"
          >
          <div
            class="thumbnail-wrapper flex flex-col w-full rounded-xl text-black transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue">
            <img :src="video.thumbnail || '/default-thumbnail.jpg'" :alt="video.title" class="thumbnail" />
          </div>

          <!-- Tiêu đề và thông tin -->
          <div class="flex flex-row justify-between pt-2 w-full mb-3">
            <div class="flex flex-row w-full">
              <!-- Avatar -->
              <img v-if="video.user.avatar" :src="video.user.avatar"
                class="flex w-[10%] h-[40%] rounded-full items-center ml-1 bg-gray-400" />
              <div v-else class="flex w-[10%] h-[40%] rounded-full items-center ml-1 bg-gray-400"></div>
              <!-- Tiêu đề -->
              <div class="flex w-[70%] flex-col justify-left text-left font-roboto ml-3 text-black dark:text-white">
                <h1 class="text-short">{{ video.title }}</h1>
                <h2 class="text-xs text-gray-500 dark:text-white">{{ video.user.name }}</h2>
                <h2 class="text-xs text-gray-500 dark:text-white">{{ video.view }} lượt xem</h2>
              </div>
              <div class="flex w-[10%]">
                <i class="bx bx-dots-vertical-rounded dark:text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </button>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
import VideoPlayer from "@/components/users/VideoPlayer.vue";
import axios from "@/config/axios.js";

export default {
  name: "ProductView",
  props: {
    isNavOpen: {
      type: Boolean,
      default: false, // Nhận trạng thái từ Home.vue
    },
  },
  components: {
    VideoPlayer,
  },
  data() {
    return {
      watched: [
        {
          src: "path-to-video1.mp4", title: "20 cụm từ Tiếng Anh thông dụng kèm theo ví dụ và giải thích chi tiết", views: "1", time: "49 phút trước",
        },
      ],
      videos: [],
    };
  },
  mounted() {
    // Gọi API khi component được mount
    this.getAllVideo();
  },
  methods: {
    async getAllVideo() {
      try {
        const response = await axios.get("video/get-all-video");
        if (response && response.videos) {
          this.videos = response.videos;
          console.log("Danh sách video:", this.videos); // Log danh sách video
        } else {
          console.error("API trả về dữ liệu không hợp lệ:", response);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API get-all-video:", error);
      }
    },
    goToVideoDetails(slug) {
      if (slug) {
        this.$router.push({
          name: "detail",
          params: { slug: slug },
        });
      } else {
        console.error("Slug không hợp lệ:", slug);
      }
    },
  },
};
</script>

<style scoped>
/* Lưới video */
.grid {
  display: grid;
}

/* Khi Nav mở: hiển thị 3 cột */
.grid-cols-nav {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Khi Nav đóng: hiển thị 4 cột */
.grid-cols-auto {
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
}

/* Video giữ tỉ lệ 16:9 */
.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  /* Tỉ lệ 16:9 */
  overflow: hidden;
}

.thumbnail-wrapper {
  width: 300px;
  height: 170px;
  overflow: hidden;
  position: relative;
  background: #f3f4f6;
  border-radius: 8px;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.text-short {
  font-size: 1rem
    /* 18px */
  ;
  line-height: 1.5rem
    /* 28px */
  ;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}
</style>
