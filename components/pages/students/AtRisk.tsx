"use client";

import { getStats } from "@/api/stats";
import { useEffect, useState } from "react";

type DATA = {
  total_students: number;
  at_risk_students: number;
  total_classes: number;
  average_attendance: number;
};

type PROPS = {
  filterRisk: string;
  setFilterRisk: (filter: string) => void;
};

function AtRisk({ setFilterRisk, filterRisk }: PROPS) {
  const [data, setData] = useState<DATA>();

  useEffect(() => {
    getStats({
      setData,
      setIsError: () => {},
      setIsLoading: () => {},
      setResponseMessage: () => {},
    });
  }, []);

  const toggleFilter = (state: string) => {
    if (filterRisk == state) {
      setFilterRisk("");
    } else {
      setFilterRisk(state);
    }
  };

  return (
    <button
      style={{
        border: `1px solid ${
          filterRisk == "critical" ? "var(--primary)" : "var(--border-2)"
        }`,
      }}
      onClick={() => toggleFilter("critical")}
      className="cta-2  mx-2"
    >
      <span className="text-red-600 font-semibold">
        {data?.at_risk_students}
      </span>
      <span className="opacity-80"> students at risk</span>
    </button>
  );
}

export default AtRisk;
