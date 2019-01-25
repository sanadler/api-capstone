'use strict';

function getPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      homepage(responseJson))
    .catch(error => alert(error));
}

function getSpecificPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      displayPokemon(responseJson))
    .catch(error => alert(error));
}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
}


function homepage(responseJson) {
  console.log(responseJson);
  let poke = responseJson.results;
  for (let i=0; i < poke.length; i++){
    $('.homepage').append(`<div class="col-3">
      <div class="box"><button type="button" name="${poke[i].name}">${poke[i].name}</button></div>
    </div>`);
  }
  //display the results section
  $('.results').removeClass('hidden');
  $('button').click(function(){
    if(this.type === 'button'){
      let pokemon = $(this).attr('name');
      getSpecificPokemon(pokemon);
    }
  });
}

function displayPokemon(responseJson){
  console.log(responseJson);
  clearPage();
  $('.poke-page').append(`<h2>${responseJson.name}</h2><div class="col-6">
    <div class="img">img placeholder</div>
  </div>
  <div class="col-6">
    <div class="abilities"><h4>Abilities</h4></div>
  </div>`);
  for(let i=0; i<responseJson.abilities.length; i++){
      $('.abilities').append(`<p>${responseJson.abilities[i].ability.name}</p>`
      );
    }
    $('.poke-page').append(`<button type="button" name="back">Back</button>`);
    watchBackButton();
}

function watchForm() {
  $('form').submit(event => {
    let pokemon = $('#pokemon-search').val();
    event.preventDefault();
    getSpecificPokemon(pokemon);
     $('#pokemon-search, textarea').val('');
  });
}

function watchBackButton(){
  $('button[name="back"]').click(function(){
    clearPage();
    getPokemon();
  });
}

function clearPage(){
  $('.row').empty();
}

function handlePages(){
  getPokemon();
  watchForm();
}

handlePages();