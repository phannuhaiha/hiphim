<template>
    <div class="min-h-screen p-6">
        <div class="flex flex-col space-y-3 bg-auto rounded shadow p-6 ">
            <h1 class="text-2xl font-bold dark:text-white">Nội dung</h1>

            <div class="flex w-full space-x-4">
                <!-- Thanh tìm kiếm -->
                <div class="flex w-[50%]">
                    <input type="text" v-model="searchQuery" placeholder="Search"
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />

                </div>

                <!-- Bộ lọc thời gian và trạng thái -->
                <div class="flex space-x-4 w-[50%]">
                    <button @click="setList('verified')" :class="{
                        'bg-gray-700 text-white': currentList === 'verified',
                        'bg-gray-200 text-gray-800 hover:underline': currentList !== 'verified'
                    }" class="flex rounded-md bg-gray-200 text-gray-800 hover:underline px-4 items-center"> Đã duyệt
                    </button>
                    <button @click="setList('unverified')" :class="{
                        'bg-gray-700 text-white': currentList === 'unverified',
                        'bg-gray-200 text-gray-800 hover:underline': currentList !== 'unverified'
                    }" class="flex rounded-md bg-gray-200 text-gray-800 hover:underline px-2 items-center"> Chưa duyệt
                    </button>
                </div>
            </div>

            <div class="overflow-y-auto max-h-[400px] pr-2">
                <table class="table-auto w-full border-collapse ">
                    <thead>
                        <tr class="w-full bg-gray-100 border-b border-gray-300 dark:bg-slate-700 dark:text-white">
                            <th class="w-[1%] p-2 text-left">STT</th>
                            <th class="w-[10%] p-2 text-left ">Thumbnail</th>
                            <th class="w-[30%] p-2 text-left">Mô tả video</th>
                            <th class="w-[15%] p-2 text-left">Thời gian đăng</th>
                            <th class="w-[10%] p-2 text-left">Tác giả</th>
                            <th class="w-[10%] p-2 text-left">Trạng thái</th>
                            <th class="w-[15%] p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(video, index) in displayedVideos" :key="index"
                            class="border-b border-gray-300 dark:text-white">
                            <td class="w-[1%] p-2 items-center">{{ video.stt }}</td>
                            <!-- thumbnail -->
                            <td class="w-[10%] p-2 cursor-pointer">
                                <img @click="showModal('showvideo', video.url, index)" :src="video.thumbnail"
                                    alt="Thumbnail" class="w-16 h-16 rounded" />
                            </td>
                            <td class="w-[30%] p-2 text-left">
                                <div class="flex w-full flex-col space-y-2">
                                    <span
                                        class="flex w-[390px] font-bold text-base overflow-hidden whitespace-nowrap overflow-ellipsis">{{
                                            video.title }}</span>
                                    <span
                                        class="flex text-sm w-[390px]  whitespace-nowrap overflow-ellipsis overflow-hidden">{{
                                            video.description }}</span>
                                </div>
                            </td>
                            <td class="w-[15%] p-2 text-left">{{ video.created_at }}</td>
                            <td class="w-[10%] p-2 text-left">{{ video.user.name }}</td>
                            <td class="w-[10%] p-2 text-left">{{ video.verified }}</td>
                            <!-- Action -->
                            <td v-if="currentList == 'unverified'" class="w-[15%]  ">
                                <div class="flex items-center gap-4 text-3xl">
                                    <!-- <button @click="videoVerifition(video.slug)"><i class="bx bx-check text-blue"></i></button>
                  <button @click="deleteVideo(video.slug)"><i class="bx bx-x text-rose-600"></i></button> -->
                                    <button @click="showModal('verificationVideo', video.slug, index)"><i
                                            class="bx bx-check text-blue"></i></button>
                                    <button @click="showModal('deleteVideo', video.slug, index)"><i
                                            class="bx bx-x text-rose-600"></i></button>
                                </div>
                            </td>

                            <td v-else-if="currentList == 'verified'" class="w-[15%]  ">
                                <div class="flex items-center gap-4 text-3xl">
                                    <!-- <i class="bx bx-x"></i> -->
                                    <button @click="showModal('deleteVideoVerification', video.slug, index)"><i
                                            class="bx bx-trash text-rose-600"></i></button>
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
                <div ref="loadMoreTrigger" class="loading">Đang tải...</div>

                <div v-if="showConfirmModal"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div v-if="typeModal == 'verificationVideo'" class="bg-white p-6 rounded-md shadow-md">
                        <p>Bạn có chắc muốn duyệt video không?</p>
                        <div class="flex justify-between space-x-4 mt-4">
                            <button @click="videoVerifition()" class="px-4 py-2 bg-green text-black rounded">Có</button>
                            <button @click="cancelDelete()" class="px-4 py-2 bg-red text-black rounded">Không</button>
                        </div>
                    </div>

                    <div v-else-if="typeModal == 'deleteVideo'" class="bg-white p-6 rounded-md shadow-md">
                        <p>Bạn có chắc muốn xóa vĩnh viễn không?</p>
                        <div class="flex justify-between space-x-4 mt-4">
                            <button @click="deleteVideo()" class="px-4 py-2 bg-green text-black rounded">Có</button>
                            <button @click="cancelDelete()" class="px-4 py-2 bg-red text-black rounded">Không</button>
                        </div>
                    </div>

                    <div v-else-if="typeModal == 'deleteVideoVerification'" class="bg-white p-6 rounded-md shadow-md">
                        <p>Bạn có chắc muốn xóa vĩnh viễn không?</p>
                        <div class="flex justify-between space-x-4 mt-4">
                            <button @click="deleteVideoVerification()"
                                class="px-4 py-2 bg-green text-black rounded">Có</button>
                            <button @click="cancelDelete()" class="px-4 py-2 bg-red text-black rounded">Không</button>
                        </div>
                    </div>

                    <!-- modal 1-->
                    <div v-else-if="typeModal == 'showvideo'" class="flex items-center justify-center w-full h-full">
                        <div
                            class="flex flex-col space-y-2 items-center justify-center w-[850px] h-[500px] shadow-lg rounded-xl bg-auto">
                            <div class="flex w-full ">
                                <button @click="cancelDelete()"
                                class="absolute flex items-center top-2 left-1/2 transform -translate-x-1/2 bg-gray-300 bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-70">
                                    <i class="bx bx-x text-3xl font-bold"></i>
                                    <span class="text-xl">Đóng</span>
                                    
                                </button>
                            </div>

                            <!-- video demo -->
                            <div class="flex max-w-full h-full aspect-video rounded-xl justify-center ">
                                <video controls class="max-w-full max-h-full rounded-xl object-cover"
                                    ref="videoPlayer"></video>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import csrf from '@/config/csrf';
import axios from '@/config/axios';
import Hls from "hls.js";
import boxicons from 'boxicons';
import { checkAuthAdmin } from '@/config/admin';

export default {
    data() {
        return {
            currentList: 'verified',
            videos: [],
            displayedData: [],
            itemsPerload: 10,
            observer: null,
            showConfirmModal: false,
            slugDeleteVideo: null,
            typeModal: null,
            user: [],
            rowToDelete: null,
            searchQuery: '',


        };
    },
    computed: {
        displayedVideos() {
        if (!this.searchQuery) {
            return this.displayedData; // Nếu không có tìm kiếm, hiển thị toàn bộ danh sách
        }
        return this.displayedData.filter(video =>
            video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
    },
    methods: {
        showModal(typeModal, slug, index) {
            this.showConfirmModal = true;
            this.typeModal = typeModal
            this.slugDeleteVideo = slug
            this.rowToDelete = index
            if (typeModal === 'showvideo') {
                this.$nextTick(() => {
                    this.playVideo(slug);
                });
            }
        },
        async setList(typeList) {
            this.currentList = typeList;
            await this.getVideo(typeList);
            this.displayedData = this.videos.slice(0, this.itemsPerLoad);
        },
        async getVideo(typeVideo) {
            try {
                const token = csrf.getCookieAdmin();
                const response = await axios.get(`admin/get-video/${typeVideo}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                this.videos = response.videos || [];
                console.log(response)
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            }
        },
        setupObserver() {
            this.$nextTick(() => {
                if (this.$refs.loadMoreTrigger) {
                    this.observer = new IntersectionObserver(entries => {
                        if (entries[0].isIntersecting) {
                            this.loadMore();
                        }
                    });
                    this.observer.observe(this.$refs.loadMoreTrigger);
                }
            });
        },
        loadMore() {
            if (this.displayedData.length >= this.videos.length) return;
            const nextItems = this.videos.slice(this.displayedData.length, this.displayedData.length + this.itemsPerLoad);
            this.displayedData = [...this.displayedData, ...nextItems];
        },
        async videoVerifition() {
            if (!this.slugDeleteVideo) return;
            try {
                const token = csrf.getCookieAdmin()
                const response = await axios.get(`admin/video-verifition/${this.slugDeleteVideo}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                this.setList('unverified');
                this.setupObserver();
            } catch (error) {
                console.log(error)
            } finally {
                this.cancelDelete()
            }
        },
        async deleteVideo() {
            if (!this.slugDeleteVideo) return;
            try {
                const token = csrf.getCookieAdmin()
                const response = await axios.get(`admin/delete-video/${this.slugDeleteVideo}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                // this.setList('unverified');
                // this.setupObserver();
                if (this.rowToDelete !== null) {
                    this.displayedData.splice(this.rowToDelete, 1);
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.cancelDelete()
            }
        },
        async deleteVideoVerification() {
            if (!this.slugDeleteVideo) return;
            try {
                const token = csrf.getCookieAdmin()
                const response = await axios.get(`admin/delete-video/${this.slugDeleteVideo}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                // this.setList('verified');
                // this.setupObserver();
                if (this.rowToDelete !== null) {
                    this.displayedData.splice(this.rowToDelete, 1);
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.cancelDelete()
            }
        },
        cancelDelete() {
            this.slugDeleteVideo = null
            this.showConfirmModal = false;
            this.typeModal = null
            this.rowToDelete = null
        },
        playVideo(src) {
            const video = this.$refs.videoPlayer;

            if (Hls.isSupported()) {
                this.hls = new Hls();
                this.hls.loadSource(src);
                this.hls.attachMedia(video);

                this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    console.log("Manifest loaded, video ready to play!");

                    var playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.then(_ => {

                        })
                            .catch(error => {

                            });
                    }
                });

                this.hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error("HLS Error:", data);
                });
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                // Hỗ trợ native HLS trên Safari
                video.src = src;
                video.addEventListener("loadedmetadata", () => {
                    video.play();
                });
            } else {
                console.error("HLS is not supported on this browser.");
            }
        },

    },
    async mounted() {
        await this.setList('verified');
        this.setupObserver();
        this.user = await checkAuthAdmin()
    },
    beforeUnmount() {
        if (this.observer) this.observer.disconnect();
    }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
