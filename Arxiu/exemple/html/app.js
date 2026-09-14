const expectedColumns = ["Any", "Lloc", "Sexe", "Valor"];
let chart;

const fileInput = document.getElementById("csvFile");
const message = document.getElementById("message");
const summarySection = document.getElementById("summarySection");
const summaryGrid = document.getElementById("summaryGrid");
const tableSection = document.getElementById("tableSection");
const dataTable = document.getElementById("dataTable");
const chartSection = document.getElementById("chartSection");

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection(event) {
  const [file] = event.target.files;
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const rows = parseCsv(String(reader.result));
      render(rows);
      showMessage(`Fitxer carregat correctament: ${rows.length} files.`, "success");
    } catch (error) {
      clearResults();
      showMessage(error.message, "error");
    }
  };
  reader.onerror = () => {
    clearResults();
    showMessage("No s'ha pogut llegir el fitxer.", "error");
  };
  reader.readAsText(file, "UTF-8");
}

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length < 2) throw new Error("El CSV ha de contenir una capçalera i almenys una fila.");

  const columns = parseCsvLine(lines[0]).map((column) => column.trim());
  if (columns.length !== expectedColumns.length || !expectedColumns.every((column, index) => columns[index] === column)) {
    throw new Error(`Les columnes esperades són: ${expectedColumns.join(", ")}.`);
  }

  const rows = lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    if (values.length !== expectedColumns.length) {
      throw new Error(`La fila ${index + 2} no té ${expectedColumns.length} columnes.`);
    }

    const row = Object.fromEntries(expectedColumns.map((column, valueIndex) => [column, values[valueIndex].trim()]));
    row.Any = Number(row.Any);
    row.Valor = Number(row.Valor);
    if (!Number.isInteger(row.Any) || !Number.isFinite(row.Valor)) {
      throw new Error(`La fila ${index + 2} conté un Any o Valor no vàlid.`);
    }
    return row;
  });

  return rows;
}

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && line[index + 1] === '"' && quoted) {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  if (quoted) throw new Error("El CSV conté cometes sense tancar.");
  values.push(value);
  return values;
}

function render(rows) {
  renderTable(rows);
  renderSummary(rows);
  renderChart(rows);
  summarySection.classList.remove("hidden");
  tableSection.classList.remove("hidden");
  chartSection.classList.remove("hidden");
}

function renderTable(rows) {
  const header = `<thead><tr>${expectedColumns.map((column) => `<th scope="col">${escapeHtml(column)}</th>`).join("")}</tr></thead>`;
  const body = rows.map((row) => `<tr>${expectedColumns.map((column) => `<td>${escapeHtml(row[column])}</td>`).join("")}</tr>`).join("");
  dataTable.innerHTML = `${header}<tbody>${body}</tbody>`;
}

function renderSummary(rows) {
  const values = rows.map((row) => row.Valor);
  const total = values.reduce((sum, value) => sum + value, 0);
  const mean = total / values.length;
  const standardDeviation = Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length);
  const categories = new Set(rows.map((row) => row.Lloc)).size;
  const items = [
    [rows.length, "files"],
    [formatNumber(total), "total Valor"],
    [formatNumber(mean), "mitjana Valor"],
    [formatNumber(standardDeviation), "desviació estàndard"],
    [categories, "llocs únics"],
  ];
  summaryGrid.innerHTML = items.map(([value, label]) => `<div class="summary-item"><strong>${value}</strong><span>${label}</span></div>`).join("");
}

function renderChart(rows) {
  if (typeof Chart === "undefined") throw new Error("No s'ha pogut carregar Chart.js. Comprova la connexió a Internet.");
  const locations = [...new Set(rows.map((row) => row.Lloc))];
  const sexes = [...new Set(rows.map((row) => row.Sexe))];
  const datasets = sexes.map((sex, index) => ({
    label: sex,
    data: locations.map((location) => rows.filter((row) => row.Lloc === location && row.Sexe === sex).reduce((sum, row) => sum + row.Valor, 0)),
    backgroundColor: ["#168aad", "#f4a261", "#6a994e"][index % 3],
  }));

  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: { labels: locations, datasets },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
  });
}

function clearResults() {
  summarySection.classList.add("hidden");
  tableSection.classList.add("hidden");
  chartSection.classList.add("hidden");
  if (chart) {
    chart.destroy();
    chart = undefined;
  }
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("ca-ES", { maximumFractionDigits: 2 }).format(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}