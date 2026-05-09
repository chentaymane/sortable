// search.js

search.addEventListener("input", function () {

  var value = search.value.toLowerCase()

  filteredHeroes = heroes.filter(function (hero) {

    return hero.name
      .toLowerCase()
      .includes(value)
  })

  currentPage = 1

  sortHeroes()

  displayHeroes()
})