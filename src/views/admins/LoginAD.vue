<template>
    <div class="max-w-[720px] mx-auto">
      <div class="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px] mt-14 font-roboto">
        <h1 class="block w-full px-4 py-2 text-center text-slate-700 dark:text-gray-200 transition-all">
          ĐĂNG NHẬP ĐI NÈ <b>HiPHIM</b>.
        </h1>
      </div>
  
      <div class="w-full max-w-sm min-w-[200px] mx-auto font-roboto">
        <label class="block mb-1 text-sm text-slate-800 dark:text-gray-200">Email:</label>
  
        <input type="email" placeholder="admin@gmail.com" 
          title="Định dạng email có đuôi @gmail.com"
          class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-slate-100 text-sm border border-slate-200 rounded px-3 py-2 mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
           required />
        
          <label class="block mb-1 text-sm text-slate-800 dark:text-gray-200">Mật khẩu:</label>
          <div class=" relative flex items-center">
            <input v-model="password" :type="isPasswordVisible ? 'text' : 'password'" placeholder="*********"
                 title="Mật khẩu phải chứa chữ, số và kí tự đặc biệt"
                class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-slate-100 text-sm border border-slate-200 rounded px-3 py-2 mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                 required /> 
            <button type="button" @click="togglePasswordVisibility" class="absolute right-2 text-gray-500">{{ isPasswordVisible ? '🙈' : '👁️' }}</button>
          </div>
        <button
        @click="handleSubmit"
          class="w-full h-10 bg-slate-800 text-white text-sm rounded px-3 py-2 mb-4 hover:bg-slate-700 transition duration-300">
          Continue
        </button>
        <p v-if="errorMessage" class="text-red text-sm mt-2">*{{ errorMessage }}</p>  
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      isPasswordVisible: false,
      password: "",
      email: "",
      errorMessage: "",
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    validateInputs() {
      if (!this.email) {
        this.errorMessage = "Bạn cần phải nhập địa chỉ email.";
        return false;
      }
      if (!this.password) {
        this.errorMessage = "Bạn cần phải nhập mật khẩu.";
        return false;
      }
      this.errorMessage = ""; // Xóa thông báo lỗi nếu tất cả hợp lệ
      return true;
    },
    async handleSubmit() {
        if (this.validateInputs()) {
                alert("Đăng nhập thành công!");
                // Xử lý đăng nhập ở đây
            }
      
    },
  },
};
</script>

  
  <style>
  /* CSS */
  </style>
  