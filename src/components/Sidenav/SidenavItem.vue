<template>
  <div class="w-full px-5">
    <router-link v-if="isActive(route)" :to="'/' + route"
                 class="flex gap-3 justify-start w-full items-center bg-[#2F3234] p-3 rounded-xl text-white">
      <font-awesome-icon :icon="['fal', iconName]" class="text-xl"/>
      <span>{{ name }}</span>
    </router-link>
    <router-link v-else active-class="activeLink" :to="'/' + route"
                 class="flex gap-3 justify-start w-full items-center hover:bg-[#2F3234] p-3 rounded-xl text-[#808080] hover:text-white">
      <font-awesome-icon :icon="['fal', iconName]" class="text-xl"/>
      <span>{{ name }}</span>
    </router-link>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRoute} from "vue-router";

export default {
  name: "SidenavItem",
  components: {FontAwesomeIcon},
  props: {
    route: String,
    iconName: String,
    name: String
  },
  computed: {
    currentRoute() {
      return useRoute().path
    }
  },
  methods: {
    isActive(path) {
      if (this.currentRoute.includes(path)) {

      }
      return this.currentRoute.includes(path);
    },
  }
}
</script>

<style scoped>

</style>
