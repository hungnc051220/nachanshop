import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartLine = ({ report }) => {
  return (
    <div className="chart" style={{ height: 300 }}>
      {report && (
        <Line
          data={{
            labels: report?.map((item) => `Tháng ${item._id.month}`),
            datasets: [
              {
                label: "Doanh thu theo tháng",
                tension: 0.4,
                pointRadius: 0,
                borderColor: "#5e72e4",
                backgroundColor: [
                  "rgba(94, 114, 228, 0.2)",
                  "rgba(94, 114, 228, 0.0)",
                  "rgba(94, 114, 228, 0)",
                ],
                borderWidth: 3,
                fill: true,
                data: report?.map((item) => item.total),
                maxBarThickness: 6,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
            scales: {
              yAxes: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  padding: 10,
                  font: {
                    size: 11,
                    family: "Poppins, sans-serif",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
              xAxes: {
                grid: {
                  drawBorder: false,
                  display: true,
                  drawOnChartArea: true,
                  drawTicks: false,
                  borderDash: [5, 5],
                },
                ticks: {
                  padding: 10,
                  font: {
                    size: 11,
                    family: "Poppins, sans-serif",
                    style: "normal",
                    lineHeight: 2,
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartLine;
