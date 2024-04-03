import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PopulationGraph = () => {
  const [populationData, setPopulationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const data = response.data;

        // Simplify y-axis to represent population in millions
        const transformedData = data.data.map((entry) => ({
          ...entry,
          Population: entry.Population / 1000000, // Convert population to millions
        }));

        setPopulationData({ ...data, data: transformedData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderGraph = () => {
    if (!populationData) return null;

    // Extracting data for labels and population
    const labels = populationData.data.map((entry) => entry.Year);
    const populations = populationData.data.map((entry) => entry.Population);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Population (Millions)",
          data: populations,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          type: "linear",
          title: {
            display: true,
            text: "Population (Millions)",
          },
          ticks: {
            callback: function (value) {
              return value + "M";
            },
          },
        },
        x: {
          type: "category",
          title: {
            display: true,
            text: "Year",
          },
        },
      },
    };

    return <Line data={chartData} options={options} />;
  };

  return (
    <div>
      <h2>Population Data for Different Nations</h2>
      <div style={{ height: "400px", width: "600px", margin: "0px" }}>
        {renderGraph()}
      </div>
    </div>
  );
};

export default PopulationGraph;
