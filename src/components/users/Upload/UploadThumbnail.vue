<template>
    <div
      class="relative flex flex-col justify-center items-center w-40 h-24 border-2 border-gray-300 rounded-md cursor-pointer transition hover:border-blue-500 hover:bg-blue-50"
    >
      <!-- Input file -->
      <input
        type="file"
        accept="image/*"
        class="absolute inset-0 opacity-0 cursor-pointer"
        @change="handleFileChange"
        :disabled="isDisabled"
      />
  
      <!-- Hiển thị hình ảnh hoặc icon -->
      <div v-if="selectedImage" class="w-full h-full">
        <img
          :src="selectedImage"
          alt="Hình đã chọn"
          class="w-full h-full object-cover rounded-md"
        />
      </div>
      <div v-else>
        <i class="bx bx-image-add text-3xl"></i>
        <p class="text-sm font-medium mt-2">Tải tệp lên</p>
      </div>
  
      <!-- Dấu hỏi -->
      <i
        class="bx bx-question-mark-circle text-gray-400 absolute top-2 right-2 text-xl"
      ></i>
    </div>
  </template>
  
  <script>
  export default {
    name: "UploadThumbnail",
    props: {
      isDisabled: {
        type: Boolean,
        default: false,
      },
      selectedOption: { // Prop truyền vào để lắng nghe nguồn chọn (upload / auto-generate)
        type: String,
        required: true,
      },
    },
    data() {
      return {
        selectedImage: null, // Lưu trữ hình ảnh đã chọn
      };
    },
    methods: {
        handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    // Cập nhật hình ảnh đã chọn
    this.selectedImage = URL.createObjectURL(file);
    this.$emit("thumbnail-selected", this.selectedImage);

    // Nếu thumbnail auto-generate đã được chọn, reset thumbnail
    if (this.selectedOption === 'auto-generate') {
      console.log("Đã xóa thumbnail auto-generate");
      this.$emit("reset-thumbnail");  // Reset thumbnail auto
    }
  }
      },
    },
    watch: {
      // Khi isDisabled thay đổi, ta sẽ reset hình ảnh được chọn
      isDisabled(newVal) {
        if (newVal) {
          this.selectedImage = null;
          this.$emit("reset-thumbnail");
        }
      },
    },
  };
  </script>
  