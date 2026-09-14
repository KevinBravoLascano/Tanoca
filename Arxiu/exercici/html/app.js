"use strict";

const applicationState = {
  rows: [],
  csvText: "",
  chart: null
};

function readCsvFile(event) {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    applicationState.csvText = reader.result;
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
