<template>
  <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
    <loading v-model:active="isLoading"
             :can-cancel="false"
             :is-full-page="true"/>
    <span
        class="select-none text-[#454545] text-4xl font-light uppercase text-center p-2">New maintenance for<br>{{
        motorcycle.model
      }}</span>
    <div class="flex flex-col items-center w-full gap-5 pt-10">
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'wrench']" style="color: #454545;" class=""/>
        <select v-model="maintenance.type" class="focus:outline-none w-52">
          <option value="" disabled selected>Select a type</option>
          <option v-for="type in typeMaintenance">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'calendar-alt']" style="color: #454545;" class=""/>
        <input v-model="maintenance.date" type="date" class="w-52 focus:outline-none">
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" style="color: #454545;" class=""/>
        <input type="number" class="focus:outline-none w-52" v-model="maintenance.km"
               :placeholder="motorcycle.km">
      </div>
      <div class="flex items-end gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'sticky-note']" style="color: #454545;" class=""/>
        <textarea type="text" class="focus:outline-none w-52 h-32 max-h-32" v-model="maintenance.note"
                  placeholder="Note (optional)"></textarea>
      </div>
      <span v-if="errMsg" class="text-red-500 mt-2 text-xs">{{ errMsg }}</span>

      <button @click="saveNewMaintenance()"
              class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
        Confirm
      </button>
    </div>
  </div>

</template>

<script>
import Loading from "vue-loading-overlay";
import {getDatabase, ref, set, onValue, get, push} from "firebase/database"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import maintenance from "./Maintenance.vue";

export default {
  name: "NewMaintenanceForm",
  components: {FontAwesomeIcon, Loading},
  props: {
    user: {},
    motorcycle: {}
  },
  data() {
    return {
      isLoading: false,

      errMsg: '',

      maintenance: {
        type: '',
        date: '',
        km: this.motorcycle.km,
        note: '',
      },
      typeMaintenance: [
        "Changement d'huile",
        "Inspection des freins",
        "Inspection des pneus",
        "Inspection et réglage de la chaîne",
        "Changement du filtre à air",
        "Révision du moteur",
        "Inspection des suspensions",
        "Inspection de l'électricité",
        "Changement de liquide de refroidissement",
        "Inspection générale de la moto",
        "Réparation divers",
      ]
    }
  },
  methods: {
    async saveNewMaintenance() {
      if (this.maintenance.type !== '' && this.maintenance.date !== '' && this.maintenance.km !== '') {
        const db = getDatabase();
        let newMaintenanceRef = push(ref(db, 'users/' + this.user.uid + '/motorcycles/' + this.motorcycle.id + '/maintenances'));
        try {
          await set(newMaintenanceRef, {
            id: newMaintenanceRef.key,
            type: this.maintenance.type,
            date: this.maintenance.date,
            km: this.maintenance.km,
            note: this.maintenance.note
          });
          this.maintenance.type = '';
          this.maintenance.date = '';
          this.maintenance.km = '';
          this.maintenance.note = '';
          this.$emit('set-child-data', false)
        } catch (e) {
          console.log(e);
        }
      } else {
        this.errMsg = 'Missing field(s) !'
      }

    }
  }
}
</script>

<style scoped>

</style>
