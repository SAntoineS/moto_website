<template>
  <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
    <span class="select-none text-[#454545] text-4xl font-light uppercase p-2">login</span>
    <span class="select-none text-[#454545] w-96 text-center font-light py-10">Welcome back to [Your Website Name]! <br>Log in to continue your riding adventure.</span>
    <div class="flex flex-col p-5 gap-5 w-96 font-light">
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'envelope']" style="color: #454545;" class=""/>
        <input type="email" class="focus:outline-none w-full" v-model="email" placeholder="email">
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
      <span v-if="errMsg" class="text-red-500 mt-2 text-xs">{{ errMsg }}</span>
      <div class="flex flex-col gap-5">
        <button @click="loginAccount()"
                class="rounded-xl select-none text-center border border-[#454545] p-2 bg-[#454545] hover:bg-[#303030] text-white uppercase">
          Login
        </button>
        <RouterLink to="/forgotPassword" class="text-xs hover:underline text-center">forgot password ?</RouterLink>
      </div>

    </div>
    <div class="flex flex-col items-center justify-center gap-5 font-light">
      <span class="">Sign in with</span>
      <div class="flex gap-5 justify-center">
        <font-awesome-icon :icon="['fab', 'google']" @click="loginAccountWithGoogle()"
                           class="text-[#454545] hover:text-[#303030] text-4xl cursor-pointer"/>
      </div>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {useToast} from "vue-toastification";

export default {
  name: "Login",
  components: {FontAwesomeIcon},
  data() {
    return {
      email: "",
      password: "",
      errMsg: '',

      passwordVisible: false
    }
  },
  methods: {
    loginAccount() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password).then((data) => {
        useToast().success("Welcome back!");
        this.$router.push('/home');
      }).catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case 'auth/invalid-email':
            this.errMsg = 'Invalid email';
            break;
          case 'auth/user-not-found':
            this.errMsg = 'No account with that email was found';
            break;
          case 'auth/wrong-password':
            this.errMsg = 'Incorrect password';
            break;
          default:
            this.errMsg = 'Email or password was incorrect';
            break;
        }
      });
    },
    loginAccountWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
          .then((data) => {
            console.log(data.user);
            useToast().success("Welcome back!");
            this.$router.push('/home');
          }).catch((error) => {
        console.log(error.message);
        //alert(error.message);
      })
    },
    changePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
}
</script>

<style scoped>

</style>
