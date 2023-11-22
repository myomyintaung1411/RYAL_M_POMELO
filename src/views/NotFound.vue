<template>
    <div class="h-screen sm:h-auto">
      <div class="sm:mt-[74px] h-full sm:h-auto flex flex-col justify-center items-center relative">
        <div class="h-[307px] w-[307px]">
          <div class="h-full w-full flex justify-center items-center">
            <img src="@/assets/404.jpg" alt="" class="w-[500px] h-[200px] object-cover" draggable="false" loading="lazy">
          </div>
        </div>

        <div class="py-3 w-[200px] ">
          <div  class="btn_login text-center py-3 cursor-pointer text-lg text-white">
            <button @click="goService" class="outline-none focus:outline-none outline-0 bg-[#4e6c50] mt-2 w-full py-1 rounded text-white font-bold  uppercase">联系客服</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
  methods: {
    goService(){
      this.$router.push('/')
    }
  }
}
</script>