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

    //Eliminar los elementos agregados de alguna carga anterior.
    document.querySelectorAll(`#abilities p`).forEach(p => p.remove());
    document.querySelectorAll(`#types p`).forEach(p => p.remove());
    document.querySelectorAll(`#types img`).forEach(img => img.remove());
    
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
        //Obtener los tipos a los que pertenece el pokemon.
        pokemon.types.forEach(element => {
            let parrafo = document.createElement('p');
            parrafo.innerText = element.type.name;
            let imgType = document.createElement('img');
            divTypes.appendChild(imgType);
            divTypes.appendChild(parrafo);

            getTypesImages(element.type.name, imgType) //Buscando la imagen del tipo correcto.
        })
    })
}


function getTypesImages(typeOfPokemon, img) {
    let types = {
       bug: 'pokeIcons/Icon_Bug.png',
       dark: 'pokeIcons/Icon_Dark.png',
       dragon: 'pokeIcons/Icon_Dragon.png',
       electric: 'pokeIcons/Icon_Electric.png',
       fairy: 'pokeIcons/Icon_Fairy.png',
       fighting: 'pokeIcons/Icon_Fighting.png',
       fire: 'pokeIcons/Icon_Fire.png',
       flying: 'pokeIcons/Icon_Flying.png',
       ghost: 'pokeIcons/Icon_Ghost.png',
       grass: 'pokeIcons/Icon_Grass.png',
       ground: 'pokeIcons/Icon_Ground.png',
       ice: 'pokeIcons/Icon_Ice.png',
       normal: 'pokeIcons/Icon_Normal.png',
       poison: 'pokeIcons/Icon_Poison.png',
       psychic: 'pokeIcons/Icon_Psychic.png',
       rock: 'pokeIcons/Icon_Rock.png',
       steel: 'pokeIcons/Icon_Steel.png',
       water: 'pokeIcons/Icon_Water.png',
    }

    img.src = types[typeOfPokemon];
}

//Funcionalidades de los botones.
searchBtn.addEventListener('click', getPokemon)