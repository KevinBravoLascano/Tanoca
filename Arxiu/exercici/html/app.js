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

function renderTable(rows) {
  const tableBody = document.querySelector("#data-table tbody");
  const pageIndicator = document.querySelector("#page-indicator");
  const previousPageButton = document.querySelector("#previous-page");
  const nextPageButton = document.querySelector("#next-page");

  if (!tableBody || !pageIndicator || !previousPageButton || !nextPageButton) {
    return;
  }

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
    renderTable(applicationState.rows);
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
