<template>
  <div class="flex flex-col space-y-3 w-full">
    <div class="flex flex-row space-x-5 w-full">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div v-for="(plan, index) in plans" :key="index" class="bg-white shadow-lg rounded-xl p-6 text-center border">
          <h2 class="text-lg font-bold">{{ plan.title }}</h2>
          <p class="text-rose-700 mt-2">{{ plan.price }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ plan.description }}</p>
          <button @click="registerPremium()" :class="plan.primary ? 'bg-[#246fd8] text-white' : 'bg-[#6386de] text-[white]'"
            class="mt-4 py-2 px-4 rounded-full w-full font-semibold hover:bg-[#246fd8]">
            {{ plan.buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import csrf from '@/config/csrf';
import axios from '@/config/axios';

export default {
  data() {
    return {
      plans: [
        {
          title: "Cá nhân",
          price: "2.000 đ/tháng",
          description: "Mua gói tăng dung lượng upload lên 100MB Không bao gồm thuế GTGT",
          buttonText: "Dùng thử 1 tháng với giá 2000đ",
          primary: true
        },

      ]
    };
  },
  methods: {
    async registerPremium() {
      try {
        const token = csrf.getCookie()
        const response = await axios.post('payment/payos/create-payment-link',{},{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        if (response.checkoutUrl) {
          window.location.href = response.checkoutUrl
        } else {
          console.error("Không nhận được URL thanh toán từ API.");
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    
  }
};
</script>
