import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDate2 } from "@/utils/formatDate";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

type DATA = {
  date: string;
  risk_level: number;
  score: number;
};

type PROPS = {
  historical_predictions: DATA[];
};

const HistoryChart = ({ historical_predictions }: PROPS) => {
  const labels = historical_predictions.map(
    (item, idx) => formatDate2(item.date) + ` (${item.risk_level})`
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Risk Score",
        data: historical_predictions.map((item) => item.score),
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#006ff9",
        borderWidth: 2,
        pointBorderWidth: 0,
        borderColor: "#006ff9",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: "Historical Risk Score Over Time",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(61, 68, 77, 0.06)",
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HistoryChart;
