"use strict";

const applicationState = {
  rows: [],
  csvText: "",
  chart: null
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

function readCsvFile(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    applicationState.csvText = String(reader.result ?? "");
    applicationState.rows = parseCsv(applicationState.csvText);
  });

  reader.readAsText(file);
}

function initializeApp() {
  const table = document.querySelector("#data-table table");
  const fileInput = document.querySelector("#csv-file");

  if (!table || !fileInput) {
    return;
  }

  table.setAttribute("aria-live", "polite");
  fileInput.addEventListener("change", readCsvFile);
}

document.addEventListener("DOMContentLoaded", initializeApp);
