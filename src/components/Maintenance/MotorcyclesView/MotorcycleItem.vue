<template>
  <RouterLink :to="'maintenance/'+motorcycle.id"
              class="flex flex-col w-full justify-center items-center border rounded-xl p-5 flex-wrap bg-[#1A1C1E] text-white hover:bg-[#2F3234] cursor-pointer">
    <span class="text-4xl"> {{ motorcycle.brand }} </span>
    <span class="text-[#808080]"> Brand </span>
    <span class="text-4xl"> {{ motorcycle.model }} </span>
    <span class="text-[#808080]"> Model </span>
  </RouterLink>
</template>

<script>
export default {
  name: "MotorcycleItem",
  props: {
    motorcycle: {},
    user: {}
  }
}
</script>

<style scoped>

</style>
