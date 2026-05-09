// data.js

var api =
  "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"

var heroes = []

var filteredHeroes = []

var currentPage = 1

var rowsPerPage = 20

var sortColumn = "name"

var sortOrder = "asc"

// ELEMENTS
var tbody = document.getElementById("tbody")

var search = document.getElementById("search")

var pageSize = document.getElementById("pageSize")

var page = document.getElementById("page")

var prev = document.getElementById("prev")

var next = document.getElementById("next")