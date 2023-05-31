<template>
  <div class="flex flex-col w-full">
    <div id="firstSec" class="w-full flex justify-center items-center h-screen">
      <div class="flex flex-col justify-center items-center pb-10">
        <span class="select-none text-[#454545] text-[9rem] font-thin">Welcome</span>
        <div
            class="flex flex-col items-center justify-center text-center select-none text-[#454545] font-light leading-relaxed gap-5">
          <p class="">
            [Your Website Name], your one-stop digital hub for all things motorcycle.<br> Plan rides, manage gear, and
            track
            maintenance with ease.
          </p>
          <span>Let's make every journey unforgettable.</span>
          <div class="flex flex-col gap-5">
            <button @click="registerIsVisible = true"
                    class="focus:outline-none border border-[#454545] p-5 hover:bg-[#454545] hover:text-white">Start
              your
              ride with us
              today!
            </button>
            <button @click="loginIsVisible = true" class="focus:outline-none text-sm hover:underline">Already register
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col justify-center items-center h-screen gap-10">
      <div class="flex items-start pb-10 justify-around w-full flex-wrap">
        <div class="flex flex-col items-center w-96 text-justify gap-5">
          <font-awesome-icon :icon="['fal', 'map-location-dot']" style="color: #454545;" class="text-4xl"/>
          <span class="select-none text-[#454545] text-5xl font-thin text-center">Plan Rides</span>
          <p class="font-light">Embark on adventures with confidence using our ride-planning tool. Whether you love
            winding through country roads or traversing bustling city streets, our platform makes plotting your next
            ride a breeze. You can save your favorite routes, share your planned journeys with others, and even discover
            new paths suggested by the community.</p>
        </div>
        <div class="flex flex-col items-center w-96 text-justify gap-5">
          <font-awesome-icon :icon="['fal', 'screwdriver-wrench']" style="color: #454545;" class="text-4xl"/>
          <span class="select-none text-[#454545] text-5xl font-thin text-center">Manage Maintenance</span>
          <p class="font-light">Never let your motorcycle's maintenance slip under the radar. With our maintenance
            tracking system, you can record each servicing detail and schedule future ones. No more forgotten oil
            changes or brake checks - our system alerts you when it's time to give your two-wheeler some TLC.</p>
        </div>
        <div class="flex flex-col items-center w-96 text-justify gap-5">
          <font-awesome-icon :icon="['fal', 'motorcycle']" style="color: #454545;" class="text-4xl"/>
          <span class="select-none text-[#454545] text-5xl font-thin text-center">Track Gear</span>
          <p class="font-light">Stay organized and ride-ready with our gear management tool. Whether you're a casual
            rider or a long-standing enthusiast, tracking your gear is essential. Record the condition of your helmets,
            gloves, jackets, and more. Keep track of their wear and lifespan to ensure you're always well-protected on
            the road.</p>
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <button @click="registerIsVisible = true"
                class="focus:outline-none border border-[#454545] p-5 hover:bg-[#454545] hover:text-white">Start your
          ride with us
          today!
        </button>
        <button @click="loginIsVisible = true" class="focus:outline-none text-sm hover:underline">Already register
        </button>
      </div>

    </div>
    <GDialog v-model="registerIsVisible" width="750">
      <Register></Register>
    </GDialog>
    <GDialog v-model="loginIsVisible" width="750">
      <Login></Login>
    </GDialog>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Register from "./Register.vue";
import Login from "./Login.vue";

export default {
  name: "Welcome",
  components: {Login, Register, FontAwesomeIcon},
  data() {
    return {
      registerIsVisible: false,
      loginIsVisible: false
    }
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
