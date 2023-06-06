<template>
  <div class="font-body">
    <div v-if="isLoggedIn" class="flex text-black">
      <Sidenav></Sidenav>
      <div class="flex flex-col justify-between items-center h-fit font-body text-black w-full">
        <transition name="fade" mode="in-out">
          <router-view class=""></router-view>
        </transition>
        <Footer></Footer>
      </div>

    </div>
    <div v-else class="flex flex-col justify-between items-center h-fit text-black">
      <transition name="fade" mode="in-out">
        <router-view class=""></router-view>
      </transition>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "./components/Footer/Footer.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Sidenav from "./components/Sidenav/Sidenav.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ref, watchEffect} from "vue";

export default {
  name: "App",
  components: {Sidenav, FontAwesomeIcon, Footer},
  setup() {
    // Make it available inside methods
    const auth = getAuth();
    const isLoggedIn = ref(false);
    const user = ref(null);

    watchEffect(() => {
      onAuthStateChanged(auth, (userDetails) => {
        if (userDetails) {
          isLoggedIn.value = true;
          user.value = userDetails;
        } else {
          isLoggedIn.value = false;
          user.value = null;
        }
      });
    });
    return {isLoggedIn, user};
  }
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
