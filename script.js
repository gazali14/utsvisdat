// Registrasi Geo Controller dan Skala
Chart.register(
  ChartGeo.ChoroplethController,
  ChartGeo.ProjectionScale,
  ChartGeo.ColorScale,
  ChartGeo.GeoFeature
);

// Sample data for the charts
const years = ["2020", "2021", "2022", "2023", "2024"];

// Main data store
const allData = {
  poverty: {
    national: {
      2020: 10.19,
      2021: 9.71,
      2022: 9.57,
      2023: 9.36,
      2024: 8.57,
    },
    urban: {
      2020: 7.88,
      2021: 7.6,
      2022: 7.53,
      2023: 7.29,
      2024: 6.66,
    },
    rural: {
      2020: 13.2,
      2021: 12.53,
      2022: 12.36,
      2023: 12.22,
      2024: 11.34,
    },
    regions: {
      jawa: {
        2020: 9.31,
        2021: 8.82,
        2022: 8.63,
        2023: 8.4,
        2024: 7.74,
      },
      sumatra: {
        2020: 9.82,
        2021: 9.4,
        2022: 9.2,
        2023: 9.0,
        2024: 8.24,
      },
      kalimantan: {
        2020: 6.28,
        2021: 5.93,
        2022: 5.99,
        2023: 5.73,
        2024: 5.28,
      },
      sulawesi: {
        2020: 11.44,
        2021: 11.18,
        2022: 11.17,
        2023: 11.09,
        2024: 10.12,
      },
      nusa: {
        2020: 13.3,
        2021: 13.0,
        2022: 12.86,
        2023: 12.69,
        2024: 11.58,
      },
      papua: {
        2020: 18.37,
        2021: 17.97,
        2022: 17.71,
        2023: 17.35,
        2024: 19.32,
      },
    },
  },
  gini: {
    national: {
      2020: 0.385,
      2021: 0.381,
      2022: 0.381,
      2023: 0.388,
      2024: 0.381,
    },
  },
  expenditure: {
    ratio: {
      2020: 5.48,
      2021: 5.36,
      2022: 5.22,
      2023: 5.26,
      2024: 5.14,
    },
  },
};

// KPI data
const kpiData = {
  2020: {
    povertyRate: 10.19,
    giniIndex: 0.385,
    poorPopulation: 27.55,
    expenditureRatio: 5.48,
  },
  2021: {
    povertyRate: 9.71,
    giniIndex: 0.381,
    poorPopulation: 26.5,
    expenditureRatio: 5.36,
  },
  2022: {
    povertyRate: 9.57,
    giniIndex: 0.381,
    poorPopulation: 26.36,
    expenditureRatio: 5.22,
  },
  2023: {
    povertyRate: 9.36,
    giniIndex: 0.388,
    poorPopulation: 25.9,
    expenditureRatio: 5.26,
  },
  2024: {
    povertyRate: 8.57,
    giniIndex: 0.381,
    poorPopulation: 24.06,
    expenditureRatio: 5.14,
  },
};

// Function to update KPIs based on year
function updateKPIs(year) {
  const currentData = kpiData[year];
  const prevData = year > 2020 ? kpiData[year - 1] : null;

  // Update Poverty Rate KPI
  document.getElementById("kpi-poverty-rate").textContent =
    currentData.povertyRate.toFixed(2) + "%";

  if (prevData) {
    const povertyDiff = (
      currentData.povertyRate - prevData.povertyRate
    ).toFixed(2);
    const povertyTrendEl = document.getElementById("kpi-poverty-trend");
    povertyTrendEl.textContent = `${
      povertyDiff > 0 ? "+" : ""
    }${povertyDiff}% dari tahun lalu`;
    povertyTrendEl.className =
      povertyDiff < 0 ? "kpi-trend trend-down" : "kpi-trend trend-up";
  } else {
    document.getElementById("kpi-poverty-trend").textContent = "–";
  }

  // Update Gini Index KPI
  document.getElementById("kpi-gini").textContent =
    currentData.giniIndex.toFixed(3);

  if (prevData) {
    const giniDiff = (currentData.giniIndex - prevData.giniIndex).toFixed(3);
    const giniTrendEl = document.getElementById("kpi-gini-trend");
    giniTrendEl.textContent = `${
      giniDiff > 0 ? "+" : ""
    }${giniDiff} dari tahun lalu`;
    giniTrendEl.className =
      giniDiff < 0 ? "kpi-trend trend-down" : "kpi-trend trend-up";
  } else {
    document.getElementById("kpi-gini-trend").textContent = "–";
  }

  // Update Poor Population KPI
  document.getElementById("kpi-poor-pop").textContent =
    currentData.poorPopulation.toFixed(1) + " juta";

  if (prevData) {
    const popDiff = (
      currentData.poorPopulation - prevData.poorPopulation
    ).toFixed(2);
    const popTrendEl = document.getElementById("kpi-poor-pop-trend");
    popTrendEl.textContent = `${
      popDiff > 0 ? "+" : ""
    }${popDiff} juta dari tahun lalu`;
    popTrendEl.className =
      popDiff < 0 ? "kpi-trend trend-down" : "kpi-trend trend-up";
  } else {
    document.getElementById("kpi-poor-pop-trend").textContent = "–";
  }
}

// Function to handle year filter change
function handleYearChange() {
  const selectedYear = document.getElementById("year").value;
  updateKPIs(selectedYear);

  // Highlight the selected year on charts
  // This would be more complex in a real implementation
  // For this example, we'll just update the page title
  document.querySelector(
    ".dashboard-header p"
  ).textContent = `Analisis Indikator Sosial Ekonomi 2020-${selectedYear}`;

  // Update map when year changes
  renderProvinceMap(selectedYear);
}

// Set up event listeners
document.getElementById("year").addEventListener("change", handleYearChange);

// Chart 1: Trend Chart
const trendCtx = document.getElementById("trendChart").getContext("2d");
const trendChart = new Chart(trendCtx, {
  type: "line",
  data: {
    labels: years,
    datasets: [
      {
        label: "Tingkat Kemiskinan (%)",
        data: [10.19, 9.71, 9.57, 9.36, 8.57],
        borderColor: "#fdae6b", // oranye terang
        backgroundColor: "rgba(253, 174, 107, 0.2)", // oranye terang transparan
        yAxisID: "y",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Indeks Gini",
        data: [0.385, 0.381, 0.381, 0.388, 0.381],
        borderColor: "#e34a33", // merah-oranye gelap (kontras)
        backgroundColor: "rgba(227, 74, 51, 0.1)", // transparan
        yAxisID: "y1",
        tension: 0.3,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Tingkat Kemiskinan (%)",
        },
        min: 8.5,
        max: 11,
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Indeks Gini",
        },
        min: 0.37,
        max: 0.39,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 9, // Ganti ukuran sesuai kebutuhan, misalnya 8 untuk lebih kecil
          },
        },
      },
    },
  },
});

// Chart 2: Urban Rural Chart
const urbanRuralCtx = document
  .getElementById("urbanRuralChart")
  .getContext("2d");
const urbanRuralChart = new Chart(urbanRuralCtx, {
  type: "bar",
  data: {
    labels: years,
    datasets: [
      {
        label: "Perkotaan",
        data: [7.88, 7.6, 7.53, 7.29, 6.66],
        backgroundColor: "#7f0000",
      },
      {
        label: "Pedesaan",
        data: [13.2, 12.53, 12.36, 12.22, 11.34],
        backgroundColor: "#d7301f",
      },
      {
        label: "Perkotaan + Pedesaan",
        data: [10.19, 9.71, 9.57, 9.36, 8.57],
        backgroundColor: "#fdd49e",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Persentase (%)",
          font: {
            size: 12, // Ukuran font untuk judul sumbu Y
          },
        },
        ticks: {
          font: {
            size: 10, // Ukuran font untuk label sumbu Y
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10, // Ukuran font untuk label sumbu X
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 9, // Ukuran font untuk legend
          },
        },
      },
    },
  },
});

// Chart 3: Expenditure Ratio Chart
const expenditureCtx = document
  .getElementById("expenditureChart")
  .getContext("2d");
const expenditureChart = new Chart(expenditureCtx, {
  type: "line",
  data: {
    labels: years,
    datasets: [
      {
        label: "Rasio Pengeluaran 20% Teratas:Terbawah",
        data: [5.48, 5.36, 5.22, 5.26, 5.14],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Rasio",
        },
      },
    },
  },
});

// Chart 4: Factors Chart
const factorsCtx = document.getElementById("factorsChart").getContext("2d");
const factorsChart = new Chart(factorsCtx, {
  type: "radar",
  data: {
    labels: [
      "Pendidikan",
      "Kesehatan",
      "Infrastruktur",
      "Akses Kredit",
      "Lapangan Kerja",
      "Teknologi",
    ],
    datasets: [
      {
        label: "Tingkat Pengaruh",
        data: [85, 78, 65, 58, 72, 45],
        backgroundColor: "rgba(234, 88, 12, 0.2)",
        borderColor: "#ea580c",
        pointBackgroundColor: "#ea580c",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  },
});

// Chart 5: Regional Chart
const regionalCtx = document.getElementById("regionalChart").getContext("2d");
const regionalChart = new Chart(regionalCtx, {
  type: "line",
  data: {
    labels: years,
    datasets: [
      {
        label: "Jawa",
        data: [9.31, 8.82, 8.63, 8.4, 7.74],
        borderColor: "#eab308",
        tension: 0.3,
      },
      {
        label: "Sumatera",
        data: [9.82, 9.4, 9.2, 9.0, 8.24],
        borderColor: "#ffe100",
        tension: 0.3,
      },
      {
        label: "Kalimantan",
        data: [6.28, 5.93, 5.99, 5.73, 5.28],
        borderColor: "#e8b778",
        tension: 0.3,
      },
      {
        label: "Sulawesi",
        data: [11.44, 11.18, 11.17, 11.09, 10.12],
        borderColor: "#ef4444",
        tension: 0.3,
      },
      {
        label: "Bali & Nusa Tenggara",
        data: [13.3, 13.0, 12.86, 12.69, 11.58],
        borderColor: "#d7301f",
        tension: 0.3,
      },
      {
        label: "Maluku & Papua",
        data: [18.37, 17.97, 17.71, 17.35, 19.32],
        borderColor: "#00000",
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Persentase Kemiskinan (%)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 9, // Ubah angka ini untuk memperbesar atau memperkecil
          },
        },
      },
    },
  },
});

// === GLOBAL VARIABLES ===
let provinsiTerpilih = "INDONESIA"; // Default nasional
let map, geoLayer;
const tahunList = ["2020", "2021", "2022", "2023", "2024"];

const kemiskinanData = {
  2020: {
    Indonesia: 10.19,
    Aceh: 15.43,
    "Sumatera Utara": 9.14,
    "Sumatera Barat": 6.56,
    Riau: 7.04,
    Jambi: 7.97,
    "Sumatera Selatan": 12.98,
    Bengkulu: 15.3,
    Lampung: 12.76,
    "Kepulauan Bangka Belitung": 4.89,
    "Kepulauan Riau": 6.13,
    "DKI Jakarta": 4.69,
    "Jawa Barat": 8.43,
    "Jawa Tengah": 11.84,
    "DI Yogyakarta": 12.8,
    "Jawa Timur": 11.46,
    Banten: 6.63,
    Bali: 4.45,
    "Nusa Tenggara Barat": 14.23,
    "Nusa Tenggara Timur": 21.21,
    "Kalimantan Barat": 7.24,
    "Kalimantan Tengah": 5.26,
    "Kalimantan Selatan": 4.83,
    "Kalimantan Timur": 6.64,
    "Kalimantan Utara": 7.41,
    "Sulawesi Utara": 7.78,
    "Sulawesi Tengah": 13.06,
    "Sulawesi Selatan": 8.99,
    "Sulawesi Tenggara": 11.69,
    Gorontalo: 15.59,
    "Sulawesi Barat": 11.5,
    Maluku: 17.99,
    "Maluku Utara": 6.97,
    "Papua Barat": 21.7,
    "Papua Barat Daya": null,
    "Papua Selatan": null,
    "Papua Tengah": null,
    "Papua Pegunungan": null,
    Papua: 26.8,
  },
  2021: {
    Indonesia: 9.71,
    Aceh: 15.53,
    "Sumatera Utara": 8.49,
    "Sumatera Barat": 6.04,
    Riau: 7,
    Jambi: 7.67,
    "Sumatera Selatan": 12.79,
    Bengkulu: 14.43,
    Lampung: 11.67,
    "Kepulauan Bangka Belitung": 4.67,
    "Kepulauan Riau": 5.75,
    "DKI Jakarta": 4.67,
    "Jawa Barat": 7.97,
    "Jawa Tengah": 11.25,
    "DI Yogyakarta": 11.91,
    "Jawa Timur": 10.59,
    Banten: 6.5,
    Bali: 4.72,
    "Nusa Tenggara Barat": 13.83,
    "Nusa Tenggara Timur": 20.44,
    "Kalimantan Barat": 6.84,
    "Kalimantan Tengah": 5.16,
    "Kalimantan Selatan": 4.56,
    "Kalimantan Timur": 6.27,
    "Kalimantan Utara": 6.83,
    "Sulawesi Utara": 7.36,
    "Sulawesi Tengah": 12.18,
    "Sulawesi Selatan": 8.53,
    "Sulawesi Tenggara": 11.74,
    Gorontalo: 15.41,
    "Sulawesi Barat": 11.85,
    Maluku: 16.3,
    "Maluku Utara": 6.38,
    "Papua Barat": 21.82,
    "Papua Barat Daya": null,
    "Papua Selatan": null,
    "Papua Tengah": null,
    "Papua Pegunungan": null,
    Papua: 27.38,
  },
  2022: {
    Indonesia: 9.57,
    Aceh: 14.75,
    "Sumatera Utara": 8.33,
    "Sumatera Barat": 6.04,
    Riau: 6.84,
    Jambi: 7.7,
    "Sumatera Selatan": 11.95,
    Bengkulu: 14.34,
    Lampung: 11.44,
    "Kepulauan Bangka Belitung": 4.61,
    "Kepulauan Riau": 6.03,
    "DKI Jakarta": 4.61,
    "Jawa Barat": 7.98,
    "Jawa Tengah": 10.98,
    "DI Yogyakarta": 11.49,
    "Jawa Timur": 10.49,
    Banten: 6.24,
    Bali: 4.53,
    "Nusa Tenggara Barat": 13.82,
    "Nusa Tenggara Timur": 20.23,
    "Kalimantan Barat": 6.81,
    "Kalimantan Tengah": 5.22,
    "Kalimantan Selatan": 4.61,
    "Kalimantan Timur": 6.44,
    "Kalimantan Utara": 6.86,
    "Sulawesi Utara": 7.34,
    "Sulawesi Tengah": 12.3,
    "Sulawesi Selatan": 8.66,
    "Sulawesi Tenggara": 11.27,
    Gorontalo: 15.51,
    "Sulawesi Barat": 11.92,
    Maluku: 16.23,
    "Maluku Utara": 6.37,
    "Papua Barat": 21.43,
    "Papua Barat Daya": null,
    "Papua Selatan": null,
    "Papua Tengah": null,
    "Papua Pegunungan": null,
    Papua: 26.8,
  },
  2023: {
    Indonesia: 9.36,
    Aceh: 14.45,
    "Sumatera Utara": 8.15,
    "Sumatera Barat": 5.95,
    Riau: 6.68,
    Jambi: 7.58,
    "Sumatera Selatan": 11.78,
    Bengkulu: 14.04,
    Lampung: 11.11,
    "Kepulauan Bangka Belitung": 4.52,
    "Kepulauan Riau": 5.69,
    "DKI Jakarta": 4.44,
    "Jawa Barat": 7.62,
    "Jawa Tengah": 10.77,
    "DI Yogyakarta": 11.04,
    "Jawa Timur": 10.35,
    Banten: 6.17,
    Bali: 4.25,
    "Nusa Tenggara Barat": 13.85,
    "Nusa Tenggara Timur": 19.96,
    "Kalimantan Barat": 6.71,
    "Kalimantan Tengah": 5.11,
    "Kalimantan Selatan": 4.29,
    "Kalimantan Timur": 6.11,
    "Kalimantan Utara": 6.45,
    "Sulawesi Utara": 7.38,
    "Sulawesi Tengah": 12.41,
    "Sulawesi Selatan": 8.7,
    "Sulawesi Tenggara": 11.43,
    Gorontalo: 15.15,
    "Sulawesi Barat": 11.49,
    Maluku: 16.42,
    "Maluku Utara": 6.46,
    "Papua Barat": 20.49,
    "Papua Barat Daya": null,
    "Papua Selatan": null,
    "Papua Tengah": null,
    "Papua Pegunungan": null,
    Papua: 26.03,
  },
  2024: {
    Indonesia: 8.57,
    Aceh: 12.64,
    "Sumatera Utara": 7.19,
    "Sumatera Barat": 5.42,
    Riau: 6.36,
    Jambi: 7.26,
    "Sumatera Selatan": 10.51,
    Bengkulu: 12.52,
    Lampung: 10.62,
    "Kepulauan Bangka Belitung": 5.08,
    "Kepulauan Riau": 4.78,
    "DKI Jakarta": 4.14,
    "Jawa Barat": 7.08,
    "Jawa Tengah": 9.58,
    "DI Yogyakarta": 10.4,
    "Jawa Timur": 9.56,
    Banten: 5.7,
    Bali: 3.8,
    "Nusa Tenggara Barat": 11.91,
    "Nusa Tenggara Timur": 19.02,
    "Kalimantan Barat": 6.25,
    "Kalimantan Tengah": 5.26,
    "Kalimantan Selatan": 4.02,
    "Kalimantan Timur": 5.51,
    "Kalimantan Utara": 5.38,
    "Sulawesi Utara": 6.7,
    "Sulawesi Tengah": 11.04,
    "Sulawesi Selatan": 7.77,
    "Sulawesi Tenggara": 10.63,
    Gorontalo: 13.87,
    "Sulawesi Barat": 10.71,
    Maluku: 15.78,
    "Maluku Utara": 6.03,
    "Papua Barat": 21.09,
    "Papua Barat Daya": 18.13,
    "Papua Selatan": 17.44,
    "Papua Tengah": 29.76,
    "Papua Pegunungan": 32.97,
    Papua: 18.09,
  },
};

// === INISIALISASI PETA ===
map = L.map("map").setView([-2.5, 118], 4.2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

// Tambahkan latar gelap di luar Indonesia
addDarkBackground();

// === FUNGSI WARNA PETA UNTUK KEMISKINAN ===
function getColorKemiskinan(val) {
  return val > 20
    ? "#7f0000" // merah tua
    : val > 15
    ? "#d7301f" // merah
    : val > 10
    ? "#fc8d59" // oranye
    : val > 5
    ? "#fdd49e" // kuning oranye terang
    : "#fff7ec"; // kuning sangat terang
}

// === UPDATE PETA KEMISKINAN ===
function updateMapKemiskinan(tahun) {
  const dataTahun = kemiskinanData[tahun];

  if (geoLayer) geoLayer.remove();

  geoLayer = L.geoJson(window.geoData, {
    style: (feature) => {
      const provinsi = feature.properties.PROVINSI;
      const val = dataTahun[provinsi] || 0;
      return {
        fillColor: getColorKemiskinan(val),
        weight: 1,
        color: "white",
        fillOpacity: 0.7,
      };
    },
    onEachFeature: (feature, layer) => {
      const provinsi = feature.properties.PROVINSI;
      const val = dataTahun[provinsi] || 0;

      layer.bindPopup(
        `<strong>${provinsi}</strong><br>Tingkat Kemiskinan: ${val.toFixed(2)}%`
      );

      layer.on("click", () => {
        // Toggle provinsi
        provinsiTerpilih =
          provinsiTerpilih === provinsi ? "INDONESIA" : provinsi;
        updateBarChart(); // opsional
        buildAndUpdateLineCharts(); // opsional
        layer.openPopup();
      });
    },
  }).addTo(map);
}

// === DARK BACKGROUND DI LUAR INDONESIA ===
function addDarkBackground() {
  const worldBounds = [
    [-90, -180],
    [90, 180],
  ];
  const indonesiaBounds = [
    [-11, 95],
    [6, 141],
  ];

  L.rectangle(worldBounds, {
    color: "#000",
    weight: 0,
    fillOpacity: 0.5,
  }).addTo(map);

  L.rectangle(indonesiaBounds, {
    color: "#000",
    weight: 0,
    fillOpacity: 0,
  }).addTo(map);
}
