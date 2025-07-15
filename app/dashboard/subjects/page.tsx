"use client";

import { getClassesWithStudents } from "@/api/classes";
import { getSubjects } from "@/api/subjects";
import Loader from "@/components/ux/Loader";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type DATA = {
  name: string;
  code: string;
  type: string;
  id: string;
  description: string;
};

function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [data, setData] = useState<DATA[]>();

  useEffect(() => {
    getSubjects({
      setData,
      setIsError,
      setIsLoading,
      setResponseMessage,
    });
  }, []);
  return (
    <div className="students-table grid bg-white rounded-[var(--radius-m)] p-2 border border-[var(--border-2)] w-full h-full grid-rows-[auto_1fr] overflow-hidden">
      <div className="grid w-full grid-rows-[auto_1fr_auto] overflow-hidden">
        <div className="grid font-p-3 grid-cols-[1fr_1fr_1fr_1fr] py-2 border-b border-b-[var(--border-2)]">
          <span className="opacity-50 font-semibold">Name</span>
          <span className="opacity-50 font-semibold">Code</span>
          <span className="opacity-50 font-semibold">Type</span>
          <span className="opacity-50 font-semibold">Description</span>
          
        </div>

        <div className="w-full h-full relative overflow-y-auto grid auto-rows-min">
          {isLoading && (
            <div className="absolute w-full h-full flex items-center justify-center">
              <Loader variant="primary" />
            </div>
          )}
          {isError && <></>}

          {data &&
            data.map((subject, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_1fr_1fr] py-2.5 border-b border-b-[var(--border-2)] last:border-b-0 cursor-pointer hover:bg-[var(--input-bg)]"
              >
                <span>{subject.name}</span>
                <span>{subject.code}</span>
                <span className="capitalize">{subject.type}</span>
                <span className="truncate font-p-3">{subject.description}</span>
                
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default page;
