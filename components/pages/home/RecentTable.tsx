"use client";

import { getRecentStudents } from "@/api/students";
import Loader from "@/components/ux/Loader";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

function RecentTable() {
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
      limit: 10
    });
  }, [refresh]);


  const viewStudent = (id: string) => {
      const params = new URLSearchParams(useSearchParams.toString());
      params.set("student", id);
      history.pushState(null, "", `?student=${id}`);
    };


  return (
    <div className="students-table grid bg-white rounded-[var(--radius-m)] p-2 border border-[var(--border-2)] w-full h-full grid-rows-[auto_auto_1fr] overflow-hidden">
      <span className="font-semibold opacity-70">
        Students enrolled recently
      </span>

      <div className="grid w-full grid-rows-[auto_1fr] overflow-hidden">
        <div className="grid font-p-3 grid-cols-[1fr_1fr_1fr_1fr_5rem] py-2 border-b border-b-[var(--border-2)]">
          <span className="opacity-50 font-semibold">Name</span>
          <span className="opacity-50 font-semibold">Class</span>
          <span className="opacity-50 font-semibold">Attendance rate</span>
          <span className="opacity-50 font-semibold">Age</span>
          <span className="opacity-50 font-semibold">Risk</span>
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
          ) : data ? (
            <>
              {data.map((student, index) => (
                <div
                onClick={() => viewStudent(student.id)}
                style={{transition: "ease 0.5s"}}
                  key={index}
                  className="grid grid-cols-[1fr_1fr_1fr_1fr_5rem] py-2.5 border-b border-b-[var(--border-2)] last:border-b-0 cursor-pointer hover:bg-[var(--input-bg)]"
                >
                  <span>
                    {student.first_name} {student.last_name}
                  </span>
                  <span>{student.class_name}</span>
                  <span>{student.last_attendance} %</span>
                  <span>{student.age}</span>
                  <span className={`${student.risk_level}`}>{student.risk_level}</span>
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
    </div>
  );
}

export default RecentTable;
