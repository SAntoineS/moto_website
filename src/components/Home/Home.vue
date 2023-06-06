<template>
  <div class="flex w-full h-[93vh]">
    <div>
      <p>Hi, {{ user?.email }}</p>
      <button @click="signOutUser">Sign Out</button>
    </div>
  </div>
</template>

<script>
import {ref, watchEffect} from "vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import Sidenav from "../Sidenav/Sidenav.vue";

export default {
  name: "Home",
  components: {Sidenav},
  methods: {
    signOutUser() {
      signOut(getAuth())
          .then(() => {
            //this.toast.success("Success sign out !");
            this.$router.push('/welcome');
          });
    },
  },
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

</style>
