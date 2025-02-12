<template>
    <div class="p-6 bg-gray-50 dark:bg-auto min-h-screen">
      <!-- Header -->
      <h1 class="text-2xl font-bold mb-6">Quản lý doanh thu</h1>
      <div class="flex flex-col w-full space-y-4">
        <div class="flex flex-row space-x-4">
          <!-- Main Total -->
        <div class="flex flex-col w-[70%] h-[350px] shadow bg-white rounded-md ">
          <!-- top -->
           <div class="flex p-4 justify-between ">
            <h2 class="font-semibold text-sm mb-4 text-gray-500">Revenue Report</h2>
            <div>
              <select class="border rounded p-2 text-sm">
                <option>JAN 2025</option>
                <option>JAN 2025</option>
                <option>JAN 2025</option>
                <option>JAN 2025</option>
                <!-- Các tùy chọn khác -->
              </select>
              <button class="ml-2 px-4 py-2 text-sm text-black bg-[#4F98EC] rounded hover:underline">Export</button>
            </div>

           </div>
           <!-- bieu do -->
            <div class="flex flex-row space-x-3 p-4 h-full ">
              <div class="flex flex-col  items-center space-y-4 w-[30%]">
               <div>
                <p class="text-sm text-black">Thu nhập tổng</p>
                 <p class="text-2xl font-bold">$234,340,000</p>
                 
               </div>
               <div>
                <div class="flex flex-row space-x-2 items-center">
                  <div class="flex w-3 h-3 bg-[#2777d1]"></div>
                  <p class="text-sm text-black">Doanh thu tháng này</p>
                </div>
                
                 <p class="text-2xl font-bold">$24,340,000</p>
              
               </div>
              </div>
              <div class="flex w-[70%] bg-gray-100 items-center justify-center rounded-lg">
                <!-- Biểu đồ 12 tháng -->
    <div class="grid grid-cols-12 gap-4 w-full h-[15rem] items-end">
      <div
        v-for="(month, index) in months"
        :key="index"
        class="flex flex-col items-center"
      >
        <!-- Thanh biểu đồ -->
        <div class="relative w-2 " :style="{ height: month.lightHeight + 'rem' }" >
          <!-- Thanh màu xanh lam nhạt -->
          <div class="bg-[#cce3fd] h-full rounded-t-md"></div>
          <!-- Thanh màu xanh lam đậm -->
          <div
            class="absolute bottom-0 bg-[#2777d1] w-full rounded-t-md"
            :style="{ height: month.darkHeight + '%' }"
          ></div>
        </div>
        <!-- Tên tháng -->
        <span class="mt-2 text-sm text-gray-600">{{ month.name }}</span>
      </div>
    </div>
              </div>
            </div>

        </div>
        <!-- Yearly Breakup  -->
        <div class="flex flex-col w-[30%] p-4 bg-white rounded-lg shadow">
          <h2 class="font-semibold text-lg mb-4">Yearly Breakup</h2>
          <div class="flex flex-row justify-between items-center">
            <div>
              <p class="text-2xl font-bold">$36,358</p>
              <p class="text-sm text-green-500">+ 2.5% last year</p>
            </div>
            <!-- Circle Graph -->
            <div class="relative flex items-center justify-center w-40 h-40">
              <div class="relative flex items-center justify-center w-32 h-32">
      <!-- Hình tròn đầy đủ (màu nhạt) -->
      <div class="absolute w-full h-full rounded-full border-4 border-gray-200"></div>

      <!-- Phần khuyết 180 độ (màu xanh lam) -->
      <div class="absolute w-full h-full rounded-full border-4 border-blue" style="clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%);"></div>
    </div>
</div>
          </div>
        </div>
        </div>
        <!-- Revenue Cards -->
        <div class="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <p class="text-xl font-bold">$24,340</p>
            <p class="text-sm font-bold">YouTube Premium</p>
            <p class="text-sm text-red-500">↓ $1,450 since last month</p>
          </div>
          <div class="p-4 bg-white rounded-lg shadow">
            <p class="text-xl font-bold">$24,340</p>
            <p class="text-sm font-bold">Quảng cáo</p>
            <p class="text-sm text-green-500">↑ 25.36% since last month</p>
          </div>
          <div class="p-4 bg-white rounded-lg shadow">
            <p class="text-xl font-bold">$24,340</p>
            <p class="text-sm font-bold">Super Chat</p>
            <p class="text-sm text-green-500">↑ 2.5% since last month</p>
          </div>
          <div class="p-4 bg-white rounded-lg shadow">
            <p class="text-xl font-bold">$24,340</p>
            <p class="text-sm font-bold">Other earnings</p>
            <p class="text-sm text-green-500">↑ 4% since last month</p>
          </div>
        </div>
        
      </div>
  
      
    </div>
  </template>
<script>
  

  export default {
  
  data() {
    return {
      months: [
        { name: "Jan", lightHeight: 12, darkHeight: 7.5 },
        { name: "Feb", lightHeight: 12, darkHeight: 50 },
        { name: "Mar", lightHeight: 12, darkHeight: 66 },
        { name: "Apr", lightHeight: 12, darkHeight: 80 },
        { name: "May", lightHeight: 12, darkHeight: 33 },
        { name: "Jun", lightHeight: 12, darkHeight: 25 },
        { name: "Jul", lightHeight: 12, darkHeight: 75 },
        { name: "Aug", lightHeight: 12, darkHeight: 40 },
        { name: "Sep", lightHeight: 12, darkHeight: 50 },
        { name: "Oct", lightHeight: 12, darkHeight: 60 },
        { name: "Nov", lightHeight: 12, darkHeight: 33 },
        { name: "Dec", lightHeight: 12, darkHeight: 100 },
      ],
    };
  },
};
</script>
  
  <style>
  
  
  </style>
  