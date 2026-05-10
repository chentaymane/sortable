// sort.js

var headers = document.querySelectorAll("th");

for (var i = 0; i < headers.length; i++) {
  headers[i].addEventListener("click", function () {
    var column = this.dataset.sort;
    if (!column) {
      return;
    }
    if (sortColumn === column) {
      if (sortOrder === "asc") {
        sortOrder = "desc";
      } else {
        sortOrder = "asc";
      }
    } else {
      sortColumn = column;
      sortOrder = "asc";
    }
    sortHeroes();
    displayHeroes();
  });
}

// SORT
function sortHeroes() {
  filteredHeroes.sort(function (a, b) {
    var valueA = getValue(a, sortColumn);
    var valueB = getValue(b, sortColumn);
    // missing values
    if (valueA === null || valueA === undefined || valueA === "") {
      return 1;
    }
    if (valueB === null || valueB === undefined || valueB === "") {
      return -1;
    }
    // string
    if (typeof valueA === "string" && typeof valueB === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    // asc
    if (sortOrder === "asc") {
      if (valueA > valueB) {
        return 1;
      }
      return -1;
    }
    // desc
    else {
      if (valueA < valueB) {
        return 1;
      }
      return -1;
    }
  });
}

// GET VALUE
function getValue(hero, column) {
  switch (column) {
    case "name":
      return hero.name;
    case "fullName":
      return hero.biography.fullName;
    case "intelligence":
      return hero.powerstats.intelligence;
    case "strength":
      return hero.powerstats.strength;
    case "speed":
      return hero.powerstats.speed;
    case "race":
      return hero.appearance.race;
    case "gender":
      return hero.appearance.gender;
    case "height":
      return getNumber(hero.appearance.height[1]);
    case "weight":
      return getNumber(hero.appearance.weight[1]);
    case "place":
      return hero.biography.placeOfBirth;
    case "alignment":
      return hero.biography.alignment;
  }
}

// NUMBER
function getNumber(value) {
  var number = parseInt(value);
  if (isNaN(number)) {
    return null;
  }
  return number;
}
