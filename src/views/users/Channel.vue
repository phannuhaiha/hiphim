<template>
    <div class="flex bg-white dark:bg-gray-900 w-full items-center justify-center">
        <!-- noi dung chinh -->
        <div class="bg-auto flex flex-col space-y-2 sm:p-3 w-[80%]">
            <div class="flex w-full h-[180px] rounded-lg bg-gray-100">
               
            </div>
            <!-- Thong tin -->
             <div class="flex flex-row w-full p-3 gap-3 ">
                <!-- avt -->
                 <div class="flex w-[20%] ">
                  <div class="flex rounded-full w-[180px] h-[180px] p-2 border border-gray-800"> </div>
                 </div>
                 
                 <!-- mo tả  -->
                  <div class="flex flex-col w-[80%] gap-2 h-[200px]  justify-center">
                    <span class="flex text-4xl font-roboto font-semibold">{{ channels.namechannel }}</span>
                    <div class="flex flex-row gap-2 text-md font-roboto">
                      <span class=" text-black">@{{ channels.username }}</span>
                      <div class="flex flex-row gap-2 text-gray-500">
                        .
                      <span>{{ channels.subscrip }} nguời đăng ký</span>
                      .
                      <span>{{ channels.video }} video</span>
                      </div>
                    </div>
                    <!-- link địa chỉ trang -->
                    <button  @click="openModal" class="flex flex-row w-[75%] justify-center text-md font-roboto">
                        <span class="flex w-[500px] text-gray-500 overflow-hidden whitespace-nowrap">{{ channels.about }}</span> 
                        <span class="text-black ">...xem thêm</span> 
                      </button>
                      <!-- Modal -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white rounded-lg w-[500px] p-5">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold ">Giới thiệu</h2>
            <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
              ✕
            </button>
          </div>
          <div class="mt-2 w-full">
            <p class="w-full">{{ channels.about }}</p>
            <div class="">
              <h3 class="font-semibold text-xl py-3">Đường liên kết</h3>
              <ul class="flex flex-col gap-3">    
                <li>
                  <div class="flex flex-row items-center gap-4">
                    <i class="bx bx-globe  text-2xl"></i>
                    <a target="_blank" class="text-blue"
                    >Blog: facebook.com/euroyofficial</a
                  >
                  </div>
                  
                </li>
                <li>
                  <div class="flex flex-row items-center gap-4">
                    <i class="bx bx-globe  text-2xl"></i>
                    <a  target="_blank" class="text-blue"
                    >Fanpage: facebook.com/euroyofficial</a
                  >
                  </div>
                  
                </li>
              </ul>
            </div>
            <div class="">
              <h3 class="font-semibold text-xl py-3">Chi tiết kênh</h3>
              <ul>
                <div class="flex flex-col gap-4">
                  <li class=" flex flex-row gap-3 items-center">
                    <i class="bx bx-envelope text-2xl"></i>  
                    <button class="bg-gray-100 hover:bg-gray-300 rounded-full py-2 px-3 font-semibold">Xem địa chỉ email</button>
                  </li>
                <li class=" flex flex-row gap-3 items-center">
                  <i class="bx bx-globe text-2xl"></i> 
                  <a
                    href="linklink"
                    target="_blank"
                    class="text-blue"
                    >link.link.link////linl </a
                  >
                </li>
                <li class=" flex flex-row gap-3 items-center"><i class="bx bx-user-voice text-2xl"></i>{{ channels.subscrip }} người đăng ký</li>
                <li class=" flex flex-row gap-3 items-center"><i class="bx bx-play text-2xl"></i>{{ channels.video }} video</li>
                <li class=" flex flex-row gap-3 items-center"><i class="bx bx-trending-up text-2xl"></i>{{ channels.see }} lượt xem</li>
                <li class=" flex flex-row gap-3 items-center"><i class="bx bx-error text-2xl"></i>Đã tham gia {{ channels.joined }}</li>
                

                </div>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
                    <!--đăng ký  -->
                    <button 
                    class="flex w-[20%] rounded-full bg-[#ee4242] flex-row text-white font-semibold px-2 py-1 gap-2 justify-center items-center">
                      <i class="bx bx-bell text-lg"></i>
                      <span class="text-base">Đăng ký</span>
                      
                    </button>
                  </div> 
             </div>
             <!-- Noi dung chính -->
              <div class="flex w-full flex-col space-y-3 p-2 duration-300 transition-all ">
                <div class="flex w-full gap-2 flex-row ">
                  <button class="flex rounded-md bg-gray-200 text-black text-base px-2 py-1 hover:bg-gray-300">Mới nhất </button>
                  <button class="flex rounded-md bg-gray-200 text-black text-base px-2 py-1 hover:bg-gray-300">Phổ biến </button>
                  <button class="flex rounded-md bg-gray-200 text-black text-base px-2 py-1 hover:bg-gray-300">Cũ nhất </button>

                </div>
                
                <div class="grid grid-cols-4 gap-4">
      <!-- Video Card -->
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="flex flex-col bg-auto  rounded-lg"
      >
        <!-- Video -->
        <div class="relative w-full h-32">
          <video
            :src="video.src"
            controls
            class="w-full h-full object-cover rounded-lg"
          ></video>
          
          
        </div>

        <div class="flex flex-row w-full mt-2">
          <div class="flex flex-col w-[90%]">
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
import SeriesDetail from '@/components/users/SeriesDetail.vue';


export default {
    name: 'Series',
    props: {
    isNavOpen: {
      type: Boolean,
      default: false, // Nhận trạng thái từ Home.vue
    },
  },
  data(){
    return {
      isModalOpen: false,
      channels: {
         namechannel: "Học tiếng anh cùng Trung tâm A",
         username: "learningEL",
         subscrip: "1,28 Tr",
         video: "4,1 N",
         about: "Hà nèeeeeeeeeeeeeeee eeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeee",
         see: "20n",
         joined: "14 thg 8, 2021",
      },
      videos: [
      {
          src: "path-to-video1.mp4", title: "20 cụm từ Tiếng Anh thông dụng kèm theo ví dụ và giải thích chi tiết", views: "1", time: "49 phút trước",},
        {
          src: "path-to-video2.mp4",
          title: "Bài học tiếng Anh ngắn",
          views: "10",
          time: "1 giờ trước",
        },
        {
          src: "path-to-video3.mp4",
          title: "Giao tiếp Tiếng Anh", 
          views: "50",
          time: "2 giờ trước",
        },
        {
          src: "path-to-video4.mp4",
          title: "Học ngữ pháp nhanh",
          views: "30",
          time: "3 giờ trước",
        },
        {
          src: "path-to-video5.mp4",
          title: "Từ vựng theo chủ đề",
          views: "100",
          time: "4 giờ trước",
        },
        {
          src: "path-to-video6.mp4",
          title: "Phát âm chuẩn",
          views: "20",
          time: "5 giờ trước",
        },
      ]
      
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
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
  padding-top: 56.25%; /* Tỉ lệ 16:9 */
  overflow: hidden;
  
}




.text-short{
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  white-space: nowrap; 
overflow: hidden; 
text-overflow: ellipsis;
max-width: 250px;

}
</style>
