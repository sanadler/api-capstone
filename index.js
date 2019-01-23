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
  $('.results').append(`<h3>Abilities</h3>`
  );
    for(let i=0; i<responseJson.abilities.length; i++){
        $('.results').append(`<p>${responseJson.abilities[i].ability.name}</p>`
        );
      }
      $('.results').append(`<h3>Moves</h3>`
      );
      for(let i=0; i<responseJson.moves.length; i++){
        $('.results').append(`<p>${responseJson.moves[i].move.name}</p>`
        );
      }
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    let pokemon = $('#pokemon-search').val();
    event.preventDefault();
    $('.results').empty();
    getPokemon(pokemon);
     $('#pokemon-search, textarea').val('');
  });
}

$(watchForm);