// pagination.js

// PAGE SIZE
pageSize.addEventListener("change", function () {

  if (pageSize.value === "all") {

    rowsPerPage = "all"

  } else {

    rowsPerPage = Number(pageSize.value)
  }

  currentPage = 1

  displayHeroes()
})

// NEXT
next.addEventListener("click", function () {

  if (rowsPerPage === "all") {
    return
  }

  var totalPages =
    Math.ceil(filteredHeroes.length / rowsPerPage)

  if (currentPage < totalPages) {

    currentPage++

    displayHeroes()
  }
})

// PREV
prev.addEventListener("click", function () {

  if (currentPage > 1) {

    currentPage--

    displayHeroes()
  }
})