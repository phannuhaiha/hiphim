  <template>
    <div 
    :class="[isProductDetailPage ? 'flex md:flex-row flex-col space-y-1 space-x-1 ':'flex flex-col'] "
    class="flex w-full bg-auto rounded-xl text-black transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue ">
  <!-- Video Container -->
  <div 
  :class="[isProductDetailPage ? 'flex md:w-2/5 w-full':'w-full'] "
  class="video-wrapper rounded-xl overflow-hidden ">
    <video
      :src="video.src"
      controls
      ref="videoElement"
      class="w-full object-cover "
    ></video>
  </div>

  <!-- Tiêu đề và thông tin -->
  <div 
  :class="[isProductDetailPage ? 'md:w-3/5 w-full md:items-start':'w-full'] "
  class="flex flex-row justify-between items-center ">
    <div class="flex flex-row w-5/6 items-center space-x-2 overflow-hidden">
      <!-- Avatar -->
      <div 
      :class="[isProductDetailPage ? 'md:hidden':'']" class="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0"></div>

      <!-- Thông tin -->
      <div class="flex flex-col text-left dark:text-white font-roboto overflow-hidden">
        <h1 class="text-base font-roboto font-bold truncate">{{ video.title }}</h1>
        <h2 class="text-xs text-gray-500 dark:text-white">{{ video.channel }}</h2>
        <h2 class="text-xs text-gray-500 dark:text-white">{{ video.views }} lượt xem</h2>
      </div>
    </div>

    <!-- Menu dấu ba chấm -->
    <button class="flex w-1/6 h-8 flex-col space-y-1 rounded-full items-center">
      <div class="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
      <div class="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
      <div class="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
    </button>
  </div>
</div>

  </template>

  <script>
  export default {
    name: "VideoCard",
    props: {
      video: {
        type: Object,
        required: true, // Nhận đối tượng video từ parent component
      },
      
    },
   
    computed: {
    isProductDetailPage() {
      return this.$route.name === 'detail'; 
    },
  },
  };
  </script>

  <style scoped>

  </style>
