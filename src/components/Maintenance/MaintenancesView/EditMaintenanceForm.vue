<template>
  <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
    <loading v-model:active="isLoading"
             :can-cancel="false"
             :is-full-page="true"/>
    <span
        class="select-none text-[#454545] text-4xl font-light uppercase text-center p-2">Edit maintenance</span>
    <div class="flex flex-col items-center w-full gap-5 pt-10">
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'wrench']" style="color: #454545;" class=""/>
        <select v-model="newMaintenance.type" class="focus:outline-none w-52">
          <option value="" disabled selected>Select a type</option>
          <option v-for="type in typeMaintenance">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'calendar-alt']" style="color: #454545;" class=""/>
        <input v-model="newMaintenance.date" type="date" class="w-52 focus:outline-none">
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" style="color: #454545;" class=""/>
        <input type="number" class="focus:outline-none w-52" v-model="newMaintenance.km"
               :placeholder="newMaintenance.km">
      </div>
      <div class="flex items-end gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'sticky-note']" style="color: #454545;" class=""/>
        <textarea type="text" class="focus:outline-none w-52 h-32 max-h-32" v-model="newMaintenance.note"
                  placeholder="Note (optional)"></textarea>
      </div>
      <span v-if="errMsg" class="text-red-500 mt-2 text-xs">{{ errMsg }}</span>

      <button @click="editNewMaintenance()"
              class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
        Confirm
      </button>
    </div>
  </div>

</template>

<script>
import Loading from "vue-loading-overlay";
import {getDatabase, ref, set, onValue, get, update} from "firebase/database"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import maintenance from "./Maintenance.vue";

export default {
  name: "EditMaintenanceForm",
  components: {FontAwesomeIcon, Loading},
  props: {
    user: {},
    motorcycle: {},
    maintenance: {},
  },
  data() {
    return {
      isLoading: false,

      newMaintenance: this.maintenance,
      errMsg: '',
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
    async editNewMaintenance() {
      if (this.newMaintenance.type !== '' && this.newMaintenance.date !== '' && this.newMaintenance.km !== '') {
        const db = getDatabase();
        try {

          const maintenanceRef = ref(db, 'users/' + this.user.uid + '/motorcycles/' + this.motorcycle.id + '/maintenances/' + this.maintenance.id);
          // perform the update
          await update(maintenanceRef, {
            type: this.newMaintenance.type,
            date: this.newMaintenance.date,
            km: this.newMaintenance.km,
            note: this.newMaintenance.note
          });

          // Usage
          this.newMaintenance = this.maintenance;
          this.$emit('set-child-data', false)
        } catch (e) {
          console.log(e)
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
