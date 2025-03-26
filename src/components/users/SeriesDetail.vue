<template>
    <div class="product w-full m-2 sm:m-5 pr-5 bg-white dark:bg-gray-900 duration-300 transition-all">
      <!-- Container chứa các video -->
      <div class="grid gap-4 bg-auto grid-cols-nav ">
        
        <!-- Mỗi video -->
        <div
          v-for="(video, index) in videos"
          :key="index"
          class="flex flex-col rounded-xl text-black "
          style="width: 100%">

          <!-- Video Container -->
          <div class="flex relative w-full justify-center transition transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue " style="width: 100%;">
            <div class="video-wrapper rounded-xl">
            <video
              :src="video.src"
              controls
              ref="videoElement"
              class="video">
            </video>
            </div>
             <!-- Background 1 -->
              <div class="flex bg-rose-300 absolute z-10 bottom-1  w-[95%] h-[93%] object-cover rounded-lg hover:scale-90">
              </div>
              <!-- Background 2 -->
              <div class="flex bg-rose-200 absolute z-6 bottom-2  w-[90%] h-[95%] object-cover rounded-lg hover:scale-75">
            </div>
    
          </div>
          
          
          <!-- Tiêu đề và thông tin -->
          <div class="flex flex-row justify-between pt-2 w-full">
            <div class="flex flex-row w-[93%]">
              
              <!-- Tiêu đề -->
              <div class="flex w-full flex-col justify-left text-left font-roboto ml-3 text-black dark:text-white">
                <h1 class="text-lg font-roboto font-bold line-clamp-2 overflow-hidden text-ellipsis">{{ video.title }}</h1>
                <h2 >{{ video.views }} lượt xem</h2>
              </div>
            </div>
            <!-- Menu dấu ba chấm -->
            <button class="flex flex-col w-[7%] items-center space-y-1">
              <div class="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
              <div class="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
              <div class="w-1 h-1 bg-black dark:bg-white rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  
  export default {
    name: "ProductView",
    props: {
      isNavOpen: {
        type: Boolean,
        default: false, // Nhận trạng thái từ Home.vue
      },
    },

    data() {
      return {
        videos: [
          { src: "video1.mp4", title: "Video 1", channel: "Kênh 1", views: "10K" },
          { src: "video2.mp4", title: "Video 2", channel: "Kênh 2", views: "20K" },
          { src: "video3.mp4", title: "Video 3", channel: "Kênh 3", views: "15K" },
          { src: "video4.mp4", title: "Video 4", channel: "Kênh 4", views: "30K" },
          { src: "video5.mp4", title: "Video 5", channel: "Kênh 5", views: "5K" },
          { src: "video6.mp4", title: "Video 6", channel: "Kênh 6", views: "8K" },
          // Thêm video tùy ý
        ],
        hoveredBackground: -1, 
      };
    },
  };
  </script>
  
  <style scoped>
  /* Lưới video */
  .grid {
    display: grid;
    grid-gap: 1rem; /* Khoảng cách giữa các video */
  
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
    padding-top: 56.25%; /* Tỉ lệ 16:9 */
    overflow: hidden;
    
  }
  
  .video {
    position: absolute;
    z-index: 12;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
  }

  
  </style>
  