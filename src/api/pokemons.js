const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export async function fetchPokemons(url = BASE_URL) {
  try {
    const response = await fetch(url ?? BASE_URL)
    const { results, next, previous } = await response.json()
    const requests = await Promise.all(
      results.map(async (pokemon) => (await fetch(pokemon.url)).json())
    )
    const pokemons = requests.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default
    }))

    return {
      next,
      previous,
      results: pokemons
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching pokemon', error)
  }
}

export async function fetchPokemonDetail(id) {
  try {
    const resp = await fetch(`${BASE_URL}${id}`)
    return await resp.json()
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching pokemon :(', error)
  }
}
