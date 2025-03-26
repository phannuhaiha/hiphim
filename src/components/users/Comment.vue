<template>
  <div>
    <!-- Box container -->
    <div class="bg-auto p-4 w-full">
      <span class="flex w-full items-center dark:text-gray-100 text-lg sm:text-2xl font-bold py-3 px-1">
        {{ comments.length }} bình luận
      </span>
      <!-- Comment Input -->
      <div class="mb-4 flex items-center rounded-full">
        <div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
        <input
        v-model="newComment"

          type="text"
          placeholder="Viết bình luận..."
          class="ml-4 w-full border-b border-gray-400 rounded-full bg-gray-200 px-3 py-2"
          @keyup.enter="addComment"   
        />
      </div>

      <!-- Loop through comments -->
      <div v-for="(comment, index) in comments" :key="index" class="flex flex-col space-y-4">
        <!-- Comment -->
        <div class="flex flex-row space-x-2 w-full">
          <div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>

          <div class="flex flex-col space-x-2 w-[89%] items-start pl-2">
            <p class="font-semibold text-gray-900 dark:text-gray-100">{{ comment.channel }}</p>
            <p class="text-gray-600 dark:text-gray-300">{{ comment.cmt }}</p>

            <!-- Like/Dislike + Reply Button -->
            <div class="flex flex-row space-x-4 items-start">
               <!-- Mở danh sách phản hồi -->
               <button @click="toggleReply(index)" class="text-[#0058c4dc] text-center">
                  <i :class="activeReplies[index] ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"></i>
                    {{ comment.replies.length }} phản hồi
                </button>

                <!-- mở khung nhập phản hồi  -->
              <button @click="toggleAnswer(index)" class="text-base dark:text-gray-200 font-semibold hover:underline">
                Phản hồi
              </button>
             
            </div>
             <!-- Nested reply input -->
             <div v-if="activeAnswers[index]" class="mt-4">
                    <div class="flex flex-row space-x-3">
                      <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <input v-model="newReply[index]" type="text" placeholder="Viết phản hồi..." class="ml-4 w-full border-b border-gray-400 rounded-full px-3 py-2" @keyup.enter="addReply(index)"/>
                    </div>
                  </div>
           

            <!-- Show replies -->
            <div v-if="activeReplies[index]" class="mt-4">
              <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="flex flex-row space-x-2 w-full">
                <div class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div class="flex flex-col space-x-2 w-[89%] items-start pl-2">
                  <p class="font-semibold text-gray-900 dark:text-gray-100">@{{ reply.channel }}</p>
                  <p class="text-gray-600 dark:text-gray-300">{{ reply.cmt }}</p>

                 
                  
                </div>
              </div>
            </div>
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
      newComment: "", 
      newChannel: "@user123", //để tạm tên kênh nha 
      newReply: {},
      comments: [
        {
          channel: "@quacquacquac",
          cmt: "Good job!",
          replies: [
            { channel: "@duck", cmt: "Nice work!" },
            { channel: "@hahaha", cmt: "Great post!" },
            ]
        },
        
      ],
      activeAnswers: {},
      activeReplies: {},
      
     
    };
  },
  
  methods: {
    addComment() {
      if (this.newComment.trim() === "") return; // comment rỗng thì bỏ
      
      this.comments.unshift({
        channel: this.newChannel, 
        cmt: this.newComment,
        replies: [] 
      });

      this.newComment = ""; //input rỗng sau khi đc add comment
    },
    addReply(index) {
      if (!this.newReply[index] || this.newReply[index].trim() === "") return; 
      
      this.comments[index].replies.unshift({
        channel: this.newChannel, 
        cmt: this.newReply[index]
      });

      this.newReply[index] = ""; // Xóa nội dung input của comment đó
    },
    toggleAnswer(index) {
      this.activeAnswers = { ...this.activeAnswers, [index]: !this.activeAnswers[index] };
    },
    toggleReply(index) {
      this.activeReplies = { ...this.activeReplies, [index]: !this.activeReplies[index] };
    },
    
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
