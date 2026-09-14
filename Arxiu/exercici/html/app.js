"use strict";

const applicationState = {
  rows: [],
  chart: null
};

function initializeApp() {
  const table = document.querySelector("#data-table table");

  if (!table) {
    return;
  }

  table.setAttribute("aria-live", "polite");
}

document.addEventListener("DOMContentLoaded", initializeApp);
