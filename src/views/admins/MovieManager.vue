<template>
    <div class="min-h-screen p-6">
        <div class="flex flex-col space-y-3 bg-auto rounded shadow p-6 ">
            <h1 class="text-2xl font-bold dark:text-white">Nội dung</h1>

            <div class="flex w-full space-x-4">
                <!-- Thanh tìm kiếm -->
                <div class="flex w-[50%]">
                    <input type="text" placeholder="Search"
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
                </div>


                <div class="flex space-x-4 w-[50%]">
                    <button @click="toggleForm"
                        class="flex rounded-md bg-gray-200 text-gray-800 hover:underline px-4 items-center"> NHập thông
                        tin video
                    </button>
                </div>
                <!-- Modal Form -->
                <div v-if="showForm"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div class="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
                        <h2 class="text-lg font-semibold">Form nhập thông tin video</h2>
                        <form @submit.prevent="submitForm">
                            <div class="mt-2">
                                <label for="title" class="block text-gray-700">Tiêu đề Tên Phim :</label>
                                <input v-model="form.title" type="text" id="title"
                                    class="mt-1 p-2 w-full border rounded-md" />
                            </div>
                            <div class="mt-2">
                                <label for="title" class="block text-gray-700">link ảnh thumnail:</label>
                                <input v-model="form.title" type="text" id="title"
                                    class="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div class="mt-2">
                                <label for="description" class="block text-gray-700">Mô tả:</label>
                                <textarea v-model="form.description" id="description"
                                    class="mt-1 p-2 w-full border rounded-md"></textarea>
                            </div>
                            <div class="mt-4 flex justify-between">
                                <button type="submit" class="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-600">
                                    Gửi thông tin
                                </button>
                                <button @click="toggleForm" type="button"
                                    class="px-4 py-2 bg-red text-white rounded-md hover:bg-red-600">
                                    Đóng
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>

            <div class="overflow-y-auto max-h-[400px] pr-2">
                <table class="table-auto w-full border-collapse ">
                    <thead>
                        <tr class="w-full bg-gray-100 border-b border-gray-300 dark:bg-slate-700 dark:text-white">
                            <th class="w-[1%] p-2 text-left">STT</th>
                            <th class="w-[10%] p-2 text-left ">Thumbnail</th>
                            <th class="w-[30%] p-2 text-left">Tên phim</th>
                            <th class="w-[15%] p-2 text-left">Tên phụ</th>
                            <th class="w-[10%] p-2 text-left">Địa chỉ file</th>
                            <th class="w-[10%] p-2 text-left">Trạng thái</th>
                            <th class="w-[15%] p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(film, index) in filteredData" :key="index"
                            class="border-b border-gray-300 dark:text-white">
                            <td class="w-[1%] p-2 items-center">{{ index + 1 }}</td>
                            <!-- thumbnail -->
                            <td class="w-[10%] p-2 cursor-pointer">
                                <img @click="showModal('showvideo', film)" :src="films.thumbnail" alt="Thumbnail"
                                    class="w-16 h-16 rounded" />
                            </td>
                            <td class="w-[30%] p-2 text-left">
                                <div class="flex w-full flex-col space-y-2">
                                    <span
                                        class="flex w-[390px] font-bold text-base overflow-hidden whitespace-nowrap overflow-ellipsis">{{
                                            film.mainname }}</span>
                                    <!-- <span
                                        class="flex text-sm w-[390px]  whitespace-nowrap overflow-ellipsis overflow-hidden">{{
                                            film.description }}</span> -->
                                </div>
                            </td>
                            <td class="w-[15%] p-2 text-left">{{ film.name }}</td>
                            <td class="w-[10%] p-2 text-left"></td>
                            <td class="w-[10%] p-2 text-left">{{ film.status }}</td>
                            <!-- Action -->
                            <td v-if="currentList == 'unverified'" class="w-[15%]  ">
                                <div class="flex items-center gap-4 text-3xl">
                                    <!-- <button @click="videoVerifition(video.slug)"><i class="bx bx-check text-blue"></i></button>
                  <button @click="deleteVideo(video.slug)"><i class="bx bx-x text-rose-600"></i></button> -->
                                    <button @click="showModal('verificationVideo', video.slug)"><i
                                            class="bx bx-check text-blue"></i></button>
                                    <button @click="showModal('deleteVideo', video.slug)"><i
                                            class="bx bx-x text-rose-600"></i></button>
                                </div>
                            </td>

                            <td v-else-if="currentList == 'verified'" class="w-[15%]  ">
                                <div class="flex items-center gap-4 text-3xl">
                                    <!-- <i class="bx bx-x"></i> -->
                                    <button @click="showModal('deleteVideoVerification', film)">
                                        <i class="bx bx-trash text-rose-600"></i>
                                    </button>
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
                            class="flex flex-col space-y-2 items-center justify-center w-[850px] h-[500px] shadow-lg rounded-xl bg-gray-500">
                            <div class="flex w-full h-[6%] justify-end">
                                <button @click="cancelDelete()"
                                    class="flex text-xl max-w-full items-end justify-end hover:underline">
                                    <i class="bx bx-x text-3xl font-bold text-black"></i>Đóng
                                </button>
                            </div>

                            <!-- video demo -->
                            <div class="flex max-w-full h-[94%] aspect-video rounded-xl justify-center ">
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
            films: [ /* dữ liệu film */],
            showForm: false,  // Điều khiển việc hiển thị form
            form: {
                title: '',
                description: '',
            },
            films: [
                { stt: "1", thumbnail: "", mainname: "砂塵の彼方へ...", name: "dasdasdsa", },
                { stt: "2", thumbnail: "", mainname: "Rực rỡ quá", name: "Đẹp", },
                { stt: "3", thumbnail: "", mainname: "Thác nước", name: "Thác nước", },
                { stt: "4", thumbnail: "", mainname: "Genshit", name: "adasdas", },
                { stt: "5", thumbnail: "", mainname: "Cosplay", name: "", }
            ],
            displayedData: [],
            itemsPerload: 10,
            observer: null,
            showConfirmModal: false,
            slugDeleteVideo: null,
            typeModal: null,
            user: [],
            showForm: false,

        };
    },
    methods: {

        showModal(typeModal, slug) {
            this.showConfirmModal = true;
            this.typeModal = typeModal
            this.slugDeleteVideo = slug
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
        toggleForm() {
            this.showForm = !this.showForm;
        },
        // Handle form submission
        submitForm() {
            console.log('Form submitted with data:', this.form);
            // You can handle form data submission here (e.g., send to API)
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
                this.setList('unverified');
                this.setupObserver();
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
                this.setList('verified');
                this.setupObserver();
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
