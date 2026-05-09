// script.js

fetch(api)

  .then(function (response) {
    return response.json()
  })

  .then(function (data) {

    heroes = data

    filteredHeroes = data.slice()

    sortHeroes()

    displayHeroes()
  })