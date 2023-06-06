<template>
  <div class="w-full flex flex-col justify-center items-center py-10 text-[#454545]">
    <loading v-model:active="isLoading"
             :can-cancel="false"
             :is-full-page="true"/>
    <span class="select-none text-[#454545] text-4xl font-light uppercase text-center p-2">Select your motorcycle</span>
    <div class="flex flex-col items-center w-full gap-5 pt-10">
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'trademark']" style="color: #454545;" class=""/>
        <select @change="getAllModelByBrand(motorcycle.brand)" v-model="motorcycle.brand"
                class="focus:outline-none w-52">
          <option value="" disabled selected>Select a brand</option>
          <option v-for="brand in brands">
            {{ brand }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'puzzle-piece']" style="color: #454545;" class=""/>
        <select :disabled="!allModelsLoaded" @change="getAllYearsFromModel(motorcycle.brand, motorcycle.model)"
                v-model="motorcycle.model" class="focus:outline-none w-52">
          <option value="" disabled selected>Select a model</option>
          <option v-for="model in models">
            {{ model }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'calendar']" style="color: #454545;" class=""/>
        <select :disabled="!allYearsLoaded" v-model="motorcycle.year" class="focus:outline-none w-52">
          <option value="" disabled selected>Select a year</option>
          <option v-for="year in years">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-2 border-b-2 border-[#454545] p-2">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" style="color: #454545;" class=""/>
        <input type="number" class="focus:outline-none w-52" v-model="motorcycle.km"
               placeholder="Number of kilometers">
      </div>
      <button @click="saveNewMotorcycle()"
              class="rounded-xl focus:outline-none border border-[#454545] p-3 bg-[#454545] text-white hover:bg-[#303030]">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {getDatabase, ref, set, push} from "firebase/database"
import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': 'moTKxOXYo/hPRxH+79qlUQ==oySrl1drSVncOKeL'
  }
});

export default {
  name: "NewMotorcycleForm",
  components: {FontAwesomeIcon, Loading},
  props: {
    user: {}
  },
  data() {
    return {
      isLoading: false,

      models: [],
      allModelsLoaded: false,
      years: [],
      allYearsLoaded: false,
      brands: [
        'Aprilia',
        'Royal Enfield',
        'Indian',
        'Ducati',
        'KTM',
        'TRIUMPH',
        'Harley-Davidson',
        'BMW',
        'Suzuki',
        'Kawasaki',
        'Yamaha',
        'Honda',
      ],
      motorcycle: {
        brand: '',
        model: '',
        year: '',
        km: '',
      },
    }
  },
  methods: {
    async getAllModelByBrand(brand) {
      // Activer le chargement
      this.isLoading = true;

      // Réinitialiser les modèles existants
      this.models = [];

      // Variable pour contrôler l'existence de doublons
      let hasDuplicates = false;

      // Index pour le paramètre d'offset de l'API
      let i = 0;

      // Boucle tant qu'il n'y a pas de doublons
      while (!hasDuplicates) {
        // Appeler l'API pour obtenir les motos avec un offset
        const response = await apiClient.get('/motorcycles', {
          params: {
            make: brand,
            offset: 30 * i
          }
        });

        // Extraire les nouveaux modèles à partir des données de la réponse
        const newModels = response.data.map(motorcycle => motorcycle.model);

        // Enregistrer la taille initiale de la liste des modèles
        const initialSize = this.models.length;

        // Ajouter les nouveaux modèles à la liste, en supprimant les doublons
        this.models = [...new Set(this.models.concat(newModels))];

        // Si la taille de la liste des modèles n'a pas augmenté autant qu'on s'y attendait, cela signifie qu'il y avait des doublons
        if (this.models.length < initialSize + newModels.length) {
          hasDuplicates = true;  // Indiquer qu'il y a des doublons
        } else {
          i++;  // Sinon, augmenter l'index pour le prochain offset
        }
      }

      // Trier la liste finale des modèles
      this.models = this.models.sort();

      // Indiquer que tous les modèles ont été chargés
      this.allModelsLoaded = true;

      // Désactiver le chargement
      this.isLoading = false;
    },
    async getAllYearsFromModel(brand, model) {
      this.isLoading = true;
      let offset = 0;   // On commence avec un décalage de 0
      let isDuplicate = false;   // Variable pour suivre si nous avons trouvé des doublons
      let years = [];   // tableau temporaire pour stocker les années récupérées

      // On continue tant que nous n'avons pas trouvé de doublons
      while (!isDuplicate) {
        const response = await apiClient.get('/motorcycles', {
          params: {
            make: brand,
            model: model,
            offset: 30 * offset
          }
        });

        // Concaténons les données dans un tableau temporaire
        const newYears = response.data.map(motorcycle => motorcycle.year);
        years = years.concat(newYears);

        // Vérifiez s'il y a des doublons entre les nouvelles années et celles que nous avons déjà
        const uniqueYears = [...new Set(years)];
        if (uniqueYears.length !== years.length || response.data.length === 0) {
          isDuplicate = true;
          years = uniqueYears;  // Nous nous assurons de n'avoir que des années uniques dans le tableau final
        }

        // On incrémente le décalage pour la prochaine requête
        offset++;
      }

      // Une fois que nous avons fini de récupérer toutes les années, nous pouvons les attribuer à this.years
      this.years = years.sort();
      this.allYearsLoaded = true;
      this.isLoading = false;
    },


    async saveNewMotorcycle() {
      const db = getDatabase();
      let newMotorcycleRef = push(ref(db, 'users/' + this.user.uid + '/motorcycles'));
      try {
        await set(newMotorcycleRef, {
          id: newMotorcycleRef.key,
          brand: this.motorcycle.brand,
          model: this.motorcycle.model,
          year: this.motorcycle.year,
          km: this.motorcycle.km
        });
        this.motorcycle.brand = '';
        this.motorcycle.model = '';
        this.motorcycle.year = '';
        this.motorcycle.km = '';
        this.$emit('set-child-data', false)
      }catch (e) {
        console.log(e);
      }

    },
  }
}
</script>

<style scoped>

</style>
