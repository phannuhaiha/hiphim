<template>
  <div :class="[isOpen ? 'w-56' : 'w-20', isDarkMode ? 'bg-gray-800' : 'bg-slate-100']"
  class="fixed text-black min-h-screen transition-all duration-300 ease-in-out p-3 shadow-right">
    <div class="flex flex-col space-y-5 ">
         <!-- logo -->
        <div :class="[isOpen ? 'flex' : 'hidden']" class="flex w-auto bg-auto  items-center justify-center">
           <div class="flex bg-auto items-center justify-center py-2 text-white text-4xl font-bold" style="width: 120px; height: 70px;">
              <img src="../icons/Logo.png" class="flex w-full h-full">
           </div>
        </div>
       
        <!-- list choose -->
        <div class="w-100% flex flex-col space-y-5 text-black">
            <!-- quan lys noi dung -->
            <button :class="isOpen ? 'flex-row space-x-1' : 'flex-col space-y-1'" class="navmenu">
                <i class="bx bx-book-open icon "></i>
                <span :class="isOpen ? '':'text-xs'"  class="content ">Quản lý nội dung</span>
            </button>
            <!-- quan ly tai khoan -->
            <button :class="isOpen ? 'flex-row space-x-1' : 'flex-col space-y-1'" class="navmenu ">
              <i class="bx bx-user-circle icon"></i>
              <span :class="isOpen ? '':'text-xs'" class="content">Quản lý tài khoản</span>
            </button>
            <!-- Quản lý doanh thu -->
            <button :class="isOpen ? 'flex-row space-x-1' : 'flex-col space-y-1'" class="navmenu ">
              <i class="bx bx-chart icon"></i>
              <span :class="isOpen ? '':'text-xs'" class="content">Quản lý doanh thu</span>
            </button>
            <!-- Quản lý quảng cáo-->
            <button :class="isOpen ? 'flex-row space-x-1' : 'flex-col space-y-1'" class="navmenu ">
              <i class="bx bx-tv icon"></i>
              <span :class="isOpen ? '':'text-xs'" class="content">Quản lý quảng cáo</span>
            </button>

        </div>

    </div>

  </div>
</template>

<script>
import 'boxicons/css/boxicons.min.css';

export default {
    name: 'Nav',
    props: {
      isOpen: {
        type: Boolean,
        default: false, // Thanh nav bắt đầu ở trạng thái đóng
      },
      isDarkMode: {
        type: Boolean,
        default: false, // Trạng thái Dark Mode
      }
    },
    
  };


</script>

<style>

.icon{
  font-family: 'Boxicons'; 
  font-size: 1.875rem; 
  color: inherit; 
  transition: color 0.1s ease-in-out; 
  text-align: black;
}
.content {
  height: 1.5rem; 
  white-space: nowrap; /* Không xuống dòng */
  overflow: hidden; /* Ẩn phần nội dung vượt quá khung */
  text-overflow: ellipsis; /* Thêm dấu '...'  */
  font-family: 'Roboto';
  display: inline-block; /* Đảm bảo rút gọn hoạt động chính xác */
  width: 100%; 
}
.navmenu{
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: auto;
  border-radius: 0.125rem;
  transition: background-color 0.1s ease-in-out;
}

.navmenu:hover{
  background-color: #969ca5;
}
.dark .navmenu{
  color: #ededed;
}
.shadow-right{
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);
}
.hidden{
  display: none;
}


</style>
