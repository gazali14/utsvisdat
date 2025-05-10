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
      2021: 10.14,
      2022: 9.71,
      2023: 9.54,
      2024: 9.36,
    },
    urban: {
      2020: 7.38,
      2021: 7.89,
      2022: 7.48,
      2023: 7.18,
      2024: 7.07,
    },
    rural: {
      2020: 13.2,
      2021: 12.53,
      2022: 12.38,
      2023: 12.36,
      2024: 12.22,
    },
    regions: {
      jawa: {
        2020: 9.14,
        2021: 9.23,
        2022: 8.92,
        2023: 8.72,
        2024: 8.58,
      },
      sumatra: {
        2020: 10.12,
        2021: 10.05,
        2022: 9.82,
        2023: 9.63,
        2024: 9.42,
      },
      kalimantan: {
        2020: 6.35,
        2021: 6.17,
        2022: 5.91,
        2023: 5.7,
        2024: 5.62,
      },
      sulawesi: {
        2020: 10.92,
        2021: 10.67,
        2022: 10.39,
        2023: 10.25,
        2024: 10.11,
      },
      nusa: {
        2020: 17.77,
        2021: 17.42,
        2022: 16.98,
        2023: 16.78,
        2024: 16.37,
      },
      papua: {
        2020: 26.64,
        2021: 25.98,
        2022: 25.28,
        2023: 24.76,
        2024: 24.42,
      },
    },
  },
  gini: {
    national: {
      2020: 0.381,
      2021: 0.384,
      2022: 0.381,
      2023: 0.384,
      2024: 0.378,
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
    giniIndex: 0.381,
    poorPopulation: 27.55,
    expenditureRatio: 5.48,
  },
  2021: {
    povertyRate: 10.14,
    giniIndex: 0.384,
    poorPopulation: 27.54,
    expenditureRatio: 5.36,
  },
  2022: {
    povertyRate: 9.71,
    giniIndex: 0.381,
    poorPopulation: 26.58,
    expenditureRatio: 5.22,
  },
  2023: {
    povertyRate: 9.54,
    giniIndex: 0.384,
    poorPopulation: 26.53,
    expenditureRatio: 5.26,
  },
  2024: {
    povertyRate: 9.36,
    giniIndex: 0.378,
    poorPopulation: 25.7,
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
        data: [10.19, 10.14, 9.71, 9.54, 9.36],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        yAxisID: "y",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Indeks Gini",
        data: [0.381, 0.384, 0.381, 0.384, 0.378],
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
        min: 9,
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
        data: [8.21, 8.45, 8.11, 7.98, 8.03],
        backgroundColor: "#ef4444",
      },
      {
        label: "Perkotaan",
        data: [7.38, 7.89, 7.48, 7.18, 7.07],
        backgroundColor: "#3b82f6",
      },
      {
        label: "Pedesaan",
        data: [13.2, 12.53, 12.38, 12.36, 12.22],
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
        data: [9.14, 9.23, 8.92, 8.72, 8.58],
        borderColor: "#ef4444",
        tension: 0.3,
      },
      {
        label: "Sumatera",
        data: [10.12, 10.05, 9.82, 9.63, 9.42],
        borderColor: "#3b82f6",
        tension: 0.3,
      },
      {
        label: "Kalimantan",
        data: [6.35, 6.17, 5.91, 5.7, 5.62],
        borderColor: "#22c55e",
        tension: 0.3,
      },
      {
        label: "Sulawesi",
        data: [10.92, 10.67, 10.39, 10.25, 10.11],
        borderColor: "#eab308",
        tension: 0.3,
      },
      {
        label: "Nusa Tenggara",
        data: [17.77, 17.42, 16.98, 16.78, 16.37],
        borderColor: "#8b5cf6",
        tension: 0.3,
      },
      {
        label: "Papua",
        data: [26.64, 25.98, 25.28, 24.76, 24.42],
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
    Aceh: 15.3,
    "Sumatera Utara": 9.0,
    "Sumatera Barat": 6.8,
    Riau: 7.2,
    Jambi: 7.1,
    "Sumatera Selatan": 11.4,
    Bengkulu: 15.2,
    Lampung: 12.5,
    "Bangka Belitung": 4.6,
    "Kepulauan Riau": 5.0,
    "DKI Jakarta": 3.5,
    "Jawa Barat": 8.4,
    "Jawa Tengah": 11.4,
    "DI Yogyakarta": 12.0,
    "Jawa Timur": 10.9,
    Banten: 6.6,
    Bali: 4.5,
    "Nusa Tenggara Barat": 14.2,
    "Nusa Tenggara Timur": 20.9,
    "Kalimantan Barat": 7.5,
    "Kalimantan Tengah": 6.3,
    "Kalimantan Selatan": 4.9,
    "Kalimantan Timur": 6.0,
    "Kalimantan Utara": 6.8,
    "Sulawesi Utara": 7.4,
    "Sulawesi Tengah": 13.0,
    "Sulawesi Selatan": 9.3,
    "Sulawesi Tenggara": 11.6,
    Gorontalo: 15.5,
    "Sulawesi Barat": 13.8,
    Maluku: 17.1,
    "Maluku Utara": 6.4,
    "Papua Barat": 23.5,
    Papua: 26.64,
  },
  2021: {
    Aceh: 14.9,
    "Sumatera Utara": 8.8,
    "Sumatera Barat": 6.7,
    Riau: 7.0,
    Jambi: 6.9,
    "Sumatera Selatan": 11.2,
    Bengkulu: 14.8,
    Lampung: 12.1,
    "Bangka Belitung": 4.4,
    "Kepulauan Riau": 4.9,
    "DKI Jakarta": 3.4,
    "Jawa Barat": 8.1,
    "Jawa Tengah": 11.1,
    "DI Yogyakarta": 11.8,
    "Jawa Timur": 10.6,
    Banten: 6.5,
    Bali: 4.2,
    "Nusa Tenggara Barat": 13.9,
    "Nusa Tenggara Timur": 20.3,
    "Kalimantan Barat": 7.3,
    "Kalimantan Tengah": 6.1,
    "Kalimantan Selatan": 4.8,
    "Kalimantan Timur": 5.9,
    "Kalimantan Utara": 6.6,
    "Sulawesi Utara": 7.2,
    "Sulawesi Tengah": 12.7,
    "Sulawesi Selatan": 9.1,
    "Sulawesi Tenggara": 11.3,
    Gorontalo: 15.2,
    "Sulawesi Barat": 13.4,
    Maluku: 16.8,
    "Maluku Utara": 6.2,
    "Papua Barat": 23.1,
    Papua: 25.98,
  },
  2022: {
    Aceh: 14.6,
    "Sumatera Utara": 8.6,
    "Sumatera Barat": 6.5,
    Riau: 6.8,
    Jambi: 6.8,
    "Sumatera Selatan": 11.0,
    Bengkulu: 14.4,
    Lampung: 11.8,
    "Bangka Belitung": 4.3,
    "Kepulauan Riau": 4.8,
    "DKI Jakarta": 3.3,
    "Jawa Barat": 7.9,
    "Jawa Tengah": 10.8,
    "DI Yogyakarta": 11.5,
    "Jawa Timur": 10.4,
    Banten: 6.3,
    Bali: 4.0,
    "Nusa Tenggara Barat": 13.6,
    "Nusa Tenggara Timur": 19.8,
    "Kalimantan Barat": 7.0,
    "Kalimantan Tengah": 6.0,
    "Kalimantan Selatan": 4.7,
    "Kalimantan Timur": 5.7,
    "Kalimantan Utara": 6.4,
    "Sulawesi Utara": 7.0,
    "Sulawesi Tengah": 12.4,
    "Sulawesi Selatan": 8.9,
    "Sulawesi Tenggara": 11.0,
    Gorontalo: 14.9,
    "Sulawesi Barat": 13.1,
    Maluku: 16.5,
    "Maluku Utara": 6.1,
    "Papua Barat": 22.7,
    Papua: 25.28,
  },
  2023: {
    Aceh: 14.3,
    "Sumatera Utara": 8.4,
    "Sumatera Barat": 6.3,
    Riau: 6.6,
    Jambi: 6.6,
    "Sumatera Selatan": 10.7,
    Bengkulu: 14.0,
    Lampung: 11.4,
    "Bangka Belitung": 4.2,
    "Kepulauan Riau": 4.6,
    "DKI Jakarta": 3.2,
    "Jawa Barat": 7.7,
    "Jawa Tengah": 10.6,
    "DI Yogyakarta": 11.3,
    "Jawa Timur": 10.2,
    Banten: 6.2,
    Bali: 3.9,
    "Nusa Tenggara Barat": 13.3,
    "Nusa Tenggara Timur": 19.3,
    "Kalimantan Barat": 6.8,
    "Kalimantan Tengah": 5.9,
    "Kalimantan Selatan": 4.6,
    "Kalimantan Timur": 5.5,
    "Kalimantan Utara": 6.2,
    "Sulawesi Utara": 6.8,
    "Sulawesi Tengah": 12.1,
    "Sulawesi Selatan": 8.7,
    "Sulawesi Tenggara": 10.8,
    Gorontalo: 14.6,
    "Sulawesi Barat": 12.8,
    Maluku: 16.2,
    "Maluku Utara": 5.9,
    "Papua Barat": 22.3,
    Papua: 24.76,
  },
  2024: {
    Aceh: 14.0,
    "Sumatera Utara": 8.2,
    "Sumatera Barat": 6.1,
    Riau: 6.5,
    Jambi: 6.5,
    "Sumatera Selatan": 10.4,
    Bengkulu: 13.7,
    Lampung: 11.1,
    "Bangka Belitung": 4.1,
    "Kepulauan Riau": 4.5,
    "DKI Jakarta": 3.1,
    "Jawa Barat": 7.5,
    "Jawa Tengah": 10.4,
    "DI Yogyakarta": 11.1,
    "Jawa Timur": 10.0,
    Banten: 6.1,
    Bali: 3.8,
    "Nusa Tenggara Barat": 13.0,
    "Nusa Tenggara Timur": 18.9,
    "Kalimantan Barat": 6.7,
    "Kalimantan Tengah": 5.8,
    "Kalimantan Selatan": 4.5,
    "Kalimantan Timur": 5.4,
    "Kalimantan Utara": 6.1,
    "Sulawesi Utara": 6.7,
    "Sulawesi Tengah": 11.9,
    "Sulawesi Selatan": 8.5,
    "Sulawesi Tenggara": 10.6,
    Gorontalo: 14.3,
    "Sulawesi Barat": 12.5,
    Maluku: 15.9,
    "Maluku Utara": 5.8,
    "Papua Barat": 22.0,
    Papua: 24.42,
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
