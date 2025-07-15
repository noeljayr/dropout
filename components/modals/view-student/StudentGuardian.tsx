"use client";

import { getStudentGuardian } from "@/api/students";
import Loader from "@/components/ux/Loader";
import { useEffect, useState } from "react";

type Props = {
  studentId: string;
};

type DATA = {
  first_name: string;
  last_name: string;
  relationship_to_student: string;
  phone_number: string;
  email: string;
  address: string;
  occupation: string;
  id: string;
};

function StudentGuardian({ studentId }: Props) {
  const [data, setData] = useState<DATA>();
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getStudentGuardian({
      setData,
      setIsError,
      setIsLoading,
      setResponseMessage: () => {},
      id: studentId,
    });
  }, []);

  

  return (
    <div className="section flex flex-col gap-2 font-p-2 p-2 bg-white/50 rounded-[var(--radius-m)] border border-[var(--border-2)]">
      <span className="font-semibold">Guardian Information</span>
      {loading && (
        <div className="w-full h-[5rem]  flex items-center justify-center">
          <Loader variant="primary" />
        </div>
      )}
      {data && (
        <div className="grid gap-4 grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="font-medium opacity-70 font-p-3">Name</span>{" "}
            <span className="capitalize">
              {data.first_name} {data.last_name}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium opacity-70 font-p-3">Related by</span>{" "}
            <span className=" capitalize">
              {data.relationship_to_student}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium opacity-70 font-p-3">Email</span>{" "}
            <span className="">
              {data.email}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium opacity-70 font-p-3">Phone</span>{" "}
            <span className=" capitalize">
              {data.phone_number}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium opacity-70 font-p-3">Address</span>{" "}
            <span className=" capitalize">
              {data.address}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium opacity-70 font-p-3">Occupation</span>{" "}
            <span className=" capitalize">
              {data.occupation}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentGuardian;
