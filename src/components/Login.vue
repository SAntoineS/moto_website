<template>
  <div class="w-full flex flex-col justify-center items-center py-20 text-[#454545]">
    <span class="select-none text-[#454545] text-7xl font-thin uppercase">login</span>
    <span class="select-none text-[#454545] w-96 text-center font-light py-10">Welcome back to [Your Website Name]! <br>Log in to continue your riding adventure.</span>
    <div class="flex flex-col p-5 gap-5 w-96 font-light">
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'user']" style="color: #454545;" class=""/>
        <input type="text" class="focus:outline-none w-full" v-model="username" placeholder="username">
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'lock']" style="color: #454545;" class=""/>
        <input v-if="!passwordVisible" type="password" class="focus:outline-none w-full" v-model="password"
               placeholder="password">
        <input v-if="passwordVisible" type="text" class="focus:outline-none w-full" v-model="password"
               placeholder="password">
        <font-awesome-icon @click="changePasswordVisibility()" v-if="!passwordVisible" :icon="['fas', 'eye']"
                           style="color: #454545;" class="cursor-pointer w-5"/>
        <font-awesome-icon @click="changePasswordVisibility()" v-if="passwordVisible" :icon="['fas', 'eye-slash']"
                           style="color: #454545;" class="cursor-pointer w-5"/>
      </div>
      <div class="flex flex-col gap-5">
        <RouterLink to="/register"
                    class="select-none text-center border border-[#454545] p-2 bg-[#454545] hover:bg-[#303030] text-white uppercase">
          Login
        </RouterLink>
        <RouterLink to="/forgotPassword" class="text-xs hover:underline text-center">forgot password ?</RouterLink>
      </div>

    </div>
    <div class="flex flex-col items-center justify-center gap-5 font-light">
      <span class="">Sign in with</span>
      <div class="flex gap-5 justify-center">
        <font-awesome-icon :icon="['fab', 'google']"
                           class="text-[#454545] hover:text-[#303030] text-4xl cursor-pointer"/>
        <font-awesome-icon :icon="['fab', 'apple']"
                           class="text-[#454545] hover:text-[#303030] text-4xl cursor-pointer"/>
        <font-awesome-icon :icon="['fab', 'facebook']"
                           class="text-[#454545] hover:text-[#303030] text-4xl cursor-pointer"/>
      </div>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "Login",
  components: {FontAwesomeIcon},
  data() {
    return {
      username: "",
      password: "",

      passwordVisible: false
    }
  },
  methods: {
    changePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
}
</script>

<style scoped>

</style>
