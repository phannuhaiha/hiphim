<template>
  <div class="flex bg-white dark:bg-gray-900 w-full items-center justify-center">
    <!-- noi dung chinh -->
    <div class="bg-auto flex flex-col space-y-2 sm:p-3 pb-24 w-full sm:w-[80%]">

      <!-- Thong tin -->
      <div class="flex flex-row w-full p-3 gap-3 ">
        <!-- avt -->
        <div class="flex w-[30%] sm:w-[20%] items-center justify-center ">
          <img :src="user.avatar"
            class="flex rounded-full w-[80px] h-[80px] sm:w-[180px] sm:h-[180px] sm:p-2 border border-gray-800" />
        </div>

        <!-- mo tả  -->
        <div class="flex flex-col w-[70%] sm:w-[80%] sm:gap-2 gap-1  h-[100px] sm:h-[200px]  justify-center">
          <span class="flex dark:text-gray-300 text-2xl sm:text-4xl font-roboto font-semibold">{{ user.name }}</span>
          <div class="flex flex-row gap-2 text-md font-roboto">
            <!-- <span class=" text-black">@{{ channels.username }}</span> -->
            <div class="flex flex-row gap-2 text-gray-500">
              .
              <span>{{ qualitySub }} nguời đăng ký</span>
              .
              <span>{{ user.total_video }} video</span>
            </div>
          </div>
          <!-- link địa chỉ trang -->
          <button class="flex flex-row w-[75%]  text-md font-roboto sm:block hidden">
            <span class="flex sm:w-[500px] text-gray-500 overflow-hidden whitespace-nowrap">{{ user.description
            }}</span>

          </button>

          <!--đăng ký  -->
          <button
            class="flex sm:w-[20%] w-[55%] rounded-full bg-[#ee4242] flex-row text-white font-semibold px-2 py-1 gap-2 justify-center items-center">
            <i class="bx bx-bell text-lg"></i>
            <button v-if="!status_sub" @click="subChannel(id)" class="sm:text-base text-sm">Đăng ký</button>
            <button v-else @click="cancelSub(id)" class="sm:text-base text-sm">Đã đăng ký</button>

          </button>
        </div>
      </div>
      <!-- Noi dung chính -->
      <div class="flex w-full flex-col space-y-3 p-2 duration-300 transition-all ">
        <div class="flex flex-row gap-2">
          <button :class="{ 'underline': activeTab === 'Video' }" @click="activeTab = 'Video'"
            class="bg-gray-200 hover:bg-gray-600 text-gray-700 text-md font-roboto font-semibold  px-3 py-1 rounded-lg">Video</button>

          <button :class="{ ' underline': activeTab === 'Playlist' }" @click="activeTab = 'Playlist'"
            class="bg-gray-200 hover:bg-gray-600 text-gray-700 text-md font-roboto font-semibold  px-3 py-1 rounded-lg">Playlist</button>
        </div>

        <!-- đường thẳng ngang -->
        <div class="flex w-full gap-2 flex-row border border-gray-200">
        </div>

        <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <!-- Video Card -->
          <div v-show="activeTab === 'Video'" v-for="(video, index) in user.videos" :key="index"
            class="flex flex-col bg-auto  rounded-lg">
            <a :href="`/productdetail/${video.slug}`"
              class="flex flex-col bg-auto items-start justify-start rounded-lg">
              <div class="relative w-full sm:h-32 lg:h-36 h-[200px]">
                <img :src="video.thumbnail" class="w-full h-full object-cover rounded-lg" />
              </div>

              <div class="flex flex-row w-full mt-2">
                <div class="flex flex-col w-[90%] justify-start items-start">
                  <!-- Text Section -->
                  <div class="">
                    <p class="text-black font-bold text-base line-clamp-2 overflow-hidden text-ellipsis">
                      {{ video.title }}
                    </p>
                  </div>

                  <!-- Views and Time -->
                  <div class="text-left sm:mt-2 mt-1 text-gray-600 text-sm line-clamp-1 overflow-hidden text-ellipsis">
                    <span class=""> • {{ video.view }} lượt xem • {{ video.created_at }}</span>
                  </div>
                </div>
                <!-- icon 3 chaams docj -->
                <div class="flex w-[10%] ">
                  <i class="bx bx-dots-vertical-rounded dark:text-white text-2xl"></i>
                </div>
              </div>
            </a>

          </div>
          <!-- PLAYLIST -->
          <div v-show="activeTab === 'Playlist'" v-for="(playlist, index) in user.playlists" :key="index"
            class="flex flex-col gap-2 overflow-hidden  relative">

            <div class="flex justify-center w-full h-36">
              <div class="flex bg-[#a0d4f5]  rounded-md top-0 w-[93%] h-14"></div>
              <div class="absolute bg-[#6abbec] rounded-md top-2 w-[96%] z-10 h-10"></div>
              <img v-if="playlist.videos.length > 0" :src="playlist.videos[0].thumbnail"
                class=" absolute w-full h-32 top-4 object-cover z-20 bg-gray-400 rounded-md" alt="Playlist Image" />
              <img v-else src="https://via.placeholder.com/80x60"
                class=" absolute w-full h-32 top-4 object-cover z-20 bg-gray-400 rounded-md" alt="Playlist Image" />
            </div>

            <div class="flex flex-col gap-1 w-full pl-2">
              <h3 class="font-bold text-base overflow-hidden text-ellipsis line-clamp-2 ">{{ playlist.title }}</h3>
              <p class="text-sm text-gray-400">{{ playlist.status == 'public' ? 'Công khai' : 'Riêng tư' }}</p>
              <a :href="`/playlistdetail/${playlist.id}`" class="text-[#3b81d0] text-sm cursor-pointer">View full playlist</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SeriesDetail from '@/components/users/SeriesDetail.vue';
import axios from '@/config/axios.js';
import csrf from '@/config/csrf';


export default {
  name: 'Series',
  props: {
    isNavOpen: {
      type: Boolean,
      default: false, // Nhận trạng thái từ Home.vue
    },
  },
  props: ['id'],
  data() {
    return {
      activeTab: 'Video',
      isModalOpen: false,
      channels: {},
      videos: [],
      user: [],
      playlists: [
        { title: "INSIDE", privacy: "Public", videoCount: 6, image: "" },
        { title: "OST Code geass", privacy: "Private", videoCount: 9, image: "" },
        { title: "Concert", privacy: "Private", videoCount: 2, image: "" },
        { title: "Roselia", privacy: "Private · Updated yesterday", videoCount: 75, image: "" }
      ],
      status_sub: false,
      qualitySub: 0,

    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async getChannel(id) {
      try {
        const response = await axios.get(`channel/get-channel/${id}`)
        console.log(response)
        this.user = response.channel
      } catch (error) {
        console.log(error)
      }
    },
    async subChannel(id) {
      try {
        const token = csrf.getCookie()
        const response = await axios.get(`channel/create-sub/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        this.qualitySub += 1
        this.status_sub = true
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async cancelSub(id) {
      try {
        const token = csrf.getCookie()
        const response = await axios.get(`channel/cancel-sub/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        this.qualitySub -= 1
        this.status_sub = false
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async checkSub(id) {
      try {
        const token = csrf.getCookie()
        const response = await axios.get(`channel/check-sub-channel/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        this.status_sub = true
        console.log(response)
      } catch (error) {
        console.log(error)
        this.status_sub = false
      }
    }
  },
  async mounted() {
    const token = csrf.getCookie()
    await this.getChannel(this.id)
    this.qualitySub = this.user.sub
    if (token) {
      await this.checkSub(this.id)
    }
  },
  components: {
    SeriesDetail,
  },
}
</script>

<style>
.fixed {
  z-index: 1000;
}

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

.text-short {
  font-size: 1.125rem
    /* 18px */
  ;
  line-height: 1.75rem
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
