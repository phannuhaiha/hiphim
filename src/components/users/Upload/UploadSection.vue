<template>
    <div class="flex flex-col w-full items-center justify-center bg-gray-50">
      <div class="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <div class="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-5l-4-4m0 0l-4 4m4-4v12" />
          </svg>
        </div>
        <p class="text-gray-700 text-center font-medium mb-2">Bấm vào nút tải lên để chọn video bạn muốn đăng </p>
        <p class="text-sm text-gray-500 text-center mb-6">Lưu ý vì lí do kinh phí nên dung lượng tối đa của video là dưới 100MB</p>
        <input 
          type="file" 
          id="file-input" 
          @change="handleFileSelect" 
          accept="video/*" 
          class="hidden"
        />
        <label for="file-input" class="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition cursor-pointer">
          Chọn tệp
        </label>
      </div>
    </div>
  </template>
  
  <script>
    import { toast } from 'vue3-toastify';
  export default {
    
    name: 'UploadSection',
    methods: {
      //toast
      showErrorToast(message) {
      toast.error(message, {
        autoClose: 3000,
        position: "top-right",
      });
    },
      handleFileSelect(event) {
        const file = event.target.files[0];
     
   

        this.videoDetails = {
          file: file, // Lưu file gốc
          name: file.name,
          size: file.size,
          type: file.type,
        };
       
        
        if (file) {
          this.$emit('file-selected', file); // Gửi file đã chọn tới component cha
        }
      },
    },
  };
  </script>
  