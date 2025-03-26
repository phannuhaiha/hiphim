<template>
    <div class="flex w-full border border-gray-100 ">        
     <!-- Form Section -->
    <form @submit.prevent="handleSave" class="w-full ">
      <!-- Edit Button -->
      <div class="flex w-full justify-end mb-4">
        
            <button
          type="button"
          @click="toggleEdit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg bg-[#6C36FF] transition duration-300 hover:underline"
        >
          {{ isEditing ? "Lưu" : "Chỉnh sửa" }}
           </button>  
      </div>

      <div class="flex flex-row items-center justify-center w-full bg-gray-100 space-x-2 p-2 border-dashed border-2 border-gray-600 rounded-lg">
        <div class="flex flex-col  w-1/5">
            <div class="flex flex-row ">
                <div class="flex rounded-full">
                    <img 
                    :src="avatar"
                    class="w-32 h-32 rounded-full object-cover mx-auto mb-2 border"
                    alt="Avatar"/>
                </div>
                <!-- Upload Button -->
          <label
            class="flex items-end px-3 py-2 bg-auto text-gray-600 rounded-lg hover:underline hover:text-white transition duration-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            :class="{ 'cursor-not-allowed': !isEditing }"
          >
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              :disabled="!isEditing"
              class="hidden"
            />
            <i class="bx bx-upload text-lg"></i>
          </label>
                
      </div>
            
    </div>

    <div class="flex flex-col space-y-3 items-center justify-center w-2/5">
<!-- Input Fields -->
<div class="flex flex-col space-y-1 w-full m-2 ">
        <label for="username" class="block text-gray-700 font-semibold mb-2">Tên Người dùng</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          :disabled="!isEditing"
          class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue disabled:bg-gray-100"
        />
      </div>

      <div class="flex flex-col space-y-1 w-full m-2 ">
        <label for="channelName" class="block text-gray-700 font-semibold mb-2 ">Tên Kênh</label>
        <input
          type="text"
          id="channelName"
          v-model="form.channelName"
          :disabled="!isEditing"
          class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue disabled:bg-gray-100"
        />
      </div>
    </div>

    <div class="flex flex-col space-y-3 items-center justify-center w-2/5">
        <div class="flex flex-col space-y-1 w-full m-2 ">
        <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          :disabled="!isEditing"
          class="flex w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue disabled:bg-gray-100"
        />
      </div>

      <div class="flex flex-col space-y-1 w-full m-2 ">
        <label for="phone" class="block text-gray-700 font-semibold mb-2">Số điện thoại</label>
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          :disabled="!isEditing"
          class="flex w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue disabled:bg-gray-100"
        />
      </div>
    </div>
    </div>
      
      
    </form>

            </div>
</template>
<script>

export default {
  data() {
    return {
      isEditing: false,
      form: {
        username: "Nguyen Van A",
        channelName: "Kenh Yeu Thich",
        email: "nguyenvana@example.com",
        phone: "0123456789",
      },
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    handleSave() {
      console.log("Lưu thông tin:", this.form);
      this.isEditing = false;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatar = e.target.result; // Hiển thị ảnh đã tải lên
        };
        reader.readAsDataURL(file); // Đọc file ảnh
      }
    },
  },
};
</script>
