<template>
    <div class="series bg-white dark:bg-gray-900">
        <!-- noi dung chinh -->
        <div class="bg-auto flex flex-col space-y-2 sm:p-3">
            <h1 class="bg-auto text-3xl font-bold font-roboto text-black dark:text-white ml-3">PHIM BỘ</h1>
            <!-- container chứa list phim bộ -->
            <div  class="grid gap-4 bg-auto h-full" :class="isNavOpen ? 'sm:grid-cols-nav' : 'sm:grid-cols-auto'">
                <SeriesDetail />

            </div>

        </div>
    </div>
</template>

<script>
import SeriesDetail from '@/components/users/SeriesDetail.vue';


export default {
    name: 'Series',
    props: {
    isNavOpen: {
      type: Boolean,
      default: false, // Nhận trạng thái từ Home.vue
    },
  },
    components: {
    SeriesDetail,
  },

}
</script>

<style></style>
