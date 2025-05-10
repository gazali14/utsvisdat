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
  }

  // Update Expenditure Ratio KPI
  document.getElementById("kpi-exp-ratio").textContent =
    currentData.expenditureRatio.toFixed(2);
  if (prevData) {
    const ratioDiff = (
      currentData.expenditureRatio - prevData.expenditureRatio
    ).toFixed(2);
    const ratioTrendEl = document.getElementById("kpi-exp-ratio-trend");
    ratioTrendEl.textContent = `${
      ratioDiff > 0 ? "+" : ""
    }${ratioDiff} dari tahun lalu`;
    ratioTrendEl.className =
      ratioDiff < 0 ? "kpi-trend trend-down" : "kpi-trend trend-up";
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
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        yAxisID: "y",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Indeks Gini",
        data: [0.385, 0.381, 0.381, 0.388, 0.381],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
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
        label: "Nasional",
        data: [10.19, 9.71, 9.57, 9.36, 8.57],
        backgroundColor: "#ef4444",
      },
      {
        label: "Perkotaan",
        data: [7.88, 7.6, 7.53, 7.29, 6.66],
        backgroundColor: "#3b82f6",
      },
      {
        label: "Pedesaan",
        data: [13.2, 12.53, 12.36, 12.22, 11.34],
        backgroundColor: "#22c55e",
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
        borderColor: "#ef4444",
        tension: 0.3,
      },
      {
        label: "Sumatera",
        data: [9.82, 9.4, 9.2, 9.0, 8.24],
        borderColor: "#3b82f6",
        tension: 0.3,
      },
      {
        label: "Kalimantan",
        data: [6.28, 5.93, 5.99, 5.73, 5.28],
        borderColor: "#22c55e",
        tension: 0.3,
      },
      {
        label: "Sulawesi",
        data: [11.44, 11.18, 11.17, 11.09, 10.12],
        borderColor: "#eab308",
        tension: 0.3,
      },
      {
        label: "Nusa Tenggara",
        data: [13.3, 13.0, 12.86, 12.69, 11.58],
        borderColor: "#8b5cf6",
        tension: 0.3,
      },
      {
        label: "Papua",
        data: [18.37, 17.97, 17.71, 17.35, 19.32],
        borderColor: "#ec4899",
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
  },
});

// Data tingkat kemiskinan per provinsi
const povertyByProvince = {
  2020: {
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
    Papua: 26.8,
  },
  2021: {
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
    Papua: 27.38,
  },
  2022: {
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
    Papua: 26.8,
  },
  2023: {
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
    Papua: 26.03,
  },
  2024: {
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
    Papua: 18.09,
  },
};

// In-memory Indonesia GeoJSON data for provinces (simplified)
const indonesiaGeoJSON = {
  type: "FeatureCollection",
  features: [
    // We'll use a simplified approach instead of a full GeoJSON file
    // and create a simpler visualization for demonstration
  ],
};

// Function to create a simplified map visualization since we can't load external GeoJSON
function renderProvinceMap(year) {
  const ctx = document.getElementById("mapChart").getContext("2d");

  // Clear existing chart if any
  if (window.mapChartInstance) {
    window.mapChartInstance.destroy();
  }

  // Get poverty data for the selected year
  const yearData = povertyByProvince[year];

  // Sort provinces by poverty rate for visualization
  const sortedProvinces = Object.keys(yearData).sort(
    (a, b) => yearData[b] - yearData[a]
  );

  // Create color gradients based on poverty levels
  const getBarColor = (value) => {
    if (value >= 20)
      return {
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(220, 38, 38, 1)",
      }; // High poverty (red)
    if (value >= 15)
      return {
        backgroundColor: "rgba(234, 179, 8, 0.8)",
        borderColor: "rgba(202, 138, 4, 1)",
      }; // Medium-high poverty (yellow)
    if (value >= 10)
      return {
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(37, 99, 235, 1)",
      }; // Medium poverty (blue)
    if (value >= 5)
      return {
        backgroundColor: "rgba(14, 165, 233, 0.6)",
        borderColor: "rgba(3, 105, 161, 1)",
      }; // Low-medium poverty (light blue)
    return {
      backgroundColor: "rgba(34, 197, 94, 0.6)",
      borderColor: "rgba(22, 163, 74, 1)",
    }; // Low poverty (green)
  };

  // Map data to colors for visualization
  const barColors = sortedProvinces.map((province) =>
    getBarColor(yearData[province])
  );

  // Create a horizontal bar chart
  window.mapChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: sortedProvinces,
      datasets: [
        {
          label: `Tingkat Kemiskinan (${year})`,
          data: sortedProvinces.map((province) => yearData[province]),
          backgroundColor: sortedProvinces.map(
            (province) => getBarColor(yearData[province]).backgroundColor
          ),
          borderColor: sortedProvinces.map(
            (province) => getBarColor(yearData[province]).borderColor
          ),
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.85,
          maxBarThickness: 25,
        },
      ],
    },
    options: {
      indexAxis: "y", // Makes it a horizontal bar chart
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 20,
          top: 15,
          bottom: 10,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleFont: {
            size: 14,
            weight: "bold",
            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          },
          bodyFont: {
            size: 13,
            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          },
          padding: 12,
          cornerRadius: 6,
          displayColors: false,
          callbacks: {
            title: (items) => {
              return items[0].label;
            },
            label: (ctx) => {
              return `Tingkat Kemiskinan: ${ctx.formattedValue}%`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Persentase Kemiskinan (%)",
            font: {
              size: 14,
              family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            },
            padding: {
              top: 10,
              bottom: 0,
            },
            color: "#000000",
          },
          beginAtZero: true,
          grid: {
            color: "rgba(224, 224, 224, 0.5)",
            drawBorder: false,
            borderDash: [3, 3],
          },
          ticks: {
            font: {
              size: 12,
              family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            },
            color: "#666",
            padding: 8,
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            autoSkip: false,
            font: {
              size: 11,
              family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            },
            color: "#333",
            padding: 8,
          },
        },
      },
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
    },
  });

  // Update other parts of the interface based on the selected year
  document.querySelector(
    ".dashboard-header p"
  ).textContent = `Analisis Indikator Sosial Ekonomi 2020-${year}`;
}

// Initialize the visualization when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const defaultYear = "2024";
  document.getElementById("year").value = defaultYear;

  // Render the initial chart
  renderProvinceMap(defaultYear);

  // Update visualizations when year changes
  document.getElementById("year").addEventListener("change", function () {
    const selectedYear = this.value;
    renderProvinceMap(selectedYear);
  });
});
