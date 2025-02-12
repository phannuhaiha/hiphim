<template>
    <div class="flex w-screen h-screen items-center justify-center"> 
        <div class="flex md:flex-row flex-col w-[80%] max-w-[1200px] md:h-[60%] h-full max-h-[3000px] bg-gray-200 rounded-xl font-roboto " >
            <!-- tieeu de -->
             <div class=" flex flex-col text-black text-arial md:ml-8 md:mt-8 md:w-1/4 w-auto h-1/3 items-center md:items-start">
                <!-- Logo -->
                 <div class="bg-auto items-center rounded-full py-2 text-white text-2xl font-bold" style="width: 150px; height: 70px;">
                   <img src="@/components/icons/NewLogo.png" class="flex w-full h-full">
                 </div>
                <h1 class="text-2xl font-bold justify-center">ĐĂNG KÍ TÀI KHOẢN MỚI</h1> 
             </div>
             <!-- thong tin co ban -->
            <div class="flex flex-col md:justify-center justify-between text-xl gap-2 md:w-1/3 w-auto md:h-auto h-[50%] md:p-3 mx-2  ">
                <!-- ho ten -->
                 <div class="flex flex-col gap-8  w-auto h-[30%] ">
                    <!-- ho -->
                    <div class="flex flex-col gap-1 w-auto h-[30%] ">
                        <label class="font-bold">Nhập họ của bạn: </label>
                        <input id="lastname" placeholder=" Nhập họ của bạn (không bắt buộc)" class="flex rounded text-base">
                    </div>
                    <!-- ten -->
                    <div class="flex flex-col w-auto gap-1 h-[30%]">
                        <label class="font-bold">Nhập tên của bạn: </label>
                        <input id="fistname" placeholder=" Nhập tên của bạn (bắt buộc)" class="flex rounded text-base">
                    </div>
                 </div>
                 
                 <!-- ngay+than+nam sinh -->
                 <div class="flex md:flex-row flex-col gap-5 w-auto md:h-[15%]  ">
                    <!-- ngay -->
                     <div class="flex md:flex-col  flex-row justify-between w-[35%] md:h-[10%]">
                        <label class="font-bold">Ngày: </label>
                        <input type="number" id="quantity" name="quantity" min="1" max="31" step="1" class="flex rounded text-base">
                     </div>
                     <!-- thang -->
                     <div class="flex md:flex-col  flex-row justify-between w-[35%] md:h-[10%]">
                        <label class="font-bold">Tháng: </label>
                        <input type="number" id="quantity" name="quantity" min="1" max="12" step="1" class="flex rounded text-base">
                     </div>
                     <!-- nam -->
                     <div class="flex md:flex-col  flex-row justify-between w-[35%] md:h-[10%]">
                        <label class="font-bold">Năm: </label>
                        <input type="number" id="quantity" name="quantity" min="1900" max="2024" step="1" class="flex rounded text-base">
                     </div>           
                 </div>
                 <!-- Gioi tinh -->
                 <div class="flex flex-row justify-between gap-2 w-[75%] h-[12%] ">
                    <div class="flex flex-row gap-5 w-auto h-auto">
                        <label class="font-bold">Giới tính: </label>
                        <select name="sex" id="sex" class="flex rounded">
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Giới tính thứ ba"> Giới tính thứ ba</option>
                        </select>
                    </div>
                 </div>
            </div>
            <!-- thong tin dang nhap -->
            <div class="flex flex-col md:justify-center justify-between gap-1 md:gap-5 text-xl md:w-1/3 w-auto md:h-auto h-[50%] md:p-3 mx-2 ">
                <!-- email -->
                <div class="flex flex-col gap-1 w-auto md:h-[15%]">
                    <label class="font-bold">Nhập địa chỉ email: </label>
                    <input id="email" placeholder=" Nhập địa chỉ email" class="flex rounded text-base">
                </div>
                <!-- mật khẩu -->
                <div class="flex flex-col gap-1 w-auto md:h-[15%] font-roboto">
                    <label class="font-bold">Nhập mật khẩu: </label>
                    <div class="relative flex items-center">
                    <!-- Input mật khẩu -->
                     <input v-model="password" :type="isPasswordVisible ? 'text' : 'password'" placeholder="Nhập mật khẩu" class="flex rounded border-gray-300 w-full p-2 text-base"/>
                    <!-- Nút mở/đóng -->
                     <button type="button" @click="togglePasswordVisibility" class="absolute right-2 text-gray-500">{{ isPasswordVisible ? '🙈' : '👁️' }}</button>
                    </div>
                </div>
                 <!-- nhap lai mật khẩu -->
                 <div class="flex flex-col gap-1 w-auto md:h-[15%]">
                    <label class="font-bold">Nhập lại mật khẩu: </label>
                    <div class="relative flex items-center">
                    <!-- Input mật khẩu -->
                     <input v-model="confirmPassword" :type="isPasswordVisible ? 'text' : 'password'" placeholder="Nhập lại mật khẩu" class="flex rounded border-gray-300 text-base w-full p-2"/>
                    <!-- Nút mở/đóng -->
                     <button type="button" @click="togglePasswordVisibility" class="absolute right-2 text-gray-500">{{ isPasswordVisible ? '🙈' : '👁️' }}</button>
                    </div>
                    <p v-if="passwordsMatch === false" class="text-red text-sm">*Đã nhập sai mật khẩu</p>
                </div>
                <div class="flex justify-end mt-1">
                    <button @click="handleSubmit"
                    class="flex items-center justify-center bg-white from-blue-500 to-purple-600 text-black dark:text-white dark:bg-gray-700 font-bold py-2 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 w-30 h-10">
                       <text class="text-sm text-black dark:text-white">Đăng ký</text>
                    </button>
                </div>
                <p v-if="errorMessage" class="text-red text-sm mt-2">*{{ errorMessage }}</p>
                
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            isPasswordVisible: false, // Trạng thái ẩn/hiện mật khẩu
            password: '',
            confirmPassword: '',
            lastname: '',
            firstname: '',
            email: '',
            day: '',
            month: '',
            year: '',
            gender: '',
            errorMessage: '',
        };
    },
    computed: {
        passwordsMatch() {
            return this.password === this.confirmPassword;
        }
    },
    methods: {
        togglePasswordVisibility() {
            // Thay đổi trạng thái của mật khẩu
            this.isPasswordVisible = !this.isPasswordVisible;
        },
        validateInputs() {
            if (!this.firstname) {
                this.errorMessage = "Bạn cần phải nhập tên của bạn.";
                return false;
            }
            if (!this.email) {
                this.errorMessage = "Bạn cần phải nhập địa chỉ email.";
                return false;
            }
            if (!this.password) {
                this.errorMessage = "Bạn cần phải nhập mật khẩu.";
                return false;
            }
            if (!this.confirmPassword) {
                this.errorMessage = "Bạn cần phải nhập lại mật khẩu.";
                return false;
            }
            if (!this.passwordsMatch) {
                this.errorMessage = "Mật khẩu và xác nhận mật khẩu không khớp.";
                return false;
            }
            if (!this.day || !this.month || !this.year) {
                this.errorMessage = "Bạn cần phải chọn ngày, tháng, năm sinh.";
                return false;
            }
            if (!this.gender) {
                this.errorMessage = "Bạn cần phải chọn giới tính.";
                return false;
            }
            this.errorMessage = ''; // Xóa thông báo lỗi nếu tất cả hợp lệ
            return true;
        },
        handleSubmit() {
            if (this.validateInputs()) {
                alert("Đăng ký thành công!");
                // Xử lý đăng ký ở đây
            }
        }
    }

}
</script>

<style>

</style>
