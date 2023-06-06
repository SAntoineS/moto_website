<template>
  <div class="w-56 min-w-[224px] h-screen bg-[#1A1C1E]">
    <div class="py-7 flex items-center flex-col h-full">
      <router-link to="/home" class="mt-10">
        <font-awesome-icon :icon="['fal', 'motorcycle']" class="text-white text-4xl"/>
      </router-link>
      <div class="pt-16 w-full flex flex-col space-y-4 h-full text-white font-light">
        <SidenavItem iconName="home" route="home" name="Home"></SidenavItem>
        <SidenavItem iconName="map-location-dot" route="rides" name="Rides"></SidenavItem>
        <SidenavItem iconName="screwdriver-wrench" route="maintenance" name="Maintenance"></SidenavItem>
        <SidenavItem iconName="motorcycle" route="gear" name="Gear"></SidenavItem>
        <div class="flex justify-between items-end h-full">
          <div class="w-fit px-5">
            <button @click="accountView = true"
                    class="flex gap-3 justify-start w-full items-center hover:bg-[#2F3234] p-3 rounded-xl text-[#808080] hover:text-white">
              <font-awesome-icon :icon="['fal', 'user']" class="text-xl"/>
            </button>
          </div>
          <div class="w-fit px-5">
            <button @click="confirmSignOut = true"
                    class="flex gap-3 justify-start w-full items-center hover:bg-[#2F3234] p-3 rounded-xl text-[#808080] hover:text-white">
              <font-awesome-icon :icon="['fal', 'right-from-bracket']" class="text-xl"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <GDialog v-model="confirmSignOut" width="500">
      <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
        <span class="select-none text-[#454545] text-4xl font-light uppercase p-2">exit ?</span>
        <span class="select-none text-[#454545] w-96 text-center font-light py-10">
          Are you sure you want to log out?
        </span>
        <div class="flex items-center w-full justify-evenly">
          <button @click="signOutUser()"
                  class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-green-500">
            <span>Yes, I am sure</span>
          </button>
          <button @click="confirmSignOut = false"
                  class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-red-500">
            <span>Nevermind</span>
          </button>
        </div>
      </div>
    </GDialog>
    <GDialog v-model="accountView" width="500">
      <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
        <span class="select-none text-[#454545] text-4xl font-light uppercase p-2">account</span>
        <span class="select-none text-[#454545] w-96 text-center font-light py-10">
          Your personal information
        </span>
        <div class="flex flex-col items-center w-full gap-5">
          <div class="flex items-center gap-2 p-2">
            <img v-if="user.providerData[0].photoURL" :src="user.providerData[0].photoURL" class="rounded-xl" alt=""
                 width="96">
            <img v-else src="../../assets/default-avatar-icon-of-social-media-user-vector.jpg" class="rounded-xl" alt=""
                 width="96">
          </div>
          <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
            <font-awesome-icon :icon="['fas', 'user']" style="color: #454545;" class=""/>
            <input type="email" class="focus:outline-none w-52" v-model="user.providerData[0].displayName" readonly>
          </div>
          <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
            <font-awesome-icon :icon="['fas', 'envelope']" style="color: #454545;" class=""/>
            <input type="email" class="focus:outline-none w-52" v-model="user.providerData[0].email" readonly>
          </div>
          <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
            <font-awesome-icon :icon="['fas', 'clock']" style="color: #454545;" class=""/>
            <input type="text" class="focus:outline-none w-52" :value="formatDate(user.metadata.creationTime)" readonly>
          </div>
          <div class="flex items-center justify-evenly w-full">
            <button v-if="user.providerData[0].providerId !== 'google.com'" @click="changePasswordDialog = true"
                    class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
              Reset password
            </button>
            <button @click="confirmDeleteAccount = true"
                    class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
              Delete account
            </button>
          </div>

        </div>
      </div>
    </GDialog>
    <GDialog v-model="confirmDeleteAccount" width="500">
      <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
        <span class="select-none text-[#454545] text-4xl font-light uppercase p-2">really ?</span>
        <span class="select-none text-[#454545] w-96 text-center font-light py-10">
          Are you sure you want to delete your account ?
        </span>
        <span v-if="errMsg" class="text-red-500 my-2 text-xs">{{ errMsg }}</span>
        <div class="flex items-center w-full justify-evenly">
          <button @click="deleteAccount()"
                  class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-green-500">
            <span>Yes, I am sure</span>
          </button>
          <button @click="confirmDeleteAccount = false"
                  class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-red-500">
            <span>Nevermind</span>
          </button>
        </div>
      </div>
    </GDialog>
    <GDialog v-model="changePasswordDialog" width="500">
      <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
        <span class="select-none text-[#454545] text-4xl font-light uppercase p-2 text-center">change password</span>
        <div class="flex flex-col items-center w-full gap-5 py-10">
          <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
            <font-awesome-icon :icon="['fas', 'lock']" style="color: #454545;" class=""/>
            <input type="password" class="focus:outline-none w-52" v-model="currentPassword"
                   placeholder="current password">
          </div>
          <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
            <font-awesome-icon :icon="['fas', 'envelope']" style="color: #454545;" class=""/>
            <input type="password" class="focus:outline-none w-52" v-model="newPassword" placeholder="new password">
          </div>
          <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
            <font-awesome-icon :icon="['fas', 'envelope']" style="color: #454545;" class=""/>
            <input type="password" class="focus:outline-none w-52" v-model="repeatNewPassword"
                   placeholder="repeat new password">
          </div>
          <span v-if="errMsg" class="text-red-500 mt-2 text-xs">{{ errMsg }}</span>
          <button @click="changePassword()"
                  class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
            Confirm
          </button>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import SidenavItem from "./SidenavItem.vue";
import {
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";
import {useToast} from "vue-toastification";
import Login from "../Authentication/Login.vue";
import {ref, watchEffect} from "vue";
import {format} from "date-fns";


export default {
  name: "Sidenav",
  components: {Login, SidenavItem, FontAwesomeIcon},
  data() {
    return {
      confirmSignOut: false,
      confirmDeleteAccount: false,
      changePasswordDialog: false,
      accountView: false,

      errMsg: "",
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: ""
    }
  },
  methods: {
    signOutUser() {
      signOut(getAuth())
          .then(() => {
            useToast().success("Success sign out!");
            this.$router.push('/welcome');
          });
    },
    async changePassword() {
      if (this.newPassword) {
        if (this.newPassword !== this.repeatNewPassword) {
          this.errMsg = "New password and repeated password don't match";
          return;
        }
      } else {
        this.errMsg = "No new password provided";
        return;
      }
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            user.email,
            this.currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, this.newPassword);
        this.changePasswordDialog = false;
        useToast().success("Password updated successfully!");
      } catch (error) {
        switch (error.code) {
          case 'auth/wrong-password':
            this.errMsg = 'Incorrect password';
            break;
          case 'auth/weak-password':
            this.errMsg = 'Password too weak';
            break;
          default:
            this.errMsg = 'No password provided';
            break;
        }
      }
    },
    async deleteAccount() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          await user.delete();
          useToast().success("Account deleted successfully!");
          this.confirmDeleteAccount = false;
          this.$router.push('/welcome');
        } catch (error) {
          switch (error.code) {
            case 'auth/requires-recent-login':
              this.errMsg = 'Requires recent authentication. Log in again before retrying this request.';
              break;
            default:
              this.errMsg = 'An error occurred while deleting the account.';
              break;
          }
        }
      } else {
        this.errMsg = 'No user is currently authenticated.';
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy");
    }
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
          console.log(user.value)
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
