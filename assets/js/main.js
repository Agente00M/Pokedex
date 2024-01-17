const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton') 
const sectionList = document.getElementById('containerPrincipal')
const div = document.getElementById('informacoesPokemon')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToDIV(pokemon){

    const titulo3 = document.getElementsByTagName('h3')
    const status = document.getElementsByClassName('status')
    for(let i= 0;i<6;i++){
        status[i].style.width = pokemon.status[i] + '%'

        titulo3[i].textContent += "" + pokemon.status[i]
    }
    
return  `
            <h1>Habilidades</h1>
        ${pokemon.abilities.map((skill) => `<li class="skill"> ${skill} </li>`).join('')}
    `
}


function convertPokemonToLi(pokemon) {
    
    return `
        <li class="pokemon ${pokemon.type} " >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToliDetail(pokemon) { // REFORMULAR CABEÇALHO E DEPOIS ENTREGAR E SUCESSO VAI FLAMENGO!!!
    
    return `
        <li class="pokemonselecionado ${pokemon.type} " >
                <div class="container">
                <img src="${pokemon.photo}"    
                alt="${pokemon.name}">

                    <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol> 
                    </div>
                </div>
                <!--  <span class="number">#${pokemon.number}</span> -->
            <span class="name selecionado">${pokemon.name}</span>

                
        </li>
    `
}





function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}
function loadPokemonDetail(offset, limit) {
    pokeApi.getPokemonSelected(offset, limit).then((pokemons = {}) => {
        const newHtml = convertPokemonToDIV(pokemons)//.join('')
        const ol = document.getElementsByClassName('listastatus')
        ol[0].innerHTML = newHtml
    })
}







loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
    
})

pokemonList.addEventListener('click',(event)=>{  
    if(event.target.tagName === 'LI'){
        sectionList.style.display = 'none'

        const container = document.getElementById('Pokemondetalhe')
        container.style.display = 'block'
        
        let id = (event.target.firstElementChild).textContent;
        id = id.slice(1,id.length) - 1
        const ol = document.getElementById('pokemonListSelected')

        pokeApi.getPokemons(id, 1).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToliDetail).join('')
            ol.innerHTML += newHtml
        })
        loadPokemonDetail(id,1)

      //  console.log(convertPokemonToDIV(teste))
       // div.innerHTML += convertPokemonToDIV(teste)

    }
})

function voltar(){
    sectionList.style.display = 'block'
    const ol = document.getElementById('pokemonListSelected')
    const li = ol.children;
        ol.removeChild(li[0])
        const container = document.getElementById('Pokemondetalhe')
        container.style.display = 'none'
    
        const titulo3 = document.getElementsByTagName('h3')
      
        for(let i= 0;i<6;i++){
            titulo3[i].textContent = ""
        }
}