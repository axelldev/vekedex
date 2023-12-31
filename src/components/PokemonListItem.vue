<script setup>
defineProps({
  pokemon: Object
})
</script>

<template>
  <div
    class="bg-neutral-900 cursor-pointer rounded-lg shadow-sm flex flex-col justify-center items-center"
  >
    <img :src="pokemon.image" :alt="`${pokemon.name} sprite`" />
    <p class="text-bold capitalize">{{ pokemon.name }}</p>
  </div>
</template>
