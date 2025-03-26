<template>
    <!--  -->
    <div class="flex w-full  sm:p-5 gap-1 bg-white dark:bg-gray-900 ">
      <div class="flex  w-full sm:my-3 flex-col lg:flex-row flex-shrink-0 justify-center ">
        <!-- Video chi tiết -->
        <div class="flex flex-col max-w-full sm:max-w-[70%] gap-1">
          <div class="flex flex-col w-full">
            <div class="flex w-full sm:max-w-full h-[230px] sm:h-[500px] aspect-video rounded-xl justify-center">
              <video class="max-w-full max-h-full rounded-xl object-cover" ref="videoPlayer"></video>
            </div>
            <!-- about -->
            <div class="p-2 sm:mt-2 gap-1  w-full">
              <h1
                class="sm:w-full w-[300px] sizetext font-bold font-roboto dark:text-white line-clamp-2 sm:line-clamp-1 overflow-hidden text-ellipsis ">
                title</h1>
              <div class="flex flex-col sm:flex-row sm:space-x-4 sm:justify-between mt-2 space-y-2">
                <!-- left:Avatar và thông tin kênh -->
                <div class="flex flex-row items-center justify-between space-x-2 ">
                  <router-link  to="/mychannel">
                    <div class="flex flex-row w-full gap-1 items-center">
                      <!-- <img v-if="videoInfo && videoInfo.user && videoInfo.user.avatar" :src="videoInfo.user.avatar"
                        class="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-gray-400 flex-shrink-0" /> -->
                      <div  class="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-gray-400 flex-shrink-0"></div>
                      <div class="flex flex-row md:flex-col md:items-start items-center gap-1">
                        <h2 
                          class="namechanel text-sm font-semibold font-roboto dark:text-white">user name
                        </h2>
                        <p class="subtext text-gray-500 dark:text-gray-400">
                          12 người đăng ký
                        </p>
                      </div>
                    </div>
                  </router-link>
  
                  <!-- <router-link v-else :to="`/channel-user/${videoInfo.user.id}`">
                    <div class="flex flex-row w-full gap-1 items-center">
                      <img v-if="videoInfo && videoInfo.user && videoInfo.user.avatar" :src="videoInfo.user.avatar"
                        class="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-gray-400 flex-shrink-0" />
                      <div v-else class="sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-gray-400 flex-shrink-0"></div>
                      <div class="flex flex-row md:flex-col md:items-start items-center gap-1">
                        <h2 v-if="videoInfo && videoInfo.user && videoInfo.user.name"
                          class="namechanel text-sm font-semibold font-roboto dark:text-white">{{ videoInfo.user.name }}
                        </h2>
                        <p class="subtext text-gray-500 dark:text-gray-400">
                          {{ qualitySub }} người đăng ký
                        </p>
                      </div>
                    </div>
                  </router-link> -->
  
  
                  <!-- Nút Đăng ký -->
                  <button
                    v-if="!statusSubChannel" @click="subChannel(videoInfo.user.id)"
                    class="flex w-[16%]  justify-center sm:w-[45%]  ml-auto text-white sm:px-8 px-4 py-2 rounded-full  namechanel font-semibold bg-red"
                    
                    >
                    <span class="whitespace-nowrap sm:px-6 px-3 ">Đăng ký</span>
                  </button>
  
                  <button
                    v-else @click="cancelSub(videoInfo.user.id)"
                    class="flex w-[16%]  justify-center sm:w-[45%]  ml-auto text-white sm:px-8 px-4 py-2 rounded-full  namechanel font-semibold bg-red"
                    
                    >
                    <span class="whitespace-nowrap sm:px-6 px-3 ">Đã đăng ký</span>
                  </button>
                </div>
  
                <!-- right -->
                <div class="flex lg:w-[45%] md:w-[45%] w-full justify-end items-center space-x-4 ">
                  <div class="flex h-8 items-center text-black bg-gray-200 rounded-full p-2">
                    <div class="flex  items-center justify-between  rounded-lg">
  
                      <!-- Like Button -->
                      <!-- <button @click="likeVideo(videoInfo.slug)"
                      class="flex items-center justify-center rounded-lg gap-1 text-2xl text-black  bg-transparent transition"
                      :class="{
                        ' font-bold': likeStatus,
                        '': !likeStatus
                      }">
                      <i :class="likeStatus ? 'bx bxs-like' : 'bx bx-like'"></i>
                      <h1 class="subtext">{{ tempLikes }}</h1>
                    </button> -->
  
                      <button v-if="likeStatus" @click="disLike(videoInfo.slug)"
                        class="flex items-center justify-center rounded-lg gap-1 text-2xl text-black  bg-transparent transition font-bold">
                        <i class="bx bxs-like"></i>
                        <h1 class="subtext">{{ likes }}</h1>
                      </button>
  
                      <button v-else @click="likeVideo(videoInfo.slug)"
                        class="flex items-center justify-center rounded-lg gap-1 text-2xl text-black  bg-transparent transition">
                        <i class="bx bx-like"></i>
                        <h1 class="subtext">{{ likes }}</h1>
                      </button>
  
  
                    </div>
                  </div>
  
                  <!-- Share -->
                  <button
                    class="flex items-center  text-black bg-gray-200 hover:bg-gray-400 rounded-full gap-1 px-3 py-1">
                    <i class="bx bx-share icon"></i>
                    <span class="namechanel ">Chia sẻ</span>
                  </button>
  
                  <!-- Download -->
                  <button
                    class="flex items-center  text-black bg-gray-200 hover:bg-gray-400 rounded-full gap-1 px-3 py-1">
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
            <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4 w-full">
              <div>
  
              </div>
              <p class="namechanel dark:text-gray-100 font-bold">
                {{ videoInfo.view }} lượt xem
              </p>
  
              <p v-if="videoInfo && videoInfo.description" class="subtext dark:text-gray-100">
                {{ videoInfo.description }}
              </p>
  
              <p v-else class="subtext dark:text-gray-100">
                Đây là phần mô tả video.
              </p>
            </div>
            <!-- binh luan test  -->
            <!-- <div class="w-full sm:mt-4">
              <Comment />
            </div> -->
          </div>
  
        </div>
  
        <!-- Danh sách video đề xuất -->
        <div class="flex flex-col w-full lg:w-[30%] sm:px-4 bg-auto rounded-xl mt-4 lg:mt-0">
          <h2 class="text-lg font-bold ml-2 sm:ml-0 mb-4 dark:text-white">Video đề xuất</h2>
          <!-- <div v-for="(video, index) in videos.slice(1)" :key="index" class="flex flex-col space-y-2 mb-4">
            <VideoCard :video="video" :isInProductDetail="true" />
          </div> -->
          <div  class="flex flex-col space-y-2 mb-4">
            <!-- <a :href="`/productdetail/${video.slug}`" > -->
              <VideoCard />
            <!-- </a> -->
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
  import csrf from "@/config/csrf";
  import { checkAuthStatus } from "@/config/auth";
  import { toast } from 'vue3-toastify';
  import router from "@/router";
  
  
  export default {
    name: "ProductDetail",
    components: { VideoCard, Comment },
    props: ['slug'],
    data() {
      return {
        liked: false,
        disliked: false,
        likes: 0,
        likeStatus: false,
        statusSubChannel: false,
        qualitySub: 0,
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
        likeStatus: false,
        videoSuggest: [],
        idUser: null,
        idUserVideo: null,
        subscriberCount: 0, 
        isSubscribed: false,
  
      };
    },
    methods: {
      // đăng ký 
      toggleSubscription() {
        if (!this.isSubscribed) {
          this.subscriberCount += 1; 
        } else {
          this.subscriberCount -= 1; 
        }
        this.isSubscribed = !this.isSubscribed; 
      },
      async incrementView(slug) {
        try {
          const response = await axios.get(`video/add-view/${slug}`)
        } catch (error) {
          console.log(error)
        }
      },
      async likeVideo(slug) {
        try {
          const token = csrf.getCookie()
          const response = await axios.get(`video/like/${slug}`, {
            headers: {
              "Authorization": `Bearer ${token}`
  
            }
          })
          this.likes += 1;
          this.likeStatus = true
        } catch (error) {
          console.log(error)
        }
      },
      async checkLike(slug, token) {
        try {
          const response = await axios.get(`video/check-like/${slug}`, {
            headers: {
              "Authorization": `Bearer ${token}`
  
            }
          })
          this.likeStatus = response.like_status
        } catch (error) {
          console.log(error)
          this.likeStatus = false
        }
      },
      async disLike(slug) {
        try {
          const token = csrf.getCookie()
          const response = await axios.get(`video/dislike/${slug}`, {
            headers: {
              "Authorization": `Bearer ${token}`
  
            }
          })
          this.likeStatus = false
          this.likes -= 1
        } catch (error) {
          console.log(error)
        }
      },
      async getVideoMain(slug) {
        try {
          const response = await axios.get(`video/get/${slug}`)
          this.videoInfo = response.video
        } catch (error) {
          console.log(error)
          router.push('/')
        }
      },
  
      async suggestVideo(slug) {
        try {
          const response = await axios.get(`video/suggest-video-in-detail/${slug}`)
          this.videoSuggest = response.videos
        } catch (error) {
          console.log(error)
        }
      },
  
      playVideo(src) {
        const video = this.$refs.videoPlayer;
        let viewed = false; // Biến để kiểm tra nếu video đã đạt đến 20%
  
        if (Hls.isSupported()) {
          // Sử dụng hls.js để phát video từ file .m3u8
          this.hls = new Hls();
          this.hls.loadSource(src);
          this.hls.attachMedia(video);
  
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("Manifest loaded, video ready to play!");
  
            var playPromise = video.play();
  
            if (playPromise !== undefined) {
              playPromise.then(_ => {
                // Video bắt đầu tự động phát
              })
                .catch(error => {
                  // Nếu tự động phát bị chặn, có thể xử lý thêm
                });
            }
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
  
        // Lắng nghe sự kiện timeupdate để tính phần trăm video đã xem
        video.addEventListener('timeupdate', () => {
          const currentTime = video.currentTime;
          const duration = video.duration;
  
          if (duration > 0) {
            const percentWatched = (currentTime / duration) * 100;
  
  
            // Kiểm tra nếu video đã xem được 20% và chưa được tính là lượt xem
            if (!viewed && percentWatched >= 20) {
  
              this.incrementView(this.videoInfo.slug); // Gọi phương thức để tăng lượt xem
              viewed = true; // Đánh dấu là đã tính lượt xem
            }
          }
        });
      },
      async checkSub(id){
        try {
          const token = csrf.getCookie()
          const response = await axios.get(`channel/check-sub-channel/${id}`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          this.statusSubChannel = true
        } catch (error) {
          console.log(error)
          this.statusSubChannel = false
        }
      },
      async subChannel(id){
        if(this.idUser == id){
          toast.warning('Bạn không thể đăng ký kênh của bạn', {
            autoClose: 4000,
            position: 'top-right',
            
          });
        }
        try {
          const token = csrf.getCookie()
          const response = await axios.get(`channel/create-sub/${id}`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          this.qualitySub += 1
          this.statusSubChannel = true
        } catch (error) {
          console.log(error)
        }
      },
      async cancelSub(id){
        try {
          const token = csrf.getCookie()
          const response = await axios.get(`channel/cancel-sub/${id}`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          this.qualitySub -= 1
          this.statusSubChannel = false
        } catch (error) {
          console.log(error)
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
      await this.suggestVideo(this.slug)
      this.likes = this.videoInfo.likes
      this.idUserVideo = this.videoInfo.user.id
      this.qualitySub = this.videoInfo.sub
      this.playVideo(this.videoInfo.url)
      const token = csrf.getCookie()
      if (token) {
        await this.checkLike(this.videoInfo.slug, token)
        await this.checkSub(this.videoInfo.user.id)
        console.log(this.statusSubChannel)
        const auth = await checkAuthStatus()
        this.idUser = auth.id
      }
    }
  };
  </script>
  
  <style scoped>
  .transition {
    transition: all 0.3s ease-in-out;
  }
  
  .namechanel {
    font-size: 14px;
  }
  
  .sizetext {
    font-size: 1.125rem;
  }
  
  .subtext {
    font-size: 12px;
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
  