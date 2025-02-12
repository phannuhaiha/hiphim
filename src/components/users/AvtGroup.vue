<template>
  <div class="flex flex-row justify-between w-full p-2  bg-auto duration-300 transition-all overflow-hidden relative">
    <div class="flex overflow-hidden w-[80%]">
      <div 
      class="flex w-full bg-auto flex-row gap-2 transition-transform duration-500 ease-in-out "
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      
      <div v-for="(group, groupIndex) in groupedAvatars" :key="groupIndex" class="flex flex-shrink-0  gap-2">
        <div 
          v-for="(avatar, index) in group" 
          :key="index" 
          class="w-10 h-10 rounded-full bg-slate-600 "
          >
        </div>
      </div>
      
    </div>
    </div>
    
    <!-- Nút chuyển slide -->
     <div class="flex w-[10%] items-center justify-center">
      <button
      class="flex  bg-white text-black p-2 hover:text-gray-700-300"
      @click="nextSlide">
      <i class="bx bx-chevron-right text-2xl"></i>
    </button>
     </div>
    

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      avatars: Array(21).fill(null), // Mảng chứa các avatar (ví dụ có 21 cái)
    };
  },
  computed: {
    groupedAvatars() {
      const groups = [];
      for (let i = 0; i < this.avatars.length; i += 7) {
        groups.push(this.avatars.slice(i, i + 7));
      }
      return groups;
    },
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.groupedAvatars.length;
    }
  }
};
</script>

<style scoped>
.carousel {
  height: auto;
}
</style>
