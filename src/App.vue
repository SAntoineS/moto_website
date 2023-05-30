<template>
  <div class="flex flex-col justify-between items-center h-fit font-body text-black">
    <transition name="fade" mode="in-out">
      <router-view class=""></router-view>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/PageFormats/Footer.vue";

export default {
  name: "App",
  components: {Footer}
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>