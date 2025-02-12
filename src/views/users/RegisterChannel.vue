<template>
    <div :class="{ 'dark': isDarkMode }" class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <!-- Header -->
        <Header @toggle-theme="toggleTheme" :isDarkMode="isDarkMode" />

        <!-- Nội dung chính -->
        <div class="container">
            <div class="form-wrapper">
                <!-- Tiêu đề -->
                <h2 class="form-title">Tạo kênh của bạn</h2>

                <!-- Khung xem trước hình ảnh -->
                <div class="image-preview" :style="{ backgroundImage: uploadedImage ? `url(${uploadedImage})` : '' }">
                </div>
                <label for="fileUpload" class="upload-button">Chọn ảnh đại diện</label>
                <input type="file" id="fileUpload" accept="image/*" @change="previewImage" />

                <!-- Trường nhập liệu -->
                <div class="form-group">
                    <label class="form-label">Tên kênh</label>
                    <input type="text" v-model="name" class="form-input" placeholder="Nhập tên kênh của bạn" />
                </div>
                <div class="form-group">
                    <label class="form-label">Đường dẫn</label>
                    <input type="text" v-model="slug" class="form-input" placeholder="Ví dụ: LoliIzaBesttt" />
                </div>

                <!-- Nút hành động -->
                <div class="form-actions">
                    <button class="cancel-button" @click="cancelForm">Hủy</button>
                    <button class="submit-button" @click="submitForm">Tạo kênh</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import Header from '@/components/users/Header.vue';
import axios from '@/config/axios.js';
import csrf from '@/config/csrf';
import router from '@/router';
export default {
    name: 'RegisterChannelPage',
    components: {
        Header,
    },
    data() {
        return {
            uploadedImage: null,
            selectedImage: null,
            name: null,
            slug: null,
        };
    },
    methods: {
        previewImage(event) {
            const file = event.target.files[0];
            this.selectedImage = event.target.files[0]
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.uploadedImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async submitForm() {
            const token = csrf.getCookie()
            const formData = new FormData()
            formData.append("name", this.name)
            formData.append("slug", this.slug)
            formData.append("avatar", this.selectedImage)
            // for(const [key,value] of formData.entries()){
            //     console.log(key + ": " + value)
            // } 
            try {
                const response = await axios.post('channel/create', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    }
                })
                router.push('/product')
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        async checkChannel(token){
            try {
                const response = await axios.get('channel/check-unique',{
                    headers:{
                        "Authorization": `Bearer ${token}`,
                    }
                })
                router.push('/product')
                
            } catch (error) {
                console.log(error)
            }

        },
        cancelForm() {
            console.log('Form canceled');
            // Reset dữ liệu nếu cần
        },
    },
    mounted(){
        const token = csrf.getCookie()
        if(!token){
            router.push('/product')
        }
        this.checkChannel(token)

    }
};
</script>

<style scoped>
/* Căn giữa form */
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
    padding: 20px;
    margin: 0;
}

/* Form chính */
.form-wrapper {
    width: 500px;
    background: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Tiêu đề */
.form-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
}

/* Khung xem trước hình ảnh */
.image-preview {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #e0e0e0;
    margin: 0 auto 10px;
    background-size: cover;
    background-position: center;
}

/* Nút chọn ảnh */
input[type="file"] {
    display: none;
}

.upload-button {
    display: inline-block;
    margin: 10px auto 20px;
    padding: 10px 20px;
    font-size: 14px;
    background-color: #e0e0e0;
    color: #333;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #ccc;
}

/* Các trường nhập liệu */
.form-group {
    margin-bottom: 15px;
    text-align: left;
}

.form-label {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
    display: block;
}

.form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

/* Nút hành động */
.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.cancel-button,
.submit-button {
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cancel-button {
    background-color: transparent;
    color: #333;
    border: 1px solid #ccc;
}

.submit-button {
    background-color: #4285f4;
    color: white;
}

.submit-button:hover {
    background-color: #357ae8;
}
</style>
