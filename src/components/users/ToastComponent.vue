<template>
    <div>
      <!-- Nút hiển thị thông báo -->
      <button @click="showSuccessToast">Hiển thị thành công</button>
      <button @click="showErrorToast">Hiển thị lỗi</button>
      <button @click="showInfoToast">Hiển thị thông tin</button>
      <button @click="showWarningToast">Hiển thị cảnh báo</button>
    </div>
  </template>
  
  <script>
  import { toast } from 'vue3-toastify';
  
  export default {
    name: 'ToastComponent',
    methods: {
      showSuccessToast() {
        toast.success('Đây là thông báo thành công!', {
          autoClose: 3000,
          position: 'top-right',
        });
      },
      showErrorToast() {
        toast.error('Đây là thông báo lỗi!', {
          autoClose: 3000,
          position: 'top-right',
        });
      },
      showInfoToast() {
        toast.info('Đây là thông báo thông tin!', {
          autoClose: 3000,
          position: 'top-right',
        });
      },
      showWarningToast() {
        toast.warning('Đây là thông báo cảnh báo!', {
          autoClose: 3000,
          position: 'top-right',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    margin: 10px;
    padding: 10px 15px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  