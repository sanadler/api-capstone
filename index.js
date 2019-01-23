'use strict';

function getPokemon(pokemon) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then(handleErrors)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert(error));
}

function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
}


function displayResults(responseJson) {
  console.log(responseJson);
  //CHANGE THIS BEFORE SUBMITTING
  $('.col-6').empty();
  $('.name').empty();
  $('div.name').append(`<h2>${responseJson.name}</h2>`);
  $('div.abilities').append(`<h3>Abilities</h3>`
  );
    for(let i=0; i<responseJson.abilities.length; i++){
        $('div.abilities').append(`<p>${responseJson.abilities[i].ability.name}</p>`
        );
      }
      $('div.moves').append(`<h3>Moves</h3>`
      );
      for(let i=0; i<responseJson.moves.length; i++){
        $('div.moves').append(`<p>${responseJson.moves[i].move.name}</p>`
        );
      }
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    let pokemon = $('#pokemon-search').val();
    event.preventDefault();
    getPokemon(pokemon);
     $('#pokemon-search, textarea').val('');
  });
}

$(watchForm);