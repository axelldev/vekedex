<script setup>
import { computed, ref, watchEffect } from 'vue'
import HomeTitle from './components/HomeTitle.vue'
import PokemonList from './components/PokemonList.vue'
import PokemonListItem from './components/PokemonListItem.vue'
import { fetchPokemons } from './api/pokemons'
import PokemonPagination from './components/PokemonPagination.vue'
import PokemonModal from './components/PokemonModal.vue'

// States
const loading = ref(false)
const error = ref(null)
const pokemons = ref([])
const nameFilter = ref('')
const modal = ref({
  open: false,
  selected: null
})
const pagination = ref({
  next: null,
  previous: null
})

async function getPokemons(url = null) {
  loading.value = true
  try {
    const { results, next, previous } = await fetchPokemons(url)
    pokemons.value = results ?? []
    pagination.value = {
      next,
      previous
    }
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

const nextPage = () => {
  if (!pagination.value.next) return
  getPokemons(pagination.value.next)
}

const previousPage = () => {
  if (!pagination.value.previous) return
  getPokemons(pagination.value.previous)
}

watchEffect(() => {
  getPokemons()
})

const handleOpenDetail = (id) => {
  modal.value.open = true
  modal.value.selected = id
}

const filteredPokemons = computed(() => {
  return nameFilter.value !== ''
    ? pokemons.value.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(nameFilter.value?.toLowerCase())
      )
    : pokemons.value
})
</script>

<template>
  <HomeTitle />
  <section class="max-w-sm mx-auto px-4">
    <input
      type="text"
      v-model="nameFilter"
      class="block w-full rounded-full bg-transparent border-2 border-red-400 text-neutral-300 py-1 px-2 outline-0"
      placeholder="Search by name..."
    />
  </section>
  <p v-if="loading" class="text-center">Loading ...</p>
  <p v-if="error" class="text-center text-red-400">Error loading pokedex :(</p>

  <PokemonList v-if="!loading">
    <PokemonListItem
      v-for="pokemon in filteredPokemons"
      :pokemon="pokemon"
      :key="pokemon.id"
      @click="handleOpenDetail(pokemon.id)"
    />
  </PokemonList>
  <footer>
    <PokemonPagination
      :hasNext="!!pagination.next"
      :hasPrev="!!pagination.previous"
      @next-page="nextPage"
      @previous-page="previousPage"
    />
  </footer>
  <Teleport to="body">
    <Transition>
      <PokemonModal
        :pokemon-id="modal.selected"
        v-show="modal.open"
        @close="modal.open = false"
      />
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
