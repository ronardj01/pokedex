//*************************************  Variables globales  **************************************
//variables del h1, de los parrafos , div y input.
let pokemonName = document.getElementById('pokemonName');
let divAbilities = document.getElementById('abilities');
let divTypes = document.getElementById('types');
let input = document.getElementById('nameInput');
let searchBtn = document.getElementById('searchBtn');
let idPokemon = document.getElementById('idPokemon');
let turnImage = document.getElementById('turnImage');

//Variables funcion turOn
let turn = 'off';
let turnParrafo = document.getElementById('turnParrafo');
let AbilitiesNeon = document.querySelector('#abilities h2');

//Varibles de las imagenes de los pokemon.
let pokemonImg = document.getElementById('pokemonImg');

//Desabilitar input y limpiar valores.
input.value = "1";
input.disabled = true;
searchBtn.disabled = true;

//Varibales de los botones de paginacion.
let nextBtn = document.getElementById('nextBtn');
let backBtn = document.getElementById('backBtn')
let increment = "";

//funciones de ejecucion
function getPokemon() {
  //let id = input.value;
   if(!Boolean(parseInt(input.value)) || increment == ""){
    var id = input.value;
  } else {
    //increment = parseInt(input.value);
    id = increment;
  } 

  //Eliminar los elementos agregados de alguna carga anterior.
  removeData()

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(pokemon => {
      //Obtener nombre, id  e imagen del pokemon.
      pokemonName.innerText = pokemon.name;
      pokemonImg.src = pokemon.sprites.front_default;
      idPokemon.innerText = `Pokemon # ${pokemon.id}`;//***** Intentar paginacion */
      input.value = pokemon.id; //**** Ya realizo una sin usar next */
      increment = ""; // Limpiar increment 
      
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

//funcion para buscar la imagen del tipo del pokemon.
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

//funcion para encender pokedex.
function turnOn() {
  if (turn === 'off') {
    turnImage.src = 'pokeIcons/encendido1.png';
    turnParrafo.innerText = 'Turn Off';
    input.disabled = false;
    searchBtn.disabled = false;
    turn = 'on';
    AbilitiesNeon.style.color = "rgb(57, 255, 20)"
  } else {
    turnImage.src = 'pokeIcons/apagado.png';
    turnParrafo.innerText = 'Turn On';
    input.disabled = true;
    searchBtn.disabled = true;
    input.value = "";
    turn = 'off';
    pokemonImg.src = "/pokeIcons/screenOff.png";
    AbilitiesNeon.style.color = 'black';
    removeData();
  }
}

//funcion para eliminar las datas cargadas
function removeData() {
  document.querySelectorAll(`#abilities p`).forEach(p => p.remove());
  document.querySelectorAll(`#types p`).forEach(p => p.remove());
  document.querySelectorAll(`#types img`).forEach(img => img.remove());
  pokemonName.innerText = "";
}

//funciones de paginacion.
function nextPokemon() {
  increment = parseInt(input.value);
  increment += 1
  getPokemon()
}

function backPokemon() {
  increment = parseInt(input.value);
  increment -= 1
  getPokemon()
}

//Funcionalidades de los botones.
searchBtn.addEventListener('click', getPokemon);
turnImage.addEventListener('click', turnOn);
nextBtn.addEventListener('click', nextPokemon);
backBtn.addEventListener('click', backPokemon);

