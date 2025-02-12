<template>
  <div :class="[isOpen ? 'w-48' : 'w-20', isDarkMode ? 'bg-gray-800' : 'bg-slate-100']"
  class="fixed z-50 text-black min-h-screen transition-all duration-300 ease-in-out p-3 shadow-right">
    <div class="flex flex-col space-y-4 ">
         <!-- logo -->
          
            <div :class="[isOpen ? 'flex' : 'hidden']" class="flex w-auto bg-auto  items-center justify-center">
              <router-link to="/admin/earning">
                <div class="flex bg-auto items-center justify-center py-2 text-white text-4xl font-bold" style="width: 150px; height: 70px;">
                 <img src="../icons/NewLogo.png" class="flex w-full h-full">
              </div>
              </router-link>
              
           </div>
          
        <!-- list choose -->
        <div class="w-100% flex flex-col space-y-5 text-black items-center">
           <!-- Quản lý doanh thu -->
           <router-link to="/admin/earning">
              <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu ">
              <i class="bx bx-home icon"></i>
              <span :class="isOpen ? '':'text-xs'" class="content">Trang chủ</span>
            </button>
             </router-link>

          <!-- quan lys noi dung -->
          <router-link to="/admin/video">
            <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu">
                <i class="bx bx-book-open icon"></i>
                <span :class="isOpen ? '':'text-xs'"  class="content  ">Nội dung</span>
            </button>
          </router-link>
            
            
            <!-- quan ly tai khoan -->
             <router-link to="/admin/account">
              <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu ">
              <i class="bx bx-user-circle icon"></i>
              <span :class="isOpen ? '':'text-xs'" class="content">Tài khoản</span>
            </button>
             </router-link>

            <!-- Quản lý quảng cáo-->
             <router-link>
              <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu ">
              <i class="bx bx-tv icon"></i>
              <span :class="isOpen ? '':'text-xs'" class="content ">Quảng cáo</span>
            </button>
             </router-link>

             <!-- Thoong bao -->
              <router-link>
                <button :class="isOpen ? 'flex-row space-x-2' : 'flex-col space-y-1'" class="navmenu ">
                <i class="bx bx-bell icon "></i>
                <span :class="isOpen ? '':'text-xs'" class="content">Thông báo</span>
              </button>
              </router-link>
              
            

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
        default: false, 
      },
      isDarkMode: {
        type: Boolean,
        default: false, 
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
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  font-family: 'Roboto';
  display: inline-block; 
  width: 100%; 
}
.content:hover{
  text-decoration: underline;
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
