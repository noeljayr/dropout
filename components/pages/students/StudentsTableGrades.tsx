"use client";

import { getRecentStudents } from "@/api/students";
import Loader from "@/components/ux/Loader";
import { IconChevronLeft, IconChevronRight, IconPlus } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type DATA = {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  class_name: string;
  risk_level: string;
  last_attendance: number;
};

type PROPS = {
  searchName: string;
  filterRisk: string;
  filterClass: string;
};

function StudentsTableGrades({ searchName, filterClass, filterRisk }: PROPS) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<DATA[] | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getRecentStudents({
      setIsLoading,
      setIsError,
      setData,
      setResponseMessage: () => {},
      limit: 1000,
    });
  }, [refresh]);

  const submitReport = (id: string) => {
    const params = new URLSearchParams(useSearchParams.toString());
    params.set("report", id);
    history.pushState(null, "", `?report=${id}`);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((student) => {
      const fullName =
        `${student.first_name} ${student.last_name}`.toLowerCase();
      const matchesName = fullName.includes(searchName.toLowerCase());
      const matchesRisk = filterRisk ? student.risk_level === filterRisk : true;
      const matchesClass = filterClass
        ? student.class_name === filterClass
        : true;

      return matchesName && matchesRisk && matchesClass;
    });
  }, [data, searchName, filterRisk, filterClass]);

  const uniqueClasses = useMemo(() => {
    return [...new Set(data?.map((s) => s.class_name))].filter(Boolean);
  }, [data]);

  const uniqueRisks = useMemo(() => {
    return [...new Set(data?.map((s) => s.risk_level))].filter(Boolean);
  }, [data]);

  return (
    <div className="students-table grid bg-white rounded-[var(--radius-m)] p-2 border border-[var(--border-2)] w-full h-full grid-rows-[auto_1fr] overflow-hidden">
      <div className="grid w-full grid-rows-[auto_1fr_auto] overflow-hidden">
        <div className="grid font-p-3 grid-cols-[1fr_1fr_7.5rem] py-2 border-b border-b-[var(--border-2)]">
          <span className="opacity-50 font-semibold">Name</span>
          <span className="opacity-50 font-semibold">Class</span>
          <span className="opacity-50 font-semibold"></span>
        </div>

        <div className="w-full h-full relative overflow-y-auto grid auto-rows-min">
          {isLoading ? (
            <div className="absolute w-full h-full flex items-center justify-center">
              <Loader variant="primary" />
            </div>
          ) : isError ? (
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              <span className="font-semibold font-p-3 mb-2">
                Something went wrong.
              </span>
              <span
                onClick={() => setRefresh(!refresh)}
                className="font-p-3 font-medium cursor-pointer px-3 py-1.5 w-fit rounded-[var(--radius-s)] border border-[var(--border-2)]"
              >
                Refresh
              </span>
            </div>
          ) : filteredData ? (
            <>
              {filteredData.map((student, index) => (
                <div
                  onClick={() => submitReport(student.id)}
                  style={{ transition: "ease 0.5s" }}
                  key={index}
                  className="grid grid-cols-[1fr_1fr_7.5rem] py-2.5 border-b border-b-[var(--border-2)] last:border-b-0 cursor-pointer hover:bg-[var(--input-bg)]"
                >
                  <span>
                    {student.first_name} {student.last_name}
                  </span>
                  <span>{student.class_name}</span>
                  <button className="px-2 py-1.5 flex border items-center gap-1 font-semibold cursor-pointer font-p-4 border-[var(--border)] w-fit bg-white rounded-[var(--radius-s)]">
                    <IconPlus className="h-3 w-3 opacity-50" />
                    Submit report</button>
                </div>
              ))}
            </>
          ) : (
            <div className="absolute w-full h-full flex flex-col items-center justify-center">
              <span className="font-semibold font-p-3 mb-2">
                No data to show
              </span>
              <span
                onClick={() => setRefresh(!refresh)}
                className="font-p-3 font-medium cursor-pointer px-3 py-1.5 w-fit rounded-[var(--radius-s)] border border-[var(--border-2)]"
              >
                Refresh
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-auto items-center justify-center">
        <span className="opacity-50 cursor-not-allowed">
          <IconChevronLeft />
        </span>

        <span className="bg-[var(--input-bg)] h-7 flex items-center justify-center w-7 rounded-[var(--radius-s)] border border-[var(--border-2)]">
          1
        </span>
        <span className="opacity-50 cursor-not-allowed">
          <IconChevronRight />
        </span>
      </div>
    </div>
  );
}

export default StudentsTableGrades;
