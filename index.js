'use strict';

//add next/previous buttons
function getPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      displayHomepage(responseJson))
    .catch(error => alert(error));
}

function getPreviousPage(previous){
  fetch(`${previous}`)
  .then(handleErrors)
  .then(response => response.json())
  .then(responseJson => 
    displayHomepage(responseJson))
  .catch(error => alert(error));
}

function getNextPage(next){
  fetch(`${next}`)
  .then(handleErrors)
  .then(response => response.json())
  .then(responseJson => 
    displayHomepage(responseJson))
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
  console.log(responseJson);
  let poke = responseJson.results;
  for (let i=0; i < poke.length; i++){
    $('.grid-page').append(`<div class="col-3">
      <div class="box">
      <button type="button" name="poke-card" value="${poke[i].name}"><img class="poke-card" src="https://pokeres.bastionbot.org/images/pokemon/${i+1}.png" onerror="this.src='poke-ball.png'"><br>${poke[i].name}</button></div>
    </div>`);
  }
  if(responseJson.previous != null){
    $('.prev-next').append(`<div class="col-6"><button type="button" name="previous">Previous</button></div>`);
  }
  if(responseJson.next != null){
    $('.prev-next').append(`<div class="col-6"><button type="button" name="next">Next</button></div>`);
  }

  $('.results').removeClass('hidden');
  $('button').click(function(){
    if(this.name === 'poke-card'){
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

function displayPokemonByType(responseJson) {
  console.log(responseJson);
  let poke = responseJson.pokemon;
  for (let i=0; i < poke.length; i++){
    let url = `${poke[i].pokemon.url}`.split('/');
    let id = url.pop() || url.pop();
    console.log(id);
    $('.grid-page').append(`<div class="col-3">
      <div class="box">
      <button type="button" name="poke-card" value="${poke[i].pokemon.name}"><img class="poke-card" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" onerror="this.src='poke-ball.png'"><br>${poke[i].pokemon.name}</button></div>
    </div>`);
  }
  //display the results section
  $('.results').removeClass('hidden');
  $('button').click(function(){
    if(this.name === 'poke-card'){
      let pokemon = $(this).attr('value');
      getSpecificPokemon(pokemon);
    }
  });
}

function displayPokemon(responseJson){
  console.log(responseJson);
  clearPage();
  $('.poke-page').append(`<h2>${responseJson.name}</h2>
  <div class="col-6">
    <div class="left">
    <img class="img" src="https://pokeres.bastionbot.org/images/pokemon/${responseJson.id}.png" onerror="this.src='poke-ball.png'"></div></div>
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
    watchPokePageButtons();
}

function watchForm() {
  $('form').submit(event => {
    let pokemon = $('#pokemon-search').val();
    event.preventDefault();
    getSpecificPokemon(pokemon);
     $('#pokemon-search, textarea').val('');
  });
}

function watchPokePageButtons(){
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
  });
}

function clearPage(){
  $('.row').empty();
}

function handleApp(){
  getPokemon();
  watchForm();
}

handleApp();