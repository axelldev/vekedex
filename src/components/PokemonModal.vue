<script setup>
import { ref, watchEffect } from 'vue'
import { fetchPokemonDetail } from '../api/pokemons.js'
const props = defineProps({
  pokemonId: Number
})

const loading = ref(false)
const pokemon = ref(null)

watchEffect(() => {
  if (!props.pokemonId) return
  loading.value = true
  fetchPokemonDetail(props.pokemonId)
    .then((data) => {
      pokemon.value = data
    })
    .catch(console.error)
    .finally(() => (loading.value = false))
})
</script>

<template>
  <div
    @click.self="$emit('close')"
    class="fixed flex justify-center bg-neutral-950/70 backdrop-blur items-center top-0 left-0 right-0 bottom-0"
  >
    <p v-if="loading || !pokemon">Loading ...</p>
    <div v-else class="flex flex-col">
      <section class="w-96 bg-neutral-900 p-8 rounded-lg shadow-lg">
        <header>
          <p class="uppercase text-center">
            <span class="bg-neutral-800 p-2 rounded-lg mr-1"
              ># {{ pokemon.order }}</span
            >
            {{ pokemon.name }}
          </p>
        </header>
        <section class="flex justify-center p-8">
          <img
            class="block bg-neutral-950/50 p-4 rounded-lg"
            :src="pokemon.sprites.front_default"
            alt=""
          />
        </section>
        <section>
          <ul class="list-none flex gap-2 justify-center">
            <li
              class="bg-neutral-800 rounded-lg px-4 py-2"
              v-for="pokemonType in pokemon.types"
              :key="pokemonType"
            >
              {{ pokemonType.type.name }}
            </li>
          </ul>
        </section>
      </section>
      <footer class="flex justify-end p-2">
        <button
          @click="$emit('close')"
          class="bg-neutral-900 px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </footer>
    </div>
  </div>
</template>
