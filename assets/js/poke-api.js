
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //estamos aqui :D
        .then((detailRequests) => Promise.all(detailRequests))

        .then((pokemonsDetails) => pokemonsDetails)
}

//pokeApi.getPokemon = (id) => {
  //  let url = `https://pokeapi.co/api/v2/1`
    //console.log(url)
//}


pokeApi.getPokemonSelected = (offset = 0, limit = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   // let classe
    return fetch(url)
        .then((response) => response.json())
        .then((json) => json.results[0])
        
        .then((pokemon) => fetch(pokemon.url).then((response) => {
            return response.json()}))
        .then(getPokemonsMoreDetail)/*.finally(() =>{
        console.log(classe)
        return classe
        }
        )*/
    }

function getPokemonsMoreDetail(pokemonsDetails){
    const pokemon = new Pokemon()

    pokemon.status = pokemonsDetails.stats.map((array) => array.base_stat)
    pokemon.abilities = pokemonsDetails.abilities.map((array) => array.ability.name)
   
   console.log(pokemon)
    return pokemon
}




