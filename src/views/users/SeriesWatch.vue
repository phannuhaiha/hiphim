<template>
    <div class="flex  sm:justify-center x-full h-full mt-3">
        <div class="flex flex-col w-full sm:w-[80%] gap-2">
            <div class="flex flex-col space-y-2 sm:items-center sm:justify-center">
                <div class="flex flex-col gap-2">
                    <!-- video -->
                    <div
                        class="flex sm:w-[900px] sm:h-[500px] w-full h-[200px]  aspect-video rounded-xl justify-center">
                        <video controls class="max-w-full max-h-full rounded-xl object-cover" ref="videoPlayer"></video>
                    </div>

                    <!-- content -->
                     <div class="flex w-full justify-end space-x-2 ">
                        <button class="flex px-2 py-1 bg-gray-300 hover:bg-gray-600 sm:text-base text-sm dark:text-gray-100 rounded-md">Vietsub</button>
                        <button  class="flex px-2 py-1 bg-gray-300 hover:bg-gray-600 sm:text-base text-sm dark:text-gray-100 rounded-md">Thuyết minh</button>
                     </div>
                   <!-- title -->
                    <div class="flex flex-row space-x-2 pl-4 sm:pl-0">
                        <!-- thumbnail -->
                        <div class="flex w-[25%] h-28 sm:w-[160px] sm:h-[200px]">
                            <img :src="movie.thumbnail" alt="" class="w-full h-full">
                        </div>

                        <!-- title -->
                        <div class="flex flex-col space-x-3 w-[70%]  dark:text-gray-400 font-roboto text-ellipsis ">
                            <div class="sm:text-xl text-base font-semibold line-clamp-2">{{ movie.title }}</div>
                            
                            <div class="sm:text-base text-sm line-clamp-3 sm:line-clamp-4">{{ movie.description }}</div>
                        </div>
                         
                         

                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- <div></div> -->
</template>
<script>
import axios from '@/config/axios';
import { BE_BASE_URL_API } from '@/config/baseurl';
import router from '@/router';
import Hls from "hls.js";

export default {
    name: "SeriesWatch",
    data() {
        return {
            video: null,
            // videoUrl: 'https://huylab.click/api/load-video/playlist.m3u8',
            videoUrl: `${BE_BASE_URL_API}movie/get-file-movie/`,
            filename: 'playlist.m3u8',
            movie: [],

        }
    },
    props: ['slug'],
    methods: {
        async getVideo() {
            try {
                const response = await axios.get(`video/load-video/playlist.m3u8`)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        loadVideo(slug) {
            const video = this.$refs.videoPlayer;
            let viewed = false; // Biến để kiểm tra nếu video đã đạt đến 20%

            if (Hls.isSupported()) {
                // Sử dụng hls.js để phát video từ file .m3u8
                this.hls = new Hls();
                this.hls.loadSource(`${this.videoUrl}${slug}/${this.filename}`);
                this.hls.attachMedia(video);

                this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log("Manifest loaded, video ready to play!");

                    var playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Video bắt đầu tự động phát
                        })
                            .catch(error => {
                                // Nếu tự động phát bị chặn, có thể xử lý thêm
                            });
                    }
                });

                this.hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error("HLS Error:", data);
                });
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                // Hỗ trợ native HLS trên Safari
                video.src = `${this.videoUrl}${slug}/${this.filename}`;
                video.addEventListener("loadedmetadata", () => {
                    video.play();
                });
            } else {
                console.error("HLS is not supported on this browser.");
            }

            // Lắng nghe sự kiện timeupdate để tính phần trăm video đã xem
            video.addEventListener('timeupdate', () => {
                const currentTime = video.currentTime;
                const duration = video.duration;

                if (duration > 0) {
                    const percentWatched = (currentTime / duration) * 100;


                    // Kiểm tra nếu video đã xem được 20% và chưa được tính là lượt xem
                    if (!viewed && percentWatched >= 20) {

                        this.incrementView(this.videoInfo.slug); // Gọi phương thức để tăng lượt xem
                        viewed = true; // Đánh dấu là đã tính lượt xem
                    }
                }
            });
        },
        async incrementView(slug){
            try {
                const response = await axios.get(`movie/add-view/${slug}`)
            } catch (error) {
                console.log(error)
            }
        },
        async getInfoMovie(slug){
            try {
                const respone = await axios.get(`movie/get-movie/${slug}`)
                this.movie = respone.movie
            } catch (error) {
                console.log(error)
            }
        }

    },
    async mounted() {
        // await this.getVideo()
        if (this.slug != null) {
            await this.loadVideo(this.slug);
            await this.getInfoMovie(this.slug)
        } else {
            router.push('/')
        }

        console.log(this.slug)
    }
}
</script>
