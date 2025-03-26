<template>
  <div class="flex flex-col w-full bg-auto pr-5 py-2 duration-300 transition-all ">
    <!-- AVT + Tên Kênh -->
    <div class="flex justify-between text-black dark:text-white  py-1 border-b border-gray-300">
      <button class="flex flex-row items-center">
        <img :src="channelName.avatar" class="flex w-10 h-10 rounded-full items-center mr-2 bg-gray-400" />
        <div class="text-lg font-roboto">{{ channelName.name }}</div>
      </button>
      <router-link :to="`/channel-user/${channelName.id}`">
        <button class="rounded-full border border-gray-300">
          <span class="text-sm p-2 font-roboto hover:underline">Xem tất cả</span>
        </button>
      </router-link>
    </div>

    <!-- Video Carousel -->
    <div class="relative flex flex-row justify-center  w-full min-h-full dark:bg-auto rounded-xl mt-3 overflow-hidden">
      <div class="flex w-[100%] transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(group, index) in groupedVideos" :key="index" class="grid gap-5 w-full flex-shrink-0 " :class="{
          'grid-cols-1': videosPerGroup === 1,
          'grid-cols-2': videosPerGroup === 2,
          'grid-cols-3': videosPerGroup === 3,
          'grid-cols-4': videosPerGroup === 4,
        }">
          <div v-for="(video, videoIndex) in group" :key="videoIndex">
            <a class="w-full" :href="`/productdetail/${video.slug}`">
              <VideoCard :video="video" />
            </a>
          </div>
        </div>
        
      </div>
      <!-- Slide buttons -->
      <button v-if="currentIndex > 0" class="z-20 absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-300" @click="prevSlide">
        <i class="bx bx-chevron-left text-2xl"></i>
      </button>
      <button v-if="currentIndex < Math.min(groupedVideos.length, 3) - 1" class="absolute z-20 top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-300" @click="nextSlide">
        <i class="bx bx-chevron-right text-2xl"></i>
      </button>

      
    </div>
  </div>
</template>

<script>
import VideoCard from "@/components/users/Videocard.vue";

export default {
  name: "ChannelCarousel",
  components: {
    VideoCard,
  },
  props: {
    videos: {
      type: Array,
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    videosPerGroup() {
      if (this.windowWidth < 640) return 1;
      if (this.windowWidth < 1024) return 3;
      return 4;
    },
    groupedVideos() {
      const groups = [];
      const maxSlides = 3;
      for (let i = 0; i < this.videos.length; i += this.videosPerGroup) {
        groups.push(this.videos.slice(i, i + this.videosPerGroup));
        if (groups.length === maxSlides) break;
      }
      console.log("Tổng số nhóm video:", groups.length);
      return groups;
    },
  },
  methods: {
    nextSlide() {
      const maxIndex =  Math.min(this.groupedVideos.length, 3) - 1;
      this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
    },
    prevSlide() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateWindowWidth);
    console.log("Danh sách video nhận được:", this.videos);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateWindowWidth);
  },
};
</script>

<style scoped>
.carousel {
  height: auto;
}

.dark .container {
  background-color: #2d3748;
  /* Màu nền cho dark mode */
}
</style>
