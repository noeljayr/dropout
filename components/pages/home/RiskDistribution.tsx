"use client";

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import NumberFlow from "@number-flow/react";

import { getRiskDistribution } from "@/api/students";
import Loader from "@/components/ux/Loader";

ChartJS.register(ArcElement, Legend);

type DATA = {
  low: number;
  medium: number;
  high: number;
  critical: number;
};

export const ChartOptions = {
  cutout: "65%",
  offset: 5,
  borderRadius: 5,
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: { top: 5, right: 5, bottom: 5, left: 5 },
  },
  responsive: true,
  maintainAspectRatio: false,
};

function StudentGenderDistribution() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [riskData, setData] = useState<DATA>();

  useEffect(() => {
    getRiskDistribution({
      setData,
      setIsError,
      setIsLoading,
      setResponseMessage: () => {},
    });
  }, []);

  const data = {
    labels: ["Critical", "High", "Medium", "Low"],
    datasets: [
      {
        data: [
          riskData?.critical,
          riskData?.high,
          riskData?.medium,
          riskData?.low,
        ],
        backgroundColor: ["#fe0000", "#f756ce", "#ffa106", "#01b18a"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
    Tooltip: {
      display: true,
    },
  };

  return (
    <div className="w-[22rem] p-2 grid grid-rows-[auto_1fr] gap-2 h-[14rem] bg-white rounded-[var(--radius-m)] border border-[var(--border-2)]">
      <span className="font-semibold opacity-70">
        Student risk distribution
      </span>
      <div className="overflow-hidden items-center h-full w-full grid grid-cols-[1fr_auto] relative">
        {isLoading ? (
          <div className="flex w-full h-full items-center justify-center">
            <Loader variant="primary" />
          </div>
        ) : isError ? (
          <div className="flex w-full h-full items-center justify-center">
            <span className="font-p-2">Something went wrong</span>
          </div>
        ) : data ? (
          <>
            <div className="flex items-center justify-center relative h-full w-full left-[-1rem] overflow-hidden chart-container">
              <Doughnut
                width="100%"
                style={{ position: "absolute" }}
                height="100%"
                data={data}
                options={ChartOptions}
              />
            </div>

            <div className="legend font-p-4 flex flex-col gap-2 ">
              <span className="legend-stat critical flex items-center gap-2">
                <span className="number stat">
                  <NumberFlow value={riskData?.critical || 0} />
                </span>
                Critical
              </span>

              <span className="legend-stat high flex items-center gap-2">
                <span className="number stat">
                  <NumberFlow value={riskData?.high || 0} />
                </span>
                High
              </span>

              <span className="legend-stat medium flex items-center gap-2">
                <span className="number stat">
                  <NumberFlow value={riskData?.medium || 0} />
                </span>
                Medium
              </span>

              <span className="legend-stat low flex items-center gap-2">
                <span className="number stat">
                  <NumberFlow value={riskData?.low || 0} />
                </span>
                Low
              </span>
            </div>
          </>
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <span className="font-p-2 font-semibold opacity-75">
              No data found
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentGenderDistribution;
