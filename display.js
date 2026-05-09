// display.js

function displayHeroes() {

  tbody.innerHTML = ""

  var start = (currentPage - 1) * rowsPerPage

  var end = start + rowsPerPage

  var heroesToShow

  if (rowsPerPage === "all") {

    heroesToShow = filteredHeroes

  } else {

    heroesToShow = filteredHeroes.slice(start, end)
  }

  for (var i = 0; i < heroesToShow.length; i++) {

    var hero = heroesToShow[i]

    var tr = document.createElement("tr")

    tr.innerHTML =
      `
      <td>
        <img src="${hero.images.xs}">
      </td>
      <td>${hero.name || "-"}</td>

      <td>${hero.biography.fullName || "-"}</td>

      <td>${hero.powerstats.intelligence || "-"}</td>

      <td>${hero.powerstats.strength || "-"}</td>

      <td>${hero.powerstats.speed || "-"}</td>

      <td>${hero.appearance.race || "-"}</td>

      <td>${hero.appearance.gender || "-"}</td>

      <td>${hero.appearance.height[1] || "-"}</td>

      <td>${hero.appearance.weight[1] || "-"}</td>

      <td>${hero.biography.placeOfBirth || "-"}</td>

      <td>${hero.biography.alignment || "-"}</td>

      `

    tbody.appendChild(tr)
  }

  page.innerText = currentPage
}