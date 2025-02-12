<template>
    <div class="w-full p-5">
        <div class="w-full py-2"><h1 class="bg-auto ml-4 text-lg sm:text-3xl font-bold font-roboto text-black dark:text-white ">PHIM ĐÃ XEM</h1></div>
        <div class="flex flex-row w-full bg-auto gap-3 ">
            <!-- Video -->
            <div class="grid gap-4">
      <div v-for="video in videos" :key="video.id" class="flex bg-white p-4 rounded-lg shadow-md">
        <img :src="video.thumbnail" class="w-40 h-24 object-cover rounded-lg" />
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-semibold">{{ video.title }}</h3>
          <p class="text-gray-500 text-sm">{{ video.channel }} • {{ video.views }} lượt xem</p>
        </div>
        <button class="text-gray-500 hover:text-red-500">✖</button>
      </div>
    </div>
             <!-- search -->
              <div class="flex flex-col space-y-2">
                <div class="relative mb-4 border-b border-gray-300">
      <input
        type="text"
        placeholder="Tìm kiếm phim đã xem"
        class="w-full p-2 pl-10 bg-purple-100 rounded-full focus:outline-none"
      />
      <i class="absolute bx bx-search left-3 top-2.5 text-gray-500"></i>
    </div>
    
    <!-- Delete Button -->
    <button class="flex items-center text-red-500 hover:text-red-700">
      <i class="bx bx-trash text-xl"></i>
      <span class="ml-2">Xóa tất cả phim đã xem</span>
    </button>
              </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [
        {
          id: 1,
          title: "JENNIE & Dominic Fike - Love Hangover (Lyrics Video)",
          channel: "Solitude",
          views: "190",
          thumbnail: "https://via.placeholder.com/160x90", // Thay bằng link thực tế
        },
        {
          id: 2,
          title: "TAEYEON 태연 'Why' MV (Dance ver.)",
          channel: "SMTOWN",
          views: "38 Tr",
          thumbnail: "https://via.placeholder.com/160x90",
        },
        {
          id: 3,
          title: "Quang Hùng MasterD x Gulfkanawut - แค่เรา (THUY TRIEU)",
          channel: "gulfkanawut",
          views: "2,3 Tr",
          thumbnail: "https://via.placeholder.com/160x90",
        },
      ],
    };
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
