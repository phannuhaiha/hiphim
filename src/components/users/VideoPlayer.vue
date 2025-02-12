<template>
    <div>
      <video ref="videoPlayer" controls width="100%" autoplay></video>
    </div>
  </template>
  
  <script>
  import Hls from "hls.js";
  
  export default {
    props: {
      videoSrc: {
        type: String,
        required: true, // Đường dẫn đến file .m3u8 được truyền vào component
      },
    },
    data() {
      return {
        hls: null,
      };
    },
    mounted() {
      this.playVideo(this.videoSrc);
    },
    methods: {
      playVideo(src) {
        const video = this.$refs.videoPlayer;
  
        if (Hls.isSupported()) {
          // Sử dụng hls.js để phát video từ file .m3u8
          this.hls = new Hls();
          this.hls.loadSource(src);
          this.hls.attachMedia(video);
  
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("Manifest loaded, video ready to play!");
            video.play();
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
    beforeDestroy() {
      // Hủy HLS instance khi component bị phá hủy
      if (this.hls) {
        this.hls.destroy();
      }
    },
  };
  </script>
  
  <style scoped>
  video {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  