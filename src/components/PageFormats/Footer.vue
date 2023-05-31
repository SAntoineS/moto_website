<template>
  <div class="flex gap-5 justify-center items-center py-5 w-full select-none text-[#454545] font-light text-sm bg-white">
    <div class="flex items-center gap-2">
      <font-awesome-icon :icon="['fal', 'copyright']" style="color: #454545;" />
      <span>NOM SITE WEB</span>
    </div>
    -
    <a href="https://github.com/SAntoineS" class="hover:underline" target="_blank">Antoine Sidot</a>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "Footer",
  components: {FontAwesomeIcon}
}
</script>

<style scoped>

</style>
