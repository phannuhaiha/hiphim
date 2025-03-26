<template>
  <div class="flex flex-col space-y-1 w-full p-3">
    <h1 class="bg-auto ml-4 text-lg sm:text-3xl font-bold font-roboto text-black dark:text-white">
      Playlist Detail
    </h1>

    <div class="flex flex-row space-x-2 w-full p-3">
      <!-- Chi tiết bên trái -->
      <div
        class="flex flex-col gap-2 h-auto  w-[30%] bg-gradient-to-b from-[#5ca3dd] to-white rounded-md items-center pt-5">
        <div class="flex w-[90%] h-[200px] ">
          <img :src="playlist.videos[0].thumbnail" class="w-full h-full rounded-md bg-gray-200" />
        </div>

        <!-- title -->
        <div class="flex w-[90%] text-2xl font-roboto font-semibold line-clamp-2 overflow-hidden text-ellipsis">{{
          playlist.title }}
        </div>

        <!-- Channel -->
        <div class="flex flex-row w-[90%] items-center">
          <div class="flex w-[20%]">
            <img :src="playlist.user.avatar" class="flex w-10 h-10 rounded-full items-center ml-1 bg-gray-400">
          </div>
          <div class="flex w-[80%]">
            <span class="text-base font-roboto ">{{ playlist.user.name }}</span>
          </div>
        </div>
        <!-- About -->
        <div class="flex flex-row text-sm text-gray-500 font-roboto w-[90%]">
          <span> {{ playlist.status == 'public' ? 'Công khai' : 'Riêng tư' }} </span> • <span> {{ playlist.total_videos
          }} video </span>
        </div>

        <!-- button -->
        <div class="flex flex-row justify-between w-[90%]">
          <button @click="openPlay" class="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full font-semibold">
            <i class='bx bx-play'></i>
            <span>Play all</span>
          </button>
          <button class="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
            <i class='bx bx-plus text-black'></i>
          </button>
          <button class="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
            <i class='bx bx-pencil text-black'></i>
          </button>
          <button class="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
            <i class='bx bx-share text-black'></i>
          </button>
          <button class="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
            <i class='bx bx-dots-horizontal-rounded text-whblackite'></i>
          </button>

        </div>
      </div>
      <!-- bên phải nì  -->
      <div class="flex flex-col gap-3 w-[70%] ">
        <div v-for="(video, index) in videos" :key="index">
          <div class="grid gap-4 w-full">
            <div class="flex bg-white dark:bg-gray-800 p-4 w-full rounded-lg shadow-md">
              <a :href="`/productdetail/${video.slug}`" class="flex w-full">
                <img :src="video.thumbnail" class=" w-[250px] h-[130px] object-cover rounded-lg " />
                <div class="ml-4 flex-1 w-[300px] ">
                  <h3
                    class="text-lg text-black dark:text-gray-300 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {{ video.title }}
                  </h3>
                  <p class="text-gray-500 dark:text-gray-300 text-sm">{{ playlist.user.name }} • {{ video.view }} lượt
                    xem</p>
                </div>

              </a>
              <div>
                <button v-if="user.id == playlist.user.id" @click="showModal('deleteVideo',playlist.id,video.id,index)" class="">
                  <i class="bx bx-trash text-2xl text-gray-700 dark:text-white "></i></button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div v-if="showConfirmModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div v-if="typeModal == 'deleteVideo'" class="bg-white p-6 rounded-md shadow-md">
          <p>Bạn có chắc muốn duyệt video không?</p>
          <div class="flex justify-between space-x-4 mt-4">
            <button @click="deleteVideo()" class="px-4 py-2 bg-green text-black rounded">Có</button>
            <button @click="cancelDelete()" class="px-4 py-2 bg-red text-black rounded">Không</button>
          </div>
        </div>

      </div>


    </div>

  </div>
</template>

<script>
import axios from '@/config/axios';
import csrf from '@/config/csrf';
import ToastComponent from '@/components/users/ToastComponent.vue';
import { checkAuthStatus } from '@/config/auth';

export default {
  data() {
    return {
      playlist: [],
      videos : [],
      showConfirmModal: false,
      typeModal: null,
      playlistToDelete: null,
      videoToDelete: null,
      rowToDelete: null,
      user: null,

    }
  },
  props: ['slug'],
  methods: {
    openPlay() {
      this.$router.push("/seeplaylist");
    },
    showModal(typeModel,playlistid,videoid,index){
      this.showConfirmModal = true
      this.typeModal = typeModel
      this.playlistToDelete = playlistid
      this.videoToDelete = videoid
      this.rowToDelete = index
    },
    async getVideo(id) {
      try {
        const response = await axios.get(`playlist/get-playlist-detail/${id}`)
        this.playlist = response.playlist
        this.videos = response.playlist.videos
        console.log(response)
      } catch (error) {
        console.log(error)
        window.location.href = '/'
      }
    },
    async deleteVideo() {
      const token = csrf.getCookie()
      if (token) {
        try {
          const response = await axios.get(`playlist/delete-video/${this.playlistToDelete}/${this.videoToDelete}`,{
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          if(this.rowToDelete != null){
            this.videos.splice(this.rowToDelete, 1)
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.cancelDelete()
        }
      } else {
        toast.error(`Bạn chưa đăng nhập`, {
          autoClose: 4000,
          position: 'top-right',
        });
      }
    },
    cancelDelete() {
      this.showConfirmModal = false
      this.typeModal = null
      this.playlistToDelete = null
      this.videoToDelete = null
      this.rowToDelete = null
    }

  },
  async mounted() {
    await this.getVideo(this.slug)
    const token = csrf.getCookie()
    if(token){
      this.user = await checkAuthStatus()
    }
  }
}
</script>

<style></style>
