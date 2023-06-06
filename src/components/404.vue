<template>
  <div id="firstSec" class="w-full flex flex-col justify-center items-center h-[93vh]">
    <div class="flex flex-col items-center justify-center w-96 text-[#454545] gap-5">
      <span class="text-9xl font-thin">404</span>
      <p class="font-light text-center">Oops! You've hit a roadblock. The page you're looking for seems to have taken a
        wrong
        turn.</p>
      <RouterLink to="/welcome"
                  class="focus:outline-none border border-[#454545] p-5 bg-[#454545] text-white hover:bg-[#303030] font-light">
        Let's get
        you back on track.
      </RouterLink>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "404",
  components: {FontAwesomeIcon},
  data() {
    return {}
  },
}
</script>

<style scoped>
#firstSec {
  /* The image used */
  background-image: url("../assets/3789530.jpg");

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
