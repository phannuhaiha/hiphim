  <template>
    <div
      :class="isProductDetailPage ? 'md:flex-row flex-col space-y-1 space-x-1 w-full' : 'flex flex-col space-y-2 w-full'"
      class="flex  bg-auto rounded-xl text-black transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue ">
      <!-- Video Container -->
      <div :class="isProductDetailPage ? 'w-full h-[200px] sm:w-2/5 sm:h-[90px]' : 'w-[300px] h-[180px]'"
        class="video-wrapper sm:rounded-lg flex  overflow-hidden ">
        <img :src="video.thumbnail" class="w-full object-cover ">
      </div>

      <!-- Tiêu đề và thông tin -->
      <div 
      :class="isProductDetailPage ? 'sm:w-3/5 w-full' : 'w-full'"
      class="flex flex-row sm:items-start justify-between items-center ">
        <div
        class="flex flex-row w-5/6 items-center space-x-2 overflow-hidden">
          <!-- Avatar -->
          <div class="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0 sm:hidden"></div>

          <!-- Thông tin -->
          <div class="flex flex-col text-left dark:text-white font-roboto overflow-hidden">
            <h1 class="text-base font-roboto font-bold truncate line-clamp-2 overflow-hidden text-ellipsis">{{
              video.title }}</h1>
            <h2 class="text-xs text-gray-500 dark:text-white">{{ video.user.name }}</h2>
            <h2 class="text-xs text-gray-500 dark:text-white">{{ video.view }} lượt xem</h2>
          </div>
        </div>

        <!-- Menu dấu ba chấm -->
        <button 
        class="flex w-1/6 h-8 flex-col space-y-1 rounded-full items-center">
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
    isSubscriptionPage() {
      return thus.$route.name === 'subscription';
    }
  },
};
</script>

<style scoped>
.video-wrapper {

  overflow: hidden;
  position: relative;
  background: #f3f4f6;
}
</style>
