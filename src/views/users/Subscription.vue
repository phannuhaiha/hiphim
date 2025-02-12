<template> 
  <div class="background bg-white dark:bg-gray-900">
    <div class="sm:block hidden">
      <div class="bg-auto flex flex-col space-y-2 sm:p-3">
      <h1 class="bg-auto ml-4 text-lg sm:text-3xl font-bold font-roboto text-black dark:text-white">
      KÊNH ĐĂNG KÍ
    </h1>
    <!-- Kênh 1 -->
    <ChannelCarousel :videos="videosChannel1" channelName="Kênh đăng ký 1" />
    <!-- Kênh 2 -->
    <ChannelCarousel :videos="videosChannel2" channelName="Kênh đăng ký 2" />
    <!-- Kênh 3 -->
    <ChannelCarousel :videos="videosChannel3" channelName="Kênh đăng ký 3" />
    </div>
    </div>


    <!-- Màn hình điện thoại -->
    <div class="sm:hidden block "> 
      <div class="flex flex-col space-y-3 ">
        <!-- Chuỗi kênh đã đăng kính (chỉ avt) -->
          <div><avt-group/></div>
        <!-- Chuoi video  -->
         <div class="flex flex-col space-y-3 w-full h-full px-4">
          <!-- Video Card -->
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="flex flex-col bg-auto items-center rounded-lg"
      >
        <!-- Video -->
        <div class="relative w-full h-40">
          <video
            :src="video.src"
            controls
            class="w-full h-full object-cover rounded-lg"
          ></video>
        </div>

        <div class="flex flex-row w-full mt-2">
          <div class="w-10 h-10 rounded-full bg-slate-600 "></div>
          <div class="flex flex-col px-2 w-[80%]">
            <!-- Text Section -->
        <div class="">
          <p class="text-purple-600 font-bold text-sm line-clamp-2 overflow-hidden text-ellipsis">
            {{ video.title }}
          </p>
        </div>

        <!-- Views and Time -->
        <div class="mt-2 text-gray-600 text-xs">
          <span>{{ video.views }} lượt xem • {{ video.time }}</span>
        </div>
          </div>
          <!-- icon 3 chaams docj -->
           <div class="flex w-[10%] ">
            <i class="bx bx-dots-vertical-rounded dark:text-white text-2xl"></i>
           </div>
        </div>
        
      </div>
         </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import ChannelCarousel from "@/components/users/ChannelCarousel.vue";
import AvtGroup from '@/components/users/AvtGroup.vue';

export default {
  name: "Subscription",
  components: {
    ChannelCarousel,
    AvtGroup,
  },
  data() {
    return {
      videosChannel1: [
        { src: "video1.mp4", title: "Video 1", channel: "Kênh 1", views: "10K" },
        { src: "video2.mp4", title: "Video 2", channel: "Kênh 1", views: "20K" },
        { src: "video3.mp4", title: "Video 3", channel: "Kênh 1", views: "15K" },
        { src: "video1.mp4", title: "Video 1", channel: "Kênh 1", views: "10K" },
        { src: "video2.mp4", title: "Video 2", channel: "Kênh 1", views: "20K" },
        { src: "video3.mp4", title: "Video 3", channel: "Kênh 1", views: "15K" },
        { src: "video1.mp4", title: "Video 1", channel: "Kênh 1", views: "10K" },
        { src: "video2.mp4", title: "Video 2", channel: "Kênh 1", views: "20K" },
        { src: "video3.mp4", title: "Video 3", channel: "Kênh 1", views: "15K" },
        
      ],
      videosChannel2: [
        { src: "video4.mp4", title: "Video 4", channel: "Kênh 2", views: "30K" },
        { src: "video5.mp4", title: "Video 5", channel: "Kênh 2", views: "5K" },
        { src: "video6.mp4", title: "Video 6", channel: "Kênh 2", views: "8K" },
        { src: "video1.mp4", title: "Video 1", channel: "Kênh 1", views: "10K" },
        { src: "video2.mp4", title: "Video 2", channel: "Kênh 1", views: "20K" },
        { src: "video3.mp4", title: "Video 3", channel: "Kênh 1", views: "15K" },
        
      ],
      videosChannel3: [
        { src: "video4.mp4", title: "Video 4", channel: "Kênh 2", views: "30K" },
        { src: "video5.mp4", title: "Video 5", channel: "Kênh 2", views: "5K" },
        { src: "video6.mp4", title: "Video 6", channel: "Kênh 2", views: "8K" },
        { src: "video1.mp4", title: "Video 1", channel: "Kênh 1", views: "10K" },
        { src: "video2.mp4", title: "Video 2", channel: "Kênh 1", views: "20K" },
        { src: "video3.mp4", title: "Video 3", channel: "Kênh 1", views: "15K" },
        
      ],
      videos: [
        {
          src: "path-to-video1.mp4", title: "20 cụm từ Tiếng Anh thông dụng kèm theo ví dụ và giải thích chi tiết", views: "1", time: "49 phút trước",
        },
        {
          src: "path-to-video1.mp4", title: "20 cụm từ Tiếng Anh thông dụng kèm theo ví dụ và giải thích chi tiết", views: "1", time: "49 phút trước",
        },
        {
          src: "path-to-video1.mp4", title: "20 cụm từ Tiếng Anh thông dụng kèm theo ví dụ và giải thích chi tiết", views: "1", time: "49 phút trước",
        }

      ],
    };
  },
};
</script>

<style>

</style>
