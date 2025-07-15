"use client";

import NumberFlow from "@number-flow/react";
import { getStats } from "@/api/stats";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type DATA = {
  total_students: number;
  at_risk_students: number;
  total_classes: number;
  average_attendance: number;
};

function Overview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<DATA>();

  useEffect(() => {
    getStats({
      setData,
      setIsError,
      setIsLoading,
      setResponseMessage: () => {},
    });
  }, []);

  return (
    <div className="grid w-[45rem] h-[5rem] grid-cols-4 gap-4">
      <>
        <Link
          href="/dashboard/classes"
          className="bg-white flex flex-col gap-2 relative p-2 rounded-[var(--radius-m)] border border-[var(--border-2)] h-full"
        >
          <span className="font-medium font-p-2 opacity-70">Classes</span>
          <span className="bg-[var(--background)] h-6 w-6 rounded-full absolute right-1 top-1 flex items-center justify-center">
            <IconArrowUpRight className="h-4 w-4" color="var(--primary)" />
          </span>
          {data && (
            <span className="font-semibold font-h-2 mt-auto">
              <NumberFlow value={data.total_classes} />
            </span>
          )}
        </Link>

        <Link
          href="/dashboard/students"
          className="bg-white flex flex-col gap-2 relative p-2 rounded-[var(--radius-m)] border border-[var(--border-2)] h-full"
        >
          <span className="font-medium font-p-2 opacity-70">Students</span>
          <span className="bg-[var(--background)] h-6 w-6 rounded-full absolute right-1 top-1 flex items-center justify-center">
            <IconArrowUpRight className="h-4 w-4" color="var(--primary)" />
          </span>
          {data && (
            <span className="font-semibold font-h-2 mt-auto">
              <NumberFlow value={data.total_students} />
            </span>
          )}
        </Link>

        <Link
          href="/dashboard/students"
          className="bg-white flex flex-col gap-2 relative p-2 rounded-[var(--radius-m)] border border-[var(--border-2)] h-full"
        >
          <span className="font-medium font-p-2 opacity-70">
            Students at risk
          </span>
          <span className="bg-[var(--background)] h-6 w-6 rounded-full absolute right-1 top-1 flex items-center justify-center">
            <IconArrowUpRight className="h-4 w-4" color="var(--primary)" />
          </span>
          {data && (
            <span className="font-semibold font-h-2 mt-auto">
              <NumberFlow value={data.at_risk_students} />
            </span>
          )}
        </Link>

        <Link
          href="#"
          className="bg-white flex flex-col gap-2 relative p-2 rounded-[var(--radius-m)] border border-[var(--border-2)] h-full"
        >
          <span className="font-medium font-p-2 opacity-70">
            Attendance rate
          </span>
        
          {data && (
            <span className="font-semibold font-h-2 mt-auto">
              <NumberFlow value={data.average_attendance} />{" "}
              <span className="opacity-50 font-p-1">%</span>
            </span>
          )}
        </Link>
      </>
    </div>
  );
}

export default Overview;
