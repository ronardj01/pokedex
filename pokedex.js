//*************************************  Variables globales  **************************************
//variables del h1, de los parrafos , div y input.
let pokemonName = document.getElementById('pokemonName');
let divAbilities = document.getElementById('abilities');
let divTypes = document.getElementById('types');
let input = document.getElementById('nameInput');
let searchBtn = document.getElementById('searchBtn');
let idPokemon = document.getElementById('idPokemon');

//Varibles de las imagenes de los pokemon.
let pokemonImg = document.getElementById('pokemonImg');

function getPokemon() {
    let id = input.value;

    //Eliminar los elementos p de alguna carga anterior.
    document.querySelectorAll(`#abilities p`).forEach(p => p.remove());
    document.querySelectorAll(`#types p`).forEach(p => p.remove());
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(pokemon => {
        //Obtener nombre, id  e imagen del pokemon.
        pokemonName.innerText = pokemon.name;
        pokemonImg.src = pokemon.sprites.front_default;
        idPokemon.innerText = `Pokemon # ${pokemon.id}`;//***** Intentar paginacion */

        //Obtener abilidades del pokemon.
        pokemon.abilities.forEach(element => {
            let parrafo = document.createElement('p');
            parrafo.innerText = element.ability.name;
            divAbilities.appendChild(parrafo);
        })
        //Obtener los tipos a los que pertenece el poquemon.
        pokemon.types.forEach(element => {
            let parrafo = document.createElement('p');
            parrafo.innerText = element.type.name;
            divTypes.appendChild(parrafo);
        })
    })
}

//Funcionalidades de los botones.
searchBtn.addEventListener('click', getPokemon)