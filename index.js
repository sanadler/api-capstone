'use strict';

//fetches all pokemon from the api
function getPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      displayHomepage(responseJson))
    .catch(error => alert(error));
}

//fetches the prevous page of pokemon (limited to 20 per page)
function getPreviousPage(previous){
  fetch(`${previous}`)
  .then(handleErrors)
  .then(response => response.json())
  .then(responseJson => 
    displayHomepage(responseJson))
  .catch(error => alert(error));
}

//fetches the next page of pokemon (limited to 20 per page)
function getNextPage(next){
  fetch(`${next}`)
  .then(handleErrors)
  .then(response => response.json())
  .then(responseJson => 
    displayHomepage(responseJson))
  .catch(error => alert(error));
}

//fetches the specific pokemon, based on the pokemon passed to the function
function getSpecificPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      displayPokemon(responseJson))
    .catch(error => alert(error));
}

//fetches all pokemon of the type passed to the function
function getPokemonByType(type) {
  fetch(`https://pokeapi.co/api/v2/type/${type}/`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      displayPokemonByType(responseJson))
    .catch(error => alert(error));
}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
}

function displayHomepage(responseJson) {
  let poke = responseJson.results;
  //goes through all the pokemon, pulls the id from the URL and uses it to attach the correct image
  for (let i=0; i < poke.length; i++){
    let url = `${poke[i].url}`.split('/');
    let id = url.pop() || url.pop();
    //adds a grid of pokemon buttons with the name and image
    $('.grid-page').append(`<div class="col-3">
      <div class="box">
      <button type="button" name="poke-card" value="${poke[i].name}"><img class="poke-card" alt="picture of ${poke[i].name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" onerror="this.src='poke-ball.png'"><br>${poke[i].name}</button></div>
    </div>`);
  }
  //if you are on the first page, the previous button won't pop up .. otherwise adds a button to get to the previous page of pokemon
  if(responseJson.previous != null){
    $('.prev-next').append(`<div class="col-6"><button type="button" name="previous">Previous</button></div>`);
  }
  else{
    $('.prev-next').append(`<div class="col-6 placeholder"></div>`);
  }

   //if you are on the last page, the next button won't pop up .. otherwise adds a button to get to the next page of pokemon
  if(responseJson.next != null){
    $('.prev-next').append(`<div class="col-6"><button type="button" name="next">Next</button></div>`);
  }
 //displays results
  $('.results').removeClass('hidden');
  //watches all the buttons, performs correct ask once button is clicked
  watchButtons(responseJson);
}

//displays pokemon the same way as the homepage but adds a header saying which type is being displayed
function displayPokemonByType(responseJson) {
  let poke = responseJson.pokemon;
  $('.grid-page').append(`<h5>Pokemon with type ${responseJson.name}</h5>`);
  for (let i=0; i < poke.length; i++){
    let url = `${poke[i].pokemon.url}`.split('/');
    let id = url.pop() || url.pop();
    $('.grid-page').append(`<div class="col-3">
      <div class="box">
      <button type="button" name="poke-card" alt="picture of ${poke[i].pokemon.name}" value="${poke[i].pokemon.name}"><img class="poke-card" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" onerror="this.src='poke-ball.png'"><br>${poke[i].pokemon.name}</button></div>
    </div>`);
  }
  $('.grid-page').append(`<div class="box"><button type="button" name="back">Homepage</button></div>`);
  //display the results section
  $('.results').removeClass('hidden');
  watchButtons(responseJson);
}

//displays the stats of the specific pokemon selected
function displayPokemon(responseJson){
  clearPage();
  $('.poke-page').append(`<h2>${responseJson.name}</h2>
  <div class="col-6">
    <div class="left">
    <img class="img" alt="picture of ${responseJson.name}" src="https://pokeres.bastionbot.org/images/pokemon/${responseJson.id}.png" onerror="this.src='poke-ball.png'"></div></div>
  <div class="col-6">
    <div class="right">
      <div class="abilities"><h4>Abilities</h4></div>
      <div class="moves"><h4>Moves</h4></div>
      <div class="types"><h4>Types</h4></div>
    </div>
  </div>`);
  for(let i=0; i<responseJson.abilities.length; i++){
      $('.abilities').append(`<p>${responseJson.abilities[i].ability.name}</p>`
      );
    }
    for(let i=0; i<4; i++){
      $('.moves').append(`<p>${responseJson.moves[i].move.name}</p>`
      );
    }
    for(let i=0; i<responseJson.types.length; i++){
      $('.types').append(`<button type="button" value="${responseJson.types[i].type.name}" name="type">${responseJson.types[i].type.name}</button><br>`
      );
    }
    $('.poke-page').append(`<button type="button" name="back">Homepage</button>`);
    watchButtons(responseJson);
}

//watches the form, if a pokemon is searched for the app displays the stats of the specific pokemon
function watchForm() {
  $('form').submit(event => {
    let pokemon = $('#pokemon-search').val();
    event.preventDefault();
    pokemon = pokemon.toLowerCase();
    getSpecificPokemon(pokemon);
     $('#pokemon-search, textarea').val('');
  });
}

//watches all the buttons on every view and carries out the action
function watchButtons(responseJson){
  $('button').click(function(){
    if(this.name === 'back'){
      clearPage();
      getPokemon();
    }
    else if(this.name === 'type'){
      let type = this.value;
      clearPage();
      getPokemonByType(type);
    }
    else if(this.name === 'poke-card'){
      let pokemon = $(this).attr('value');
      getSpecificPokemon(pokemon);
    }
    else if(this.name === 'next'){
      clearPage();
      getNextPage(responseJson.next);
    }
    else if(this.name === 'previous'){
      clearPage();
      getPreviousPage(responseJson.previous);
    }
  });
}

//clears the page so that the next page can be diplayed alone
function clearPage(){
  $('.row').empty();
}

function handleApp(){
  getPokemon();
  watchForm();
}

handleApp();