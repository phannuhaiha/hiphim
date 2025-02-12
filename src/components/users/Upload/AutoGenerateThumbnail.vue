<template>
    <div>
      <!-- Nút tạo tự động -->
      <div
        v-if="!thumbnail"
        class="relative flex flex-col justify-center items-center w-40 h-24 border-2 border-gray-300 rounded-md cursor-pointer transition hover:border-blue-500 hover:bg-blue-50"
        @click="generateThumbnail"
      >
        <div class="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
          <p class="text-sm font-medium">Tạo tự động</p>
        </div>
      </div>
  
      <!-- Hiển thị thumbnail được tạo -->
      <div
        v-else
        class="flex flex-col items-center cursor-pointer"
        @click="selectThumbnail(thumbnail)"
      >
        <img
          :src="thumbnail"
          alt="Thumbnail"
          class="w-40 h-24 rounded-md border-2 transition hover:border-blue-500"
          :class="{ 'border-blue-500': selectedThumbnail === thumbnail }"
        />
        <p class="text-sm mt-2">Thumbnail đã tạo</p>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "AutoGenerateThumbnail",
    props: {
      videoUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        thumbnail: null, // Thumbnail được tạo từ video
        selectedThumbnail: null, // Thumbnail đã chọn
      };
    },
    methods: {
       async generateThumbnail() {
    this.thumbnail = await this.generateThumbnailFromVideo(this.videoUrl, 2);
    // Reset thumbnail khi tạo tự động
    if (this.selectedOption === 'upload') {
      this.$emit("reset-thumbnail");
    }
  },
  selectThumbnail(thumb) {
    this.selectedThumbnail = thumb;
    this.$emit("thumbnail-selected", thumb); // Truyền thumbnail đã chọn lên cha
  },
      async generateThumbnailFromVideo(videoUrl, second) {
        return new Promise((resolve) => {
          const video = document.createElement("video");
          video.src = videoUrl;
          video.crossOrigin = "anonymous";
          video.currentTime = second;
          video.onloadeddata = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/jpeg"));
          };
        });
      },
      selectThumbnail(thumb) {
        this.selectedThumbnail = thumb;
        this.$emit("thumbnail-selected", thumb); // Truyền thumbnail đã chọn lên cha
      },
    },
  };
  </script>
  
  