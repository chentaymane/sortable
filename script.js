const API =
  "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";

let heroes = [];
let filteredHeroes = [];

let currentPage = 1;
let rowsPerPage = 20;

let sortColumn = "name";
let sortOrder = "asc";

// HTML ELEMENTS
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");
const pageSize = document.getElementById("pageSize");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// FETCH DATA
fetch(API)
  .then((response) => response.json())
  .then((data) => {
    heroes = data;
    filteredHeroes = data;

    sortData();
    displayHeroes();
  });

// DISPLAY HEROES
function displayHeroes() {
  tableBody.innerHTML = "";

  let start = (currentPage - 1) * rowsPerPage;
  let end = start + rowsPerPage;

  let heroesToShow =
    rowsPerPage === "all"
      ? filteredHeroes
      : filteredHeroes.slice(start, end);

  heroesToShow.forEach((hero) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
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
    `;

    tableBody.appendChild(tr);
  });

  pageNumber.textContent = currentPage;
}

// SEARCH
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  filteredHeroes = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(value)
  );

  currentPage = 1;

  sortData();
  displayHeroes();
});

// PAGE SIZE
pageSize.addEventListener("change", () => {
  rowsPerPage =
    pageSize.value === "all"
      ? "all"
      : Number(pageSize.value);

  currentPage = 1;

  displayHeroes();
});

// NEXT PAGE
nextBtn.addEventListener("click", () => {
  if (rowsPerPage === "all") return;

  let totalPages = Math.ceil(
    filteredHeroes.length / rowsPerPage
  );

  if (currentPage < totalPages) {
    currentPage++;
    displayHeroes();
  }
});

// PREV PAGE
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayHeroes();
  }
});

// SORT
const headers = document.querySelectorAll("th");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const column = header.dataset.column;

    if (sortColumn === column) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      sortColumn = column;
      sortOrder = "asc";
    }

    sortData();
    displayHeroes();
  });
});

// SORT FUNCTION
function sortData() {
  filteredHeroes.sort((a, b) => {
    let valueA = getValue(a, sortColumn);
    let valueB = getValue(b, sortColumn);

    // MISSING VALUES LAST
    if (!valueA) return 1;
    if (!valueB) return -1;

    // NUMBER SORT
    if (!isNaN(valueA) && !isNaN(valueB)) {
      valueA = Number(valueA);
      valueB = Number(valueB);
    } else {
      valueA = valueA.toString().toLowerCase();
      valueB = valueB.toString().toLowerCase();
    }

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
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
      return parseInt(hero.appearance.height[1]);

    case "weight":
      return parseInt(hero.appearance.weight[1]);

    case "place":
      return hero.biography.placeOfBirth;

    case "alignment":
      return hero.biography.alignment;

    default:
      return "";
  }
}