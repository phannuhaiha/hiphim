<template>
    <div class="flex flex-col items-center w-full p-4 bg-gray-50 rounded-lg shadow-md space-y-2 overflow-y-auto h-80 pr-2">
      <h2 class="text-3xl font-bold text-gray-700 mb-6">Chi tiết Video muốn đăng</h2>
  
      <!-- Thông tin chi tiết video -->
      <div class="flex flex-row w-full space-x-8">
        <!-- Cột bên trái -->
        <div class="flex flex-col w-2/3 space-y-4">
          <div>
            <label class="text-sm font-semibold text-gray-700 block">Tiêu đề (bắt buộc)</label>
            <input
              type="text"
              class="text-xs w-full p-4 border rounded-sm text-gray-700"
              placeholder="Nhập tiêu đề video của bạn và không được quá 20 kí tự nhé"
              v-model="videoTitle"
            />
          </div>
  
          <div>
            <label class="text-sm font-semibold text-gray-700 block mb-2">Mô tả (bắt buộc)</label>
            <textarea
              class="text-xs w-full p-2 border rounded-md text-gray-700"
              rows="4"
              placeholder="Giới thiệu về video của bạn cho người xem"
              v-model="videoDescription"
            ></textarea>
          </div>
  
          <!-- Lựa chọn thumbnail -->
          <div>
            <label class="text-sm font-semibold text-gray-700 block mb-2">Lựa chọn thumbnail của bạn</label>
            <div class="flex space-x-4">
              <!-- Upload thumbnail -->
            <div
              class="relative flex flex-col justify-center items-center w-40 h-24 border-2 border-gray-300 rounded-md cursor-pointer transition hover:border-blue-500 hover:bg-blue-50"
              @click="selectUploadThumbnail"
            >
              <input
                type="file"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
                @change="handleUploadChange"
                :disabled="selectedOption === 'auto-generate'"
              />
              <div v-if="uploadThumbnail" class="w-full h-full">
                <img :src="uploadThumbnail" alt="Thumbnail" class="w-full h-full object-contain rounded-md" style="object-fit: cover;" />
              </div>
              <div v-else>
                <i class="bx bx-image-add text-3xl"></i>
                <p class="text-sm font-medium mt-2">Tải tệp lên</p>
              </div>
            </div>

              <!-- Auto-generate thumbnail -->
              <div
                class="relative flex flex-col justify-center items-center w-40 h-24 border-2 border-gray-300 rounded-md cursor-pointer transition hover:border-blue-500 hover:bg-blue-50 overflow-hidden"
                @click="generateThumbnail"
              >
                <div v-if="generatedThumbnail" class="w-full h-full">
                  <img 
                    :src="generatedThumbnail" 
                    alt="Generated Thumbnail" 
                    class="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div v-else class="flex justify-center items-center h-full w-full text-center">
                  <p class="text-sm font-medium">Tạo tự động</p>
                </div>
              </div>


              
            </div>
            <label class="text-sm font-semibold text-gray-700 block mt-2 ">Nếu đã chọn ảnh mà muốn chọn lại phải ấn reset nhé</label>
          
            
          </div>
        </div>
  
        <!-- Cột bên phải -->
        <div class="flex flex-col w-1/2 space-y-4">
          <label class="text-sm font-semibold text-gray-700 block">Xem trước video</label>
          <video
            controls
            class="w-[300px] h-[170px] rounded-lg shadow-lg object-cover"
            :src="videoUrl"
          ></video>
          <div class="truncate-text">
            <h2>{{ videoTitle }}</h2>
          </div>
        </div>
      </div>
  
      <!-- Nút xác nhận -->
      <div>
        <button
          class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          @click="resetForm"
        >
          Reset lại thông tin
        </button>
        <button
          class="px-6 py-3 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
          @click="submitForm"
        >
          Xác nhận
        </button>
      </div>
    </div>
  </template>
  <style>
  
</style>
  
  <script>

  import { toast } from 'vue3-toastify';
  export default {
    
    name: "ReviewVideo",
    props: {
      videoUrl: { type: String, required: true },
      videoName: { type: String, required: true },
      videoSize: { type: Number, required: true },
      videoType: { type: String, required: true },
    },
    data() {
      return {
        videoTitle: '',
        videoDescription: '',
        selectedOption: null, // 'upload' hoặc 'auto-generate'
        uploadThumbnail: null, // URL của thumbnail tải lên
        generatedThumbnail: null, // URL của thumbnail tự tạo
        thumbnailFile: null, // File thực tế của thumbnail
      };
    },
   methods: {
  selectUploadThumbnail() {
    // Khi chọn upload, xóa thumbnail tự tạo nếu có
    if (this.generatedThumbnail) {
      this.generatedThumbnail = null;
      this.thumbnailFile = null;
    }
    this.selectedOption = 'upload';
  },
  generateThumbnail() {
    if (this.uploadThumbnail) {
      this.uploadThumbnail = null;
      this.thumbnailFile = null;
    }

    const video = document.createElement("video");
    video.src = this.videoUrl;
    video.currentTime = 2; // Chọn giây thứ 2 của video làm thumbnail
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.generatedThumbnail = canvas.toDataURL("image/jpeg");

      // Chuyển đổi Data URL thành File và lưu vào thumbnailFile
      this.thumbnailFile = this.dataURLtoFile(
        this.generatedThumbnail,
        "generated-thumbnail.jpg"
      );
      this.$emit("thumbnail-selected", this.thumbnailFile); // Gửi file tới component cha
      this.selectedOption = "auto-generate";
    };
  },
  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  },
  handleUploadChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.uploadThumbnail = URL.createObjectURL(file); // Hiển thị preview
      this.thumbnailFile = file; // Lưu file thực tế để gửi đi
      this.$emit("thumbnail-selected", file); // Gửi file tới component cha
      this.selectedOption = "upload";
    }
  },
  resetBothThumbnails() {
    // Reset cả hai thumbnail
    this.uploadThumbnail = null;
    this.generatedThumbnail = null;
    this.thumbnailFile = null;
    this.selectedOption = null;
  },
  //toast
  showErrorToast() {
        toast.error(`Vui lòng nhập đầy đủ thông tin  `, {
          autoClose: 3000,
          position: 'top-right',
        });
      },
  submitForm() {
  
    // Kiểm tra xem tiêu đề và thumbnail đã được nhập chưa
    if (!this.videoTitle || !this.thumbnailFile || !this.videoDescription) {
    this.showErrorToast()
    return;
  }

    // Gửi thông tin về component cha qua sự kiện
    console.log("Gửi sự kiện confirm-review");
    this.$emit("confirm-review", {
      title: this.videoTitle,
      description: this.videoDescription,
      thumbnail: this.thumbnailFile, // File thực tế (tự tạo hoặc upload)
      videoUrl: this.videoUrl,
      
    });
  },
  resetForm() {
    // Reset form và thumbnail
    this.videoTitle = "";
    this.videoDescription = "";
    this.resetBothThumbnails();
  },
},

  };
  </script>
  
  
  