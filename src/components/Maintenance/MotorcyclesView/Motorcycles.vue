<template>
  <div class="text-[#454545] flex flex-col items-start w-full h-[93vh] p-10">
    <span class="text-5xl pb-10 font-light">Hey, {{ user.displayName }}! <br>This is your motorcycles maintenance page.</span>
    <MotorcycleItem v-for="motorcycle of motorcycles" :motorcycle="motorcycle" :user="user"></MotorcycleItem>
    <div @click="newMotorcycleForm = true" class="flex h-40 w-full justify-center items-center border rounded-xl p-5 flex-wrap bg-[#1A1C1E] text-white hover:bg-[#2F3234] cursor-pointer">
      <font-awesome-icon :icon="['fas', 'plus']" class="text-4xl"/>

    </div>
    <GDialog v-model="newMotorcycleForm" width="500">
      <NewMotorcycleForm v-on:set-child-data="updateNewMotorcycleForm" :user="user"></NewMotorcycleForm>
    </GDialog>
  </div>
</template>

<script>
import MotorcycleItem from "./MotorcycleItem.vue";
import {get, getDatabase, ref} from "firebase/database";
import {getAuth} from "firebase/auth";
import NewMotorcycleForm from "./NewMotorcycleForm.vue";
import {useToast} from "vue-toastification";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "Motorcycles",
  components: {FontAwesomeIcon, NewMotorcycleForm, MotorcycleItem},
  data() {
    return {
      newMotorcycleForm: false,
      confirmDeleteMotorcycle: false,

      user: {},
      motorcycles: [],
    }
  },
  methods: {
    getMotorcycles() {
      const db = getDatabase();
      const motorcycleRef = ref(db, 'users/' + this.user.uid + '/motorcycles');
      get(motorcycleRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.motorcycles = snapshot.val();
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      // ALL MOTORCYCLE INFORMATION
      /*const response = await apiClient.get('/motorcycles', {
        params: {
          make: this.motorcycle.brand,
          model: this.motorcycle.model,
          year: this.motorcycle.year
        }
      });
      console.log(response.data[0]);*/
    },
    updateNewMotorcycleForm(value) {
      this.newMotorcycleForm = value;
      useToast().success("New motorcycle saved!");
      this.getMotorcycles();
    },
  },
  created() {
    const auth = getAuth();
    this.user = auth.currentUser;
    this.getMotorcycles();
  }
}
</script>

<style scoped>

</style>
