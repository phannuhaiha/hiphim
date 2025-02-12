<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div class="flex flex-col  bg-white shadow-lg rounded-lg p-6 w-[50%] h-[50%] text-center ">
        <div class="flex justify-end w-full h-full   ">
            <div class="flex items-center py-1 px-3 rounded-full hover:bg-gray-300">
                <button
                    class=" text-xl text-bold rounded-full  ">
                    x
                </button>
            </div>
        </div>
        <div class="flex flex-col items-start bg-auto w-full h-full ">
            <h1 class="text-2xl font-bold text-black mb-4">Ôi Lỗi rồi! Bạn không thể thực hiện thao tác này</h1>
            <p class="text-gray-600 mb-4">
                 Bạn đang cố gắng truy cập khi chưa thực hiện đủ điều kiện yêu cầu.
             </p>
            <a
              href="#"
              class="text-blue underline  transition duration-200"
             >
            Tìm hiểu thêm.
             </a>
             <div class="flex justify-end w-full ">
                <button
                  class=" bg-red-600 text-white px-6 py-2 rounded-full bg-[#D83F3F] transition duration-200"
                  @click="handleClose"
                >
                  Close
                </button>
             </div>
        </div>
        
        
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleClose() {
        alert('Close button clicked!');
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  