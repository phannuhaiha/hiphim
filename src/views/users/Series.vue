<template>
  <div class="series bg-white dark:bg-gray-900">
    <!-- Nội dung chính -->
    <div class="bg-auto flex flex-col space-y-2 sm:p-3 pb-16">
      <h1 class="sm:block hidden bg-auto text-3xl font-bold font-roboto text-black dark:text-white ml-3">PHIM LẺ</h1>

      <!-- Container chứa danh sách phim -->
      <div class="grid sm:grid-cols-5 grid-cols-2 gap-4 sm:p-4 p-2 bg-auto text-white">
        <div v-for="movie in movies" :key="movie.id"
          class="relative bg-white border border-gray-500 rounded-lg overflow-hidden">
          <a :href="`series-watch/${movie.slug}`">
            <img :src="movie.thumbnail" class="w-full h-52 sm:h-60 object-cover">
            <!-- <div class="absolute top-2 left-2 bg-orange text-black px-2 py-1 text-xs rounded overflow-hidden line-clamp-1">{{ movie.episode }}</div> -->
            <div class="sm:p-4 p-1">
              <h3 class="text-lg font-bold text-black overflow-hidden line-clamp-1 text-ellipsis">{{ movie.title }}</h3>
              <p class="text-sm text-gray-400">{{ movie.subtitle }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Video player container -->
    <!-- <div v-if="videoUrl" class="video-player-container">
      <video ref="videoPlayer" controls preload="auto" width="600" height="400">
        <p>Your browser does not support the video tag.</p>
      </video>
    </div> -->
  </div>
</template>

<script>
import axios from "@/config/axios";
import Hls from "hls.js";

export default {
  name: 'Series',
  data() {
    return {
      // Movies data
      movies: [],


    };
  },
  methods: {
    goToWatchPage(movie) {
      this.$router.push({
        name: 'SeriesWatch',
        params: { id: movie.id }
      });
    },
    async getAllMovie() {
      try {
        const response = await axios.get('movie/get-all-movie')
        this.movies = response.movies || [];
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.getAllMovie()
  }
};
</script>

<style scoped>
.grid div:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

.video-player-container {
  margin-top: 20px;
}
</style>
