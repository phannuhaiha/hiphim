<template>
    <div>
      <!-- Box container -->
      <div class="bg-auto p-4 w-full">
        <span class="flex w-full items-center text-2xl font-bold py-3 px-1">120.000 bình luận</span>
        <!-- Comment Input -->
        <div class="mb-4 flex items-center">
          <div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
          <input
            type="text"
            placeholder="Viết bình luận..."
            class="ml-4 w-full border-b border-gray-400  px-3 py-2 "
          />
        </div>
        <div class="flex w-full flex-col space-x-3">
            <!-- mot comment -->
            <div class="flex flex-row space-x-2 w-full">
                <!-- avt -->
                 <div class="flex items-start w-[4%]">
                    <div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                 </div>

                <!--Noi dung cmt  -->
                <div class="flex flex-col space-x-2 w-[89%] items-start pl-2">
                    <p class="font-semibold text-gray-900">@marcjunepailmao8198</p>
                    <p class="text-gray-600">IU never gets old 😲</p>

                    <!-- like+dislike + phan hoi -->
                    <div class="flex flex-row space-x-4 items-start">
                        <!-- like -->
                         <div class="flex flex-row space-x-2">
                            <i class="bx bx-like text-lg text-gray-400"></i>
                            <span class="text-base text-gray-400 ">123</span>
                         </div>
                         <!-- dislike -->
                         <div class="flex flex-row">
                            <i class="bx bx-dislike text-lg text-gray-400"></i>
                            <span class="text-base text-gray-400 "></span>
                         </div>
                         <!-- phan hoi -->
                       <button @click="toggleAnswer" class="text-base text-black font-semibold hover:underline">Phản hồi</button> 

                    </div>

                    <!-- hien thị các phản hồi nhỏ -->
                     <div class="flex flex-col space-x-2 pt-2 w-full">
                        <div v-if="answerOpen" class="flex flex-row space-x-3 w-full">
                            <!-- cmt phan hoi -->
                            <div class="mb-4 flex items-center w-full">
                                <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                                <input
                                    type="text"
                                    placeholder="Viết bình luận..."
                                    class="ml-4 w-full border-b border-gray-400  px-3 py-2 "
                                />
                            </div>

                        </div>
                        <button
                            @click="toggleDropdown"
                            class="text-[#0058c4dc] hover:bg-[#91bef5dc] rounded-full focus:outline-none w-[20%] text-center"
                         >
                          <!-- Conditional Chevron -->
                            <i
                             :class="dropdownOpen ? 'bx bx-chevron-up text-base' : 'bx bx-chevron-down text-base'"
                            > 9 phản hồi</i>
                         </button>
                     </div>
                     <!-- Dropdown content -->
                      <div
                        v-if="dropdownOpen"
                        class="flex mt-4 bg-auto w-full">
                        <!-- mot comment -->
                        <div class="flex flex-row space-x-2 w-full">
                            <!-- avt -->
                            <div class="flex items-start w-[4%]">
                               <div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                            </div>

                            <!--Noi dung cmt  -->
                            <div class="flex flex-col space-x-2 w-[89%] items-start pl-2">
                                 <p class="font-semibold text-gray-900">@marcjunepailmao8198</p>
                                 <p class="text-gray-600">IU never gets old 😲</p>

                                <!-- like+dislike + phan hoi -->
                                <div class="flex flex-row space-x-4 items-start">
                                    <!-- like -->
                                    <div class="flex flex-row space-x-2">
                                        <i class="bx bx-like text-lg text-gray-400"></i>
                                        <span class="text-base text-gray-400 ">123</span>
                                    </div>
                                        <!-- dislike -->
                                    <div class="flex flex-row">
                                        <i class="bx bx-dislike text-lg text-gray-400"></i>
                                        <span class="text-base text-gray-400 "></span>
                                    </div>
                                    <!-- phan hoi -->
                                    <button @click="toggleAnswer" class="text-base text-black font-semibold hover:underline">Phản hồi</button> 

                                </div>
                                <!-- hien thị các phản hồi nhỏ -->
                                <div class="flex flex-col space-x-2 pt-2 w-full">
                        <div v-if="answerOpen" class="flex flex-row space-x-3 w-full">
                            <!-- cmt phan hoi -->
                            <div class="mb-4 flex items-center w-full">
                                <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                                <input
                                    type="text"
                                    placeholder="Viết bình luận..."
                                    class="ml-4 w-full border-b border-gray-400 px-3 py-2 "
                                />
                            </div>

                        </div>
                        <button
                            @click="toggleDropdown"
                            class="text-[#0058c4dc] hover:bg-[#91bef5dc] rounded-full focus:outline-none w-[20%] text-center"
                         >
                          <!-- Conditional Chevron -->
                            <i
                             :class="dropdownOpen ? 'bx bx-chevron-up text-base' : 'bx bx-chevron-down text-base'"
                            > 9 phản hồi</i>
                         </button>
                     </div>
                                 <!-- Dropdown content -->
                                <div
                                v-if="dropdownOpen"
                                class="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                    <div class="text-sm text-gray-700">This is the dropdown content!</div>
                                </div>
                            </div>

                            <!-- dấu 3 chấm dọcdọc -->
                            <div class="flex w-[5%] items-start pt-3">
                                 <button class="text-gray-600 hover:text-gray-900 focus:outline-none">
                                 <!-- Vertical Dots Icon -->
                                    <i class="bx bx-dots-vertical-rounded text-xl"></i>
                                </button>
                            </div>
                
                        </div>
                     </div>
                </div>

                <!-- dấu 3 chấm dọcdọc -->
                <div class="flex w-[5%] items-start pt-3">
                     <button class="text-gray-600 hover:text-gray-900 focus:outline-none">
                      <!-- Vertical Dots Icon -->
                        <i class="bx bx-dots-vertical-rounded text-xl"></i>
                    </button>
                 </div>
                
            </div>

        </div>
  
        
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CommentLayout",
    data() {
    return {
      dropdownOpen: false, 
      answerOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleAnswer() {
      this.answerOpen = !this.answerOpen; 
    },
  },
  };
  </script>
  
  <style scoped>
  </style>
  