<template>
  <div class="text-[#454545] flex flex-col w-full h-[93vh] p-10">
    <div class="flex flex-col gap-5 font-light h-full">
      <div class="flex flex-col">
        <span class="text-4xl font-semibold">Your motorcycle :</span>
        <div class="flex w-full flex-wrap">
          <div class="flex justify-center flex-col w-1/2 py-5">
            <span class="text-4xl"> {{ motorcycle.brand }} </span>
            <span> Brand </span>
          </div>
          <div class="flex justify-center flex-col w-1/2 py-5">
            <span class="text-4xl"> {{ motorcycle.model }} </span>
            <span> Model </span>
          </div>
          <div class="flex justify-center flex-col w-1/2 py-5">
            <span class="text-4xl"> {{ motorcycle.year }} </span>
            <span> Year </span>
          </div>
          <div class="flex justify-center flex-col w-1/2 py-5">
            <span class="text-4xl"> {{ motorcycle.km }} </span>
            <span> Kms </span>
          </div>
          <div class="flex">
            <button @click="confirmDeleteMotorcycle = true"
                    class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col h-full gap-5">
        <span class="text-4xl font-semibold">Maintenance history :</span>

        <div class="flex flex-col w-full flex-wrap h-72 overflow-auto">
          <div class="w-full">
            <div class="flex items-center w-fit gap-3" v-if="maintenanceHistory.length === 0">
              <span>No maintenance planned yet ?</span>
              <button @click="newMaintenanceForm = true"
                      class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
                Add your first maintenance
              </button>
            </div>
            <table v-else class="w-full divide-y divide-gray-200">
              <thead class="bg-[#1A1C1E] text-white">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Km</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Note</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 overflow-auto">
              <tr v-for="record in maintenanceHistory" :key="record.id">
                <GDialog v-model="editMaintenanceForm" width="500">
                  <EditMaintenanceForm v-on:set-child-data="updateEditMaintenanceForm" :user="user"
                                       :motorcycle="motorcycle" :maintenance="record"></EditMaintenanceForm>
                </GDialog>
                <GDialog v-model="confirmDeleteMaintenance" width="500">
                  <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
                    <span class="select-none text-[#454545] text-4xl font-light uppercase">really ?</span>
                    <span class="select-none text-[#454545] w-96 text-center font-light pt-10">
                      Are you sure you want to delete this maintenance
                    </span>
                    <span class="select-none text-[#454545] w-96 text-center font-light pb-10">
                      It will be permanent.
                    </span>
                    <div class="flex items-center w-full justify-evenly">
                      <button @click="deleteMaintenance(record)"
                              class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-green-500">
                        <span>Yes, I am sure</span>
                      </button>
                      <button @click="confirmDeleteMaintenance = false"
                              class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-red-500">
                        <span>Nevermind</span>
                      </button>
                    </div>
                  </div>
                </GDialog>
                <td class="px-6 py-4 whitespace-nowrap">{{ record.type }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ record.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ record.km }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ record.note }}</td>
                <td class="flex items-center justify-end gap-3 px-6 py-4 whitespace-nowrap">
                  <button @click="editMaintenanceForm = true"
                          class="focus:outline-none text-green-500">
                    <font-awesome-icon :icon="['fal', 'edit']"/>
                  </button>
                  <button @click="confirmDeleteMaintenance = true"
                          class="focus:outline-none text-red-500">
                    <font-awesome-icon :icon="['fal', 'trash']"/>
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="4" class="px-6 py-4">
                  <button @click="newMaintenanceForm = true"
                          class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
                    Add maintenance
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <GDialog v-model="newMaintenanceForm" width="500">
      <NewMaintenanceForm v-on:set-child-data="updateNewMaintenanceForm" :user="user"
                          :motorcycle="motorcycle"></NewMaintenanceForm>
    </GDialog>
    <GDialog v-model="confirmDeleteMotorcycle" width="500">
      <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
        <span class="select-none text-[#454545] text-4xl font-light uppercase">really ?</span>
        <span class="select-none text-[#454545] w-96 text-center font-light pt-10">
          Are you sure you want to delete your {{ motorcycle.model }} ?
        </span>
        <span class="select-none text-[#454545] w-96 text-center font-light pb-10">
          It will delete all your maintenances too.
        </span>
        <div class="flex items-center w-full justify-evenly">
          <button @click="deleteMotorcycle()"
                  class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-green-500">
            <span>Yes, I am sure</span>
          </button>
          <button @click="confirmDeleteMotorcycle = false"
                  class="flex justify-center items-center p-3 bg-[#454545] hover:bg-[#1A1C1E] rounded-xl text-red-500">
            <span>Nevermind</span>
          </button>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script>
import {getAuth} from "firebase/auth";
import {getDatabase, ref, set, onValue, get, remove} from "firebase/database"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {useToast} from "vue-toastification";
import NewMotorcycleForm from "../MotorcyclesView/NewMotorcycleForm.vue";
import NewMaintenanceForm from "./NewMaintenanceForm.vue";
import EditMaintenanceForm from "./EditMaintenanceForm.vue";

const apiClient = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': 'moTKxOXYo/hPRxH+79qlUQ==oySrl1drSVncOKeL'
  }
});
export default {
  name: 'Maintenance',
  components: {EditMaintenanceForm, NewMaintenanceForm, NewMotorcycleForm, FontAwesomeIcon, Loading},
  data() {
    return {
      isLoading: false,

      newMotorcycleForm: false,
      newMaintenanceForm: false,
      editMaintenanceForm: false,
      confirmDeleteMotorcycle: false,
      confirmDeleteMaintenance: false,

      user: {},

      maintenanceHistory: [],
      motorcycle: {
        id: '',
        brand: '',
        model: '',
        year: '',
        km: '',
      },
    }
  },
  methods: {
    deleteMotorcycle() {
      const db = getDatabase();
      // Ciblez le chemin de la moto dans la base de données
      const motorcycleRef = ref(db, 'users/' + this.user.uid + '/motorcycles/' + this.$route.params.motorcycleId);

      // Supprimez la moto
      try {
        remove(motorcycleRef);
        useToast().success('Motorcycle has been removed!');
        this.motorcycle.brand = '';
        this.motorcycle.model = '';
        this.motorcycle.year = '';
        this.motorcycle.km = '';
        this.allModelsLoaded = false;
        this.allYearsLoaded = false;
        this.confirmDeleteMotorcycle = false;
        this.$router.push('/maintenance');
      } catch (error) {
        console.error('Error removing motorcycle: ', error);
      }
    },
    deleteMaintenance(maintenance) {
      const db = getDatabase();
      // Ciblez le chemin de la moto dans la base de données
      const motorcycleRef = ref(db, 'users/' + this.user.uid + '/motorcycles/' + this.$route.params.motorcycleId + '/maintenances/' + maintenance.id);

      // Supprimez la moto
      try {
        remove(motorcycleRef);
        useToast().success('Maintenance has been removed!');
        this.confirmDeleteMaintenance = false;
        this.getMaintenances();
      } catch (error) {
        console.error('Error removing maintenance: ', error);
      }
    },
    updateEditMaintenanceForm(value) {
      this.editMaintenanceForm = value;
      useToast().success("Maintenance edited!");
      this.getMaintenances();
    },
    updateNewMaintenanceForm(value) {
      this.newMaintenanceForm = value;
      useToast().success("New maintenance saved!");
      this.getMaintenances();
    },
    getMotorcycle() {
      const db = getDatabase();
      const motorcycleRef = ref(db, 'users/' + this.user.uid + '/motorcycles/' + this.$route.params.motorcycleId);
      get(motorcycleRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.motorcycle = snapshot.val();
          console.log(snapshot.val());
        } else {
          this.$router.push('/maintenance');
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
    getMaintenances() {
      const db = getDatabase();
      const motorcycleRef = ref(db, 'users/' + this.user.uid + '/motorcycles/' + this.$route.params.motorcycleId + '/maintenances');
      get(motorcycleRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.maintenanceHistory = snapshot.val();
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
  },
  created() {
    const auth = getAuth();
    this.user = auth.currentUser;
    this.getMotorcycle();
    this.getMaintenances();
  }
}
</script>
