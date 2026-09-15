"use strict";

const expectedColumns = [
  "userId",
  "movieId",
  "title",
  "genres",
  "rating",
  "timestamp"
];

const applicationState = {
  rows: [],
  csvText: "",
  chart: null,
  missingColumns: [],
  genreRatingGroups: [],
  currentPage: 1,
  rowsPerPage: 5,
  sortDescending: true
};

function parseCsvRecords(csvText) {
  const records = [];
  let record = [];
  let value = "";
  let isInsideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"') {
      if (isInsideQuotes && nextCharacter === '"') {
        value += '"';
        index += 1;
      } else {
        isInsideQuotes = !isInsideQuotes;
      }
    } else if (character === "," && !isInsideQuotes) {
      record.push(value);
      value = "";
    } else if (character === "\n" && !isInsideQuotes) {
      record.push(value);
      records.push(record);
      record = [];
      value = "";
    } else if (character !== "\r" || isInsideQuotes) {
      value += character;
    }
  }

  if (value !== "" || record.length > 0) {
    record.push(value);
    records.push(record);
  }

  return records;
}

function getCsvHeaders(csvText) {
  const [headerRecord] = parseCsvRecords(csvText);
  return headerRecord ? headerRecord.map((header) => header.trim()) : [];
}

function validateCsvColumns(csvText) {
  const headers = getCsvHeaders(csvText);
  return expectedColumns.filter((column) => !headers.includes(column));
}

function parseCsv(csvText) {
  const records = parseCsvRecords(csvText);

  if (records.length < 2) {
    return [];
  }

  const headers = records[0].map((header) => header.trim());

  return records.slice(1)
    .filter((record) => record.some((value) => value !== ""))
    .map((record) => headers.reduce((row, header, index) => {
      row[header] = record[index] ?? "";
      return row;
    }, {}));
}

function groupRatingsByGenre(rows) {
  const groups = new Map();

  rows.forEach((row) => {
    const rating = Number(row.rating);

    if (!Number.isFinite(rating)) {
      return;
    }

    String(row.genres ?? "")
      .split("|")
      .map((genre) => genre.trim())
      .filter((genre) => genre.length > 0)
      .forEach((genre) => {
        const key = genre;
        const group = groups.get(key) ?? {
          genre,
          total: 0,
          count: 0
        };
        group.total += rating;
        group.count += 1;
        groups.set(key, group);
      });
  });

  return [...groups.values()].map((group) => ({
    ...group,
    averageRating: group.total / group.count
  }));
}

function renderChart(groups) {
  const chartCanvas = document.querySelector("#ratings-chart");

  if (!chartCanvas || typeof Chart === "undefined") {
    return;
  }

  if (applicationState.chart) {
    applicationState.chart.destroy();
  }

  applicationState.chart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: groups.map((group) => group.genre),
      datasets: [{
        label: "Mitjana de rating",
        data: groups.map((group) => group.averageRating),
        backgroundColor: "#486581",
        borderColor: "#243b53",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 5
        }
      }
    }
  });
}

function renderSummary(rows) {
  const uniqueMoviesCount = document.querySelector("#unique-movies-count");
  const uniqueUsersCount = document.querySelector("#unique-users-count");
  const ratingsCount = document.querySelector("#ratings-count");
  const averageRating = document.querySelector("#average-rating");
  const topRatedMovie = document.querySelector("#top-rated-movie");

  if (!uniqueMoviesCount || !uniqueUsersCount || !ratingsCount || !averageRating || !topRatedMovie) {
    return;
  }

  const uniqueTitles = new Set(
    rows
      .map((row) => String(row.title ?? "").trim())
      .filter((title) => title.length > 0)
  );

  uniqueMoviesCount.textContent = String(uniqueTitles.size);

  const uniqueUsers = new Set(
    rows
      .map((row) => String(row.userId ?? "").trim())
      .filter((userId) => userId.length > 0)
  );

  uniqueUsersCount.textContent = String(uniqueUsers.size);
  ratingsCount.textContent = String(rows.length);

  const numericRatings = rows
    .map((row) => Number(row.rating))
    .filter((rating) => Number.isFinite(rating));
  const ratingAverage = numericRatings.length > 0
    ? numericRatings.reduce((total, rating) => total + rating, 0) / numericRatings.length
    : 0;

  averageRating.textContent = ratingAverage.toFixed(2);

  const movieRatings = new Map();
  rows.forEach((row) => {
    const movieId = String(row.movieId ?? "").trim();

    if (!movieId) {
      return;
    }

    const movie = movieRatings.get(movieId) ?? {
      title: String(row.title ?? "").trim(),
      count: 0
    };
    movie.count += 1;
    movieRatings.set(movieId, movie);
  });

  const topMovie = [...movieRatings.values()]
    .sort((firstMovie, secondMovie) => secondMovie.count - firstMovie.count)[0];
  topRatedMovie.textContent = topMovie
    ? `${topMovie.title} (${topMovie.count} valoracions)`
    : "-";
}

function renderTable(rows) {
  const tableHead = document.querySelector("#data-table thead");
  const tableBody = document.querySelector("#data-table tbody");
  const pageIndicator = document.querySelector("#page-indicator");
  const previousPageButton = document.querySelector("#previous-page");
  const nextPageButton = document.querySelector("#next-page");
  const emptyState = document.querySelector("#empty-state");

  if (!tableHead || !tableBody || !pageIndicator || !previousPageButton || !nextPageButton || !emptyState) {
    return;
  }

  const headerRow = document.createElement("tr");
  expectedColumns.forEach((column) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = column;
    headerRow.appendChild(headerCell);
  });
  tableHead.replaceChildren(headerRow);

  if (rows.length === 0) {
    tableBody.replaceChildren();
    pageIndicator.textContent = "Sense dades";
    previousPageButton.disabled = true;
    nextPageButton.disabled = true;
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  const sortedRows = [...rows].sort((firstRow, secondRow) => (
    (Number(secondRow.rating) - Number(firstRow.rating))
      * (applicationState.sortDescending ? 1 : -1)
  ));
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / applicationState.rowsPerPage));
  applicationState.currentPage = Math.min(applicationState.currentPage, totalPages);
  const firstRowIndex = (applicationState.currentPage - 1) * applicationState.rowsPerPage;
  const visibleRows = sortedRows.slice(firstRowIndex, firstRowIndex + applicationState.rowsPerPage);

  tableBody.replaceChildren();

  visibleRows.forEach((row) => {
    const tableRow = document.createElement("tr");

    expectedColumns.forEach((column) => {
      const tableCell = document.createElement("td");
      tableCell.textContent = row[column] ?? "";
      tableRow.appendChild(tableCell);
    });

    tableBody.appendChild(tableRow);
  });

  pageIndicator.textContent = `Pàgina ${applicationState.currentPage} de ${totalPages}`;
  previousPageButton.disabled = applicationState.currentPage === 1;
  nextPageButton.disabled = applicationState.currentPage === totalPages;
}

function readCsvFile(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    applicationState.csvText = String(reader.result ?? "");
    applicationState.missingColumns = validateCsvColumns(applicationState.csvText);
    applicationState.rows = applicationState.missingColumns.length === 0
      ? parseCsv(applicationState.csvText)
      : [];
    applicationState.genreRatingGroups = groupRatingsByGenre(applicationState.rows);
    renderSummary(applicationState.rows);
    renderTable(applicationState.rows);
    renderChart(applicationState.genreRatingGroups);
  });

  reader.readAsText(file);
}

function initializeApp() {
  const table = document.querySelector("#data-table table");
  const fileInput = document.querySelector("#csv-file");
  const sortRatingButton = document.querySelector("#sort-rating");
  const previousPageButton = document.querySelector("#previous-page");
  const nextPageButton = document.querySelector("#next-page");

  if (!table || !fileInput || !sortRatingButton || !previousPageButton || !nextPageButton) {
    return;
  }

  table.setAttribute("aria-live", "polite");
  renderSummary(applicationState.rows);
  fileInput.addEventListener("change", readCsvFile);
  sortRatingButton.addEventListener("click", () => {
    applicationState.sortDescending = !applicationState.sortDescending;
    applicationState.currentPage = 1;
    sortRatingButton.textContent = applicationState.sortDescending
      ? "Ordena per rating: més alt primer"
      : "Ordena per rating: més baix primer";
    renderTable(applicationState.rows);
  });
  previousPageButton.addEventListener("click", () => {
    applicationState.currentPage -= 1;
    renderTable(applicationState.rows);
  });
  nextPageButton.addEventListener("click", () => {
    applicationState.currentPage += 1;
    renderTable(applicationState.rows);
  });
}

document.addEventListener("DOMContentLoaded", initializeApp);
