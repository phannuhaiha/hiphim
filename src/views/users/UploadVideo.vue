<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    <!-- Header -->
    <Header @toggle-theme="toggleTheme" :isDarkMode="isDarkMode" />

    <!-- Nội dung chính -->
    <div class="flex flex-grow mt-24">
      <!-- Cột menu bên trái -->
      <div class="w-1/6 bg-gray-200 dark:bg-customLight p-4 h-auto">
        <ul class="flex flex-col justify-center items-center space-y-4 text-gray-700 dark:text-gray-200">
          <li>
            <div class="flex justify-center">
              <img v-if="this.user && this.user.avatar" :src="this.user.avatar"
                alt="Avatar" class="avatar-channel" />
              <i v-else class="bx bx-user-circle text-black text-9xl"></i>
            </div>
            <div class="text-center">
              <h1 v-if="this.user && this.user.name" class="text-2xl text-black font-bold">{{ this.user.name }}</h1>
              <h1 v-else class="text-2xl text-black font-bold">Kênh của Bạn</h1>
              <!-- <h1 v-if="this.user && this.user.slug" class="text-xl text-gray-900">@{{ this.user.slug }}</h1> -->
              
            </div>
          </li>
          <div class="flex flex-col space-y-3 w-full justify-center items-center">
            <!-- upload -->
            <button class="flex flex-row w-full gap-2 tab-link text-gray-600 hover:text-blue-600 focus:outline-none"
              :class="{ 'text-blue-600 border-blue-600': activeTab === 'upload' }" @click="activeTab = 'upload'">
              <div class="flex pl-1 pt-1 w-[20%] h-full items-center justify-center">
                <i class="bx bx-upload w-full h-full text-xl text-black"></i>
              </div>
              <span
                class="flex w-[80%] items-start justify-start text-black dark:text-white font-roboto text-xl hover:underline">
                Upload
              </span>
            </button>
            <!-- thông tin -->
            <button class="flex flex-row w-full gap-2 tab-link text-gray-600 hover:text-blue-600 focus:outline-none"
              :class="{ 'text-blue-600 border-blue-600': activeTab === 'thongtin' }" @click="activeTab = 'thongtin'">
              <div class="flex pl-1 pt-1 w-[20%] h-full items-center justify-center">
                <i class="bx bx-pencil w-full h-full text-xl text-black"></i>
              </div>
              <span
                class="flex w-[80%] items-start justify-start text-black dark:text-white font-roboto text-xl hover:underline">
                Thông tin cá nhân
              </span>
            </button>
          </div>
        </ul>
      </div>

      <!-- Nội dung bên phải -->
      <div class="flex flex-col w-5/6 p-3 h-full space-y-5 justify-center items-center">
        <div v-show="activeTab === 'upload'" class="tab-content w-full">
          <!-- Tiêu đề -->
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold font-roboto">Danh sách video</h1>
            <button class="px-4 py-2 bg-blue-600 rounded text-blue hover:underline font-bold focus:outline-none"
              @click="openModal">
              Upload Video bấm ở đây nha
            </button>
          </div>

          <!-- Bảng danh sách video -->
          <div class="overflow-x-auto flex flex-col items-center w-full justify-center space-y-5 shadow-xl p-6">
            <TableListVideo v-if="listVideo && listVideo.length > 0" :videos="listVideo" />
              <p v-else>Không có video nào trong danh sách.</p>
          </div>
        </div>
        <div v-show="activeTab === 'thongtin'" class="w-full p-3">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold font-roboto">Chỉnh sửa thông tin cá nhân</h1>
          </div>
          <div class="overflow-x-auto flex flex-col items-center w-full justify-center space-y-5 shadow-xl p-6">
           <Individual/>
          </div>

        </div>
      </div>
    </div>

    <!-- Wizard -->
    <div v-show="showWizard" class="fixed inset-0 z-[2205] flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-[99%] max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <!-- Tiến trình -->
        <div class="flex items-center justify-between my-4">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center space-x-2">
            <div :class="[
              'w-8 h-8 flex items-center justify-center rounded-full border',
              currentStep === index
                ? 'bg-red-500 text-black border-red-500'
                : currentStep > index
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-gray-300'
            ]">
              <i v-if="currentStep > index" class="bx bx-check"></i>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span :class="currentStep === index ? 'text-red-500' : 'text-gray-500'">{{ step }}</span>
          </div>
        </div>

        <!-- Nội dung từng bước -->
        <div>
          <div v-if="currentStep === 0">
            <UploadSection @file-selected="handleFileSelected" />
          </div>
          <div v-else-if="currentStep === 1">
            <ReviewVideo v-if="videoPreviewUrl" :video-url="videoPreviewUrl" :video-name="videoDetails.name"
              :video-size="videoDetails.size" :video-type="videoDetails.type" @confirm-review="handleReviewSubmit"
              @thumbnail-selected="handleThumbnailSelected" />
          </div>
          <div v-else-if="currentStep === 2" class="text-center overflow-y-auto h-80">
            <h2 class="text-2xl font-bold">Chuẩn bị tải lên!</h2>
            <p class="text-gray-700 mb-4">Dưới đây là thông tin video bạn chuẩn bị tải lên:</p>

            <!-- Hiển thị thông tin video -->
            <div class="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700 ">


              <p><strong>Tiêu đề:</strong> {{ videoTitle }}</p>
             
              <p><strong>Mô tả:</strong> {{ videoDescription || 'Chưa có mô tả' }}</p>
            </div>
            <div class="mt-4">
              <p><strong>Video chạy thử:</strong></p>
              <video controls class="w-full max-w-md mx-auto rounded-lg shadow-md" :src="videoPreviewUrl"></video>
            </div>
            <!-- CHỗ tiến nạp dữ liệu nnè  -->
            <div class="relative w-full mt-4">
              <button @click="handleSubmitForm">
                ĐĂNG
                <!-- <ToastComponent /> -->
              </button>
              <!-- Thanh tiến trình -->
              <div v-if="isUploading" class="w-full bg-gray-300 rounded h-4 mt-2 relative">
                <div class="bg-blue-500 h-full rounded" :style="{ width: progress + '%' }"></div>
                <span class="absolute inset-0 flex justify-center items-center text-sm font-bold text-white">
                  {{ progress }}%
                </span>
              </div>
            </div>

            <!-- xử lí sự kiện đăng nhập link post API ở đây nhé đạt  -->

            <!-- Nút hoàn tất -->
            <!-- <button 
            class="mt-4 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
            @click="resetWizard"
          >
            Hoàn tất
          </button> -->
          </div>

        </div>

        <!-- Nút đóng wizard -->
        <button class="mt-4 bg-red-500 text-black px-4 py-2 rounded hover:bg-red" @click="closeWizard">
          Hủy
        </button>
        <button @click="handleNext" class="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue">
          Tiếp
        </button>


      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/users/Header.vue';
import UploadSection from '@/components/users/Upload/UploadSection.vue';
import ReviewVideo from '@/components/users/Upload/ReviewVideo.vue';
import TableListVideo from '@/components/users/Upload/TableListVideo.vue';
import ToastComponent from '@/components/users/ToastComponent.vue';
import Individual from '@/components/users/Individual.vue';
import axios from '@/config/axios.js';
import { toast } from 'vue3-toastify';
import csrf from '@/config/csrf';
import router from '@/router';
import { checkAuthStatus } from '@/config/auth';

export default {
  name: 'UploadPage',
  components: {
    Header,
    UploadSection,
    ReviewVideo,
    TableListVideo,
    ToastComponent,
    Individual,
    
  },
  data() {
    return {
      // test thanh tiến trình cho đẹp 
      isUploading: false,
      progress: 0,
      isDarkMode: false,
      activeTab: 'upload',
      channel: null,
      showWizard: false, // Hiển thị wizard khi click nút Upload Video
      currentStep: 0,
      steps: ['Chọn video', 'Chi tiết video', 'Kiểm tra'],
      videoPreviewUrl: null,
      videoDetails: {
        name: '',
        size: 0,
        type: '',
        thumbnailFile: '',
      },
      videoTitle: '',
      videoDescription: '',
      videoThumbnailUrl: null,
      videoSelected: null,
      user: null,
      listVideo: null,
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    openModal() {
      this.showWizard = true; // Hiển thị wizard
    },
    closeWizard() {
      this.showWizard = false; // Đóng wizard
      this.resetWizard();
    },
    handleFileSelected(file) {
  if (file) {
    // Kiểm tra kích thước file (100MB)
    if (file.size > 100 * 1024 * 1024) {
      this.showErrorToast("Tệp của bạn vượt quá dung lượng cho phép (100MB).");
      this.resetCurrentStep(); // Reset step nếu gặp lỗi
      return; // Không thực hiện các thao tác tiếp theo
    }

    // Kiểm tra định dạng file (chỉ cho phép MP4)
    if (file.type !== "video/mp4") {
      this.showErrorToast("Chỉ cho phép upload tệp định dạng MP4.");
      this.resetCurrentStep(); // Reset step nếu gặp lỗi
      return; // Không thực hiện các thao tác tiếp theo
    }

    // Xử lý file hợp lệ
    this.videoPreviewUrl = URL.createObjectURL(file);
    this.videoDetails = {
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    };

    // Chuyển sang bước tiếp theo
    this.nextStep();
  }
},

    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },
    resetWizard() {
      this.currentStep = 0;
      this.videoPreviewUrl = null;
      this.videoDetails = { name: '', size: 0, type: '' };
      this.videoTitle = '';
      this.videoDescription = '';
      this.videoThumbnailUrl = null;
    },
    // Xử lý dữ liệu nhận từ ReviewVideo
    handleReviewSubmit(reviewData) {
      this.videoTitle = reviewData.title;
      this.videoDescription = reviewData.description;
      this.videoThumbnailUrl = reviewData.thumbnail;
      this.nextStep();
    },
    handleNext() {

      alert('Chưa nghĩ ra cách làm hihi');
    },
    // giả vờ upload để troll
    handleThumbnailSelected(file) {
   
      this.videoThumbnailUrl = URL.createObjectURL(file); // Lưu URL để hiển thị
      this.videoDetails.thumbnailFile = file; // Lưu file gốc
    },
    // thông báo trả lỗi nè nha
    showErrorToast(message) {
        toast.error(`${message}`, {
          autoClose: 4000,
          position: 'top-right',
        });
      },
    // toast
    showWarningToast() {
        toast.warning('Vui lòng chờ xíu khi nào up xong hệ thống sẽ tự động đưa bạn về trang chủ', {
          autoClose: 4000,
          position: 'top-right',
          
        });
      },
    //end 
    async handleSubmitForm() {
      const token = csrf.getCookie()
      const formData = new FormData();
      formData.append('video', this.videoDetails.file)
      formData.append('thumbnail', this.videoDetails.thumbnailFile)
      formData.append('title', this.videoTitle)
      formData.append('description', this.videoDescription)
      this.showWarningToast()
      // this.closeWizard()
      // console.log(formData)
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
      }
      try {
        const response = await axios.post('video/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }
        });
        console.log(response)
        router.push('/product')
      } catch (error) {
        console.log(error)
      }
    },
    async getListVideos(){
      try {
        const token = csrf.getCookie()
        const response = await axios.get('video/get-video-user',{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        return response.videos
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted(){
    this.user = await checkAuthStatus()
    this.listVideo = await this.getListVideos()
  }
};

</script>

<style scoped>
.avatar-channel {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin: 0 auto 10px;
  background-size: cover;
  background-position: center;
}
</style>
