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
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
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
    $('.row').append(`<div class="col-3">
      <div class="box"><button type="button" name="${poke[i].name}">${poke[i].name}</button></div>
    </div>`);
  }
  //display the results section
  $('.results').removeClass('hidden');
  $('button').click(function(){
    let pokemon = $(this).attr('name');
    getSpecificPokemon(pokemon);
  });
}

function displayPokemon(responseJson){
  console.log(responseJson);
  $('.row').empty();
  $('.row').append(`<p>${responseJson.name}</p>`);
}

// function watchForm() {
//   $('form').submit(event => {
//     let pokemon = $('#pokemon-search').val();
//     event.preventDefault();
//     getPokemon(pokemon);
//      $('#pokemon-search, textarea').val('');
//   });
// }


$(getPokemon);