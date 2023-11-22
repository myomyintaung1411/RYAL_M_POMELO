<template>
  <!-- <div class="w-full h-screen relative overflow-y-auto sm:max-w-md sm:mx-auto">
    <main>
      <router-view />
    </main>
  </div> -->
  <div id="app" class="w-full h-screen relative sm:hidden sm:mx-auto  ">
      <div v-if="isOnline">
        <div v-if="loading" class="w-full h-screen flex flex-col justify-center items-center bg-[#04122a]">
          <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
          </div>
          <!-- <img src="@/assets/mk5.svg" alt="mk5logo" class="w-32"> -->
        </div>
        <main v-else>
          <router-view />
        </main>
      </div>
      <div v-else >
        <NoInterNet></NoInterNet>
      </div>
  </div>
</template>

<script>
import { useNetwork } from '@vueuse/core'
import NoInterNet from "@/components/NoInternet.vue";


export default {
  components:{
    NoInterNet
  },
  data() {
    return {
      loading: true,
      isOnline: false,

    }
  },

  methods: {




  },
  mounted(){
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  created() {
    const network = useNetwork();
    this.isOnline = network.isOnline;
  },

}
</script>

<style>
html {
  scroll-behavior: smooth;
}

html,
body {
  height: 100%;
}
*:focus {
  outline: none !important;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  font-family: 'Open Sans', sans-serif;
  background: #cfc8c830;
  min-height: 100vh;
  width: 100%;
  /* max-width: 500px; */

  color: #000;
  font-family: PingFang SC, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, sans-serif,
    arial;
}

@media (min-width: 640px) {
  body {
    background: none;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}

.form_background {
  background: #4e6c50;
}
.text_color {
  color: #1adde5;
}
.button_color {
  /* background: rgb(173, 142, 88); */
  background: rgb(139, 172, 170);
}

.loader {
  width: 80px;
  height: 50px;
  position: relative;
}

.loader-text {
  position: absolute;
  top: 0;
  padding: 0;
  margin: 0;
  color: #C8B6FF;
  animation: text_713 3.5s ease both infinite;
  font-size: .8rem;
  letter-spacing: 1px;
}

.load {
  background-color: #9A79FF;
  border-radius: 50px;
  display: block;
  height: 16px;
  width: 16px;
  bottom: 0;
  position: absolute;
  transform: translateX(64px);
  animation: loading_713 3.5s ease both infinite;
}

.load::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #D1C2FF;
  border-radius: inherit;
  animation: loading2_713 3.5s ease both infinite;
}

@keyframes text_713 {
  0% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }

  40% {
    letter-spacing: 2px;
    transform: translateX(26px);
  }

  80% {
    letter-spacing: 1px;
    transform: translateX(32px);
  }

  90% {
    letter-spacing: 2px;
    transform: translateX(0px);
  }

  100% {
    letter-spacing: 1px;
    transform: translateX(0px);
  }
}

@keyframes loading_713 {
  0% {
    width: 16px;
    transform: translateX(0px);
  }

  40% {
    width: 100%;
    transform: translateX(0px);
  }

  80% {
    width: 16px;
    transform: translateX(64px);
  }

  90% {
    width: 100%;
    transform: translateX(0px);
  }

  100% {
    width: 16px;
    transform: translateX(0px);
  }
}

@keyframes loading2_713 {
  0% {
    transform: translateX(0px);
    width: 16px;
  }

  40% {
    transform: translateX(0%);
    width: 80%;
  }

  80% {
    width: 100%;
    transform: translateX(0px);
  }

  90% {
    width: 80%;
    transform: translateX(15px);
  }

  100% {
    transform: translateX(0px);
    width: 16px;
  }
}
 
.grident_bg{
  background: linear-gradient(to top, #0ba360 0%, #4e6c50 100%);
}
.van-nav-bar .van-icon{
  color: #4e6c50 !important;
}
  
  </style>
