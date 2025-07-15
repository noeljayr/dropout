"use client";
import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loader from "@/components/ux/Loader";
import { getClassesWithStudents } from "@/api/classes";

type DATA = {
  id: string;
  class_name: string;
  name: string;
  code:string;
  grade_level: string;
  academic_year: string;
  max_capacity: number;
  capacity: number;
  current_enrollment: number;
  teacher_id: string;
  teacher_name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentBarChart: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [classes, setClasses] = useState<DATA[]>();
  const [labels, setLabels] = useState<string[]>([]);
  const [dataValues, setDataValues] = useState<number[]>([]);

  useEffect(() => {
    getClassesWithStudents({
      setData: setClasses,
      setIsError,
      setResponseMessage: () => {},
      setIsLoading,
    });
  }, []);

  useEffect(() => {
    if (!classes) return;
    if (classes.length < 1) return;

    const labels: string[] = [];
    const data: number[] = [];

    classes.forEach((className) => {
      labels.push(className.name);
      data.push(className.current_enrollment);
    });

    setDataValues(data);
    setLabels(labels);
  }, [classes]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Students",
        data: dataValues,
        backgroundColor: "#006ff9",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Student Count per Class",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex w-full h-full relative">
      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex w-full h-full items-center justify-center">
          <span className="font-p-2">Something went wrong</span>
        </div>
      ) : classes ? (
        <>
          <Bar
            width="100%"
            style={{ position: "absolute" }}
            height="100%"
            options={options}
            data={data}
          />
        </>
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <span className="font-p-3 opacity-75">No data found</span>
        </div>
      )}
    </div>
  );
};

function ClassChart() {
  return (
    <div className="grid p-2 grid-rows-[auto_1fr] rounded-[var(--radius-m)] border bg-white border-[var(--border-2)]  student-bar-chart relative">
      <div className="font-semibold font-p-2 opacity-55 relative flex items-center">
        Total active students by class
      </div>
      <div className="mt-1 overflow-hidden items-center h-full w-full flex relative">
        <StudentBarChart />
      </div>
    </div>
  );
}

export default ClassChart;
