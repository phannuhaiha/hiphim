<template>
  <div 
  class="fixed z-50 w-48 bg-slate-100 text-black min-h-screen transition-all duration-300 ease-in-out p-3 shadow-right">
    <div class="flex flex-col space-y-4 ">
         <!-- logo -->
          
            <div  class="flex w-auto bg-auto  items-center justify-center">
              <router-link to="/admin/earning">
                <div class="flex bg-auto items-center justify-center py-2 text-white text-4xl font-bold" style="width: 150px; height: 70px;">
                 <img src="../icons/NewLogo.png" class="flex w-full h-full">
              </div>
              </router-link>
              
           </div>
          
        <!-- list choose -->
        <div class="w-[100%] flex flex-col text-black">
           <!-- Quản lý doanh thu -->
           <router-link to="/admin/earning">
              <button  class="navmenu w-[95%] h-12 flex-row space-x-2 ">
              <i class="bx bx-home icon w-[20%]"></i>
              <span  class="flex items-start whitespace-nowrap overflow-hidden text-ellipsis font-roboto w-[80%]">Trang chủ</span>
            </button>
             </router-link>

          <!-- quan lys noi dung -->
          <router-link to="/admin/video">
            <button  class="navmenu w-[95%] h-12 flex-row space-x-2">
                <i class="bx bx-book-open icon w-[20%]"></i>
                <span   class="flex items-start whitespace-nowrap overflow-hidden text-ellipsis font-roboto w-[80%] ">Nội dung video</span>
            </button>
          </router-link>
            
            
            <!-- Quản lý quảng cáo-->
             <!-- <router-link to="/admin/advert">
              <button class="navmenu flex-row space-x-2 ">
              <i class="bx bx-tv icon"></i>
              <span  class="content ">Quảng cáo</span>
            </button>
             </router-link> -->

             <!-- Thoong bao -->
              <router-link to="/admin/movie">
                <button  class="navmenu w-[95%] h-12 flex-row space-x-2">
                <i class="bx bx-bell icon w-[20%] "></i>
                <span  class="flex items-start whitespace-nowrap overflow-hidden text-ellipsis font-roboto w-[80%]">Quản lý phim</span>
              </button>
              </router-link>

              <!-- quan ly tai khoan -->
              <router-link to="/admin/account">
              <button  class="navmenu w-[95%] h-12 flex-row space-x-2 ">
              <i class="bx bx-user-circle icon w-[20%]"></i>
              <span  class="flex items-start whitespace-nowrap overflow-hidden text-ellipsis font-roboto w-[80%]">Tài khoản </span>
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
   
}
.content:hover{
  text-decoration: underline;
}
.navmenu{
  display: flex;
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
