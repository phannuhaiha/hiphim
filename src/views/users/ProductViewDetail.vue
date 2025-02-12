<template>
  <div class="flex w-full p-5 gap-1 bg-white dark:bg-gray-900 ">
    <div class="flex  w-full my-3 flex-col lg:flex-row flex-shrink-0 ">
      <!-- Video chi tiết -->
      <div class="flex flex-col w-full lg:w-[70%] gap-1">
        <div class="video-wrapper rounded-xl overflow-hidden">
          <video controls class="w-full h-auto rounded-xl object-cover" ref="videoPlayer"></video>
        </div>

        <div class="mt-2 ">
          <h1 v-if="videoInfo && videoInfo.title" class="sizetext font-bold dark:text-white  ">{{ videoInfo.title }}</h1>
          <div class="flex flex-col sm:flex-row sm:space-x-4 sm:justify-between mt-2 space-y-2">
            <!-- left:Avatar và thông tin kênh -->
            <div class="flex flex-row items-center justify-between space-x-2 ">
              <div class="flex flex-row w-full gap-1 items-center">
                <img v-if="videoInfo && videoInfo.user && videoInfo.user.avatar" :src="videoInfo.user.avatar" class="lg:w-10 lg:h-10 md:w-8 md:h-8 h-5 w-5 rounded-full bg-gray-400 flex-shrink-0"/>
                <div v-else class="lg:w-10 lg:h-10 md:w-8 md:h-8 h-5 w-5 rounded-full bg-gray-400 flex-shrink-0"></div>
                <div class="flex flex-row md:flex-col md:items-start items-center gap-1">
                  <h2 v-if="videoInfo && videoInfo.user && videoInfo.user.name" class="namechanel text-sm font-semibold dark:text-white">{{ videoInfo.user.name }}</h2>
                  <p class="subtext text-gray-500 dark:text-gray-400">
                    {{ videos[0].subscription }} người đăng ký
                  </p>
                </div>
              </div>

              <!-- Nút Đăng ký -->
              <button
                class="flex w-[15%] justify-center sm:w-[45%] bg-gray-800 ml-auto text-white sm:px-3 py-2 rounded-full  namechanel font-semibold">Đăng
                ký</button>
            </div>

            <!-- right -->
            <div class="flex lg:w-[45%] md:w-[45%] w-full justify-end items-center space-x-4 ">
              <div class="flex md:w-[25%] lg:w-[30%]  items-center text-black bg-gray-200  rounded-full ">
                <div class="flex w-full justify-between justify-center] rounded-full ">
                  <!-- Like -->
                  <button
                    class="flex items-center justify-center text-black rounded-l-full gap-1 bg-transparent hover:bg-gray-400 px-3 md:px-2 py-1 ">
                    <i class="bx bx-like icon"></i>
                    <h1 class="subtext">{{ videos[0].like }}</h1>
                  </button>
                  <div class="flex w-[1%] text-gray-400 py-1 namechanel">
                    <p>|</p>
                  </div>

                  <!-- Dislike -->
                  <button
                    class="flex  flex-grow-0 items-center text-black rounded-r-full bg-transparent hover:bg-gray-400  px-3 py-1 ">
                    <i class="bx bx-dislike icon"></i>
                  </button>
                </div>
              </div>


              <!-- Share -->
              <button class="flex items-center  text-black bg-gray-200 hover:bg-gray-400 rounded-full gap-1 px-3 py-1">
                <i class="bx bx-share icon"></i>
                <span class="namechanel ">Chia sẻ</span>
              </button>

              <!-- Download -->
              <button class="flex items-center  text-black bg-gray-200 hover:bg-gray-400 rounded-full gap-1 px-3 py-1">
                <i class="bx bx-download icon"></i>
                <span class="namechanel">Tải về</span>
              </button>

              <!-- Menu -->
              <button
                class="flex  w-8 h-8 justify-center rounded-full bg-gray-200 items-center text-black hover:text-gray-700">
                <i class="bx bx-dots-horizontal-rounded icon"></i>
              </button>
            </div>


          </div>
        </div>

        <!-- Thông tin video -->
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
          <div>
            
          </div>
          <p class="namechanel font-bold">
            23 tr lượt xem
          </p>

          <p class="subtext">
            Đây là phần mô tả video.
          </p>
        </div>
        <!-- binh luan test  -->
         <Comment/>
      </div>

      <!-- Danh sách video đề xuất -->
      <div class="flex flex-col w-full lg:w-[30%] px-4 bg-auto rounded-xl mt-4 lg:mt-0">
        <h2 class="text-lg font-bold mb-4 dark:text-white">Video đề xuất</h2>
        <div v-for="(video, index) in videos.slice(1)" :key="index" class="flex flex-col space-y-2 mb-4">
          <VideoCard :video="video" :isInProductDetail="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from "@/components/users/Videocard.vue";
import Comment from '@/components/users/Comment.vue';
import axios from "@/config/axios.js";
import Hls from "hls.js";

export default {
  name: "ProductDetail",
  components: { VideoCard, Comment },
  props: ['slug'],
  data() {
    return {
      videos: [
        {
          src: "video1.mp4", title: "Anne-Marie - 2002 (Live at Brighton Music Hall 2018)", channel: "Anne-Marie", subscription: "11,5 Tr", views: "189 Tr ", like: "12 N",
        },
        {
          src: "video2.mp4", title: "Anne-Marie - Rockabye & Ciao Adios", channel: "Capital FM", subscription: "18 Tr", views: "18 Tr ",
        },
        {
          src: "video3.mp4", title: "Anne-Marie - FRIENDS", channel: "Anne-Marie", subscription: "11,5 Tr", views: "210 Tr",
        },
        {
          src: "video4.mp4", title: "ROSÉ & Bruno Mars - APT", channel: "ROSÉ", subscription: "780 Tr", views: "780 Tr ",
        },
        {
          src: "video5.mp4", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", subscription: "50 Tr", views: "4,8 T ",
        },
        {
          src: "video1.mp4", title: "Anne-Marie - 2002 (Live at Brighton Music Hall 2018)", channel: "Anne-Marie", subscription: "11,5 Tr", views: "189 Tr ",
        },
        {
          src: "video1.mp4", title: "Anne-Marie - 2002 (Live at Brighton Music Hall 2018)", channel: "Anne-Marie", subscription: "11,5 Tr", views: "189 Tr ",
        },
        {
          src: "video1.mp4", title: "Anne-Marie - 2002 (Live at Brighton Music Hall 2018)", channel: "Anne-Marie", subscription: "11,5 Tr", views: "189 Tr ",
        },
        {
          src: "video1.mp4", title: "Anne-Marie - 2002 (Live at Brighton Music Hall 2018)", channel: "Anne-Marie", subscription: "11,5 Tr", views: "189 Tr ",
        },
      ],
      hls: null,
      videoInfo: {},

    };
  },
  methods: {
    async getVideoMain(slug) {
      try {
        const response = await axios.get(`video/get/${slug}`)
        this.videoInfo = response.video
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    playVideo(src) {
      const video = this.$refs.videoPlayer;

      if (Hls.isSupported()) {
        // Sử dụng hls.js để phát video từ file .m3u8
        this.hls = new Hls();
        this.hls.loadSource(src);
        this.hls.attachMedia(video);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("Manifest loaded, video ready to play!");
          video.play();
        });

        this.hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS Error:", data);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Hỗ trợ native HLS trên Safari
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      } else {
        console.error("HLS is not supported on this browser.");
      }
    },

  },
  beforeDestroy() {
    // Hủy HLS instance khi component bị phá hủy
    if (this.hls) {
      this.hls.destroy();
    }
  },
  async mounted() {
    await this.getVideoMain(this.slug)
    this.playVideo(this.videoInfo.url)
  }
};
</script>

<style scoped>
.namechanel {
  font-size: 12px;
}

.sizetext {
  font-size: 1rem;
}

.subtext {
  font-size: 10px;
}

.icon {
  font-size: 15px;
  line-height: 21px;
}

@media (min-width: 640px) {
  .icon {
    font-size: 1rem
      /* 16px */
    ;
    line-height: 1.5rem
      /* 24px */
    ;
  }
}


@media (min-width: 768px) {

  /* md*/
  .sizetext {
    font-size: 1.125rem;
    /* 18px */
  }

  .namechanel {
    font-size: 14px;
  }

  .subtext {
    font-size: 12px;
  }

  .icon {
    font-size: 1.125rem
      /* 18px */
    ;
    line-height: 1.75rem
      /* 28px */
    ;
  }
}

@media (min-width: 1024px) {

  /* lg:text-xl */
  .sizetext {
    font-size: 1.25rem;
    /* 20px */
  }

  .namechanel {
    font-size: 16px;
  }

  .subtext {
    font-size: 14px;
  }

  .icon {
    font-size: 1.25rem
      /* 20px */
    ;
    line-height: 1.75rem
      /* 28px */
    ;
  }
}

/* Thêm các style nếu cần */
</style>

