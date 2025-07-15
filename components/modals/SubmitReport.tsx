"use client";

import { getStudentById } from "@/api/students";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../ux/Loader";
import { IconX } from "@tabler/icons-react";
import { getSubjects } from "@/api/subjects";

type Student = {
  student_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  home_address: string;
  distance_to_school: number;
  special_learning: boolean;
  textbook_availability: boolean;
  class_repetitions: number;
  household_income: "high";
  age: number;
  status: string;
  class_id: string;
  id: string;
};

type DATA = {
  name: string;
  code: string;
  type: string;
  id: string;
  description: string;
};

function SubmitReport() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const report = searchParams.get("report");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [data, setData] = useState<DATA[]>();

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    getSubjects({
      setData,
      setIsError: () => {},
      setIsLoading: () => {},
      setResponseMessage: () => {},
    });
  }, []);

  useEffect(() => {
    if (report && report.length > 3) {
      setOpen(true);
      getStudentById({
        id: report,
        setData: setStudent,
        setIsError,
        setIsLoading,
        setResponseMessage,
      });
    } else {
      setOpen(false);
    }
  }, [report]);

  const close = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("report");
    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
    history.pushState(null, "", newUrl);
  };

  return (
    <>
      {open && <div onClick={close} className="modal-overlay"></div>}
      <div className={`modal ${open ? "modal-active" : ""}`}>
       
        {student && (
          <>
            <div className="flex w-full items-center">
              <span className="font-semibold">
                End of term 1 report for {student.first_name}{" "}
                {student.last_name}
              </span>
              <span
                onClick={close}
                className="ml-auto h-6 w-6 bg-white rounded-[var(--radius-s)] border border-[var(--border-2)] flex items-center cursor-pointer justify-center"
              >
                <IconX className="w-4 h-4" strokeWidth={1} />
              </span>
            </div>
            <form action="" className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Days present</label>
                  <div className="input-group">
                    <input type="number" min={0} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Days absent</label>
                  <div className="input-group">
                    <input type="number" min={0} />
                  </div>
                </div>
              </div>

              <div className="subjects w-full p-2 flex flex-col gap-4 bg-white/80 border border-[var(--border-2)] rounded-[var(--radius-m)]">
                <label htmlFor="">Scores</label>

                <div className="grid grid-cols-2 gap-4">
                  {data &&
                    data.map((d, index) => (
                      <div className="flex flex-col gap-2">
                        <label htmlFor="">{d.name}  {`(0 - 100%)`}</label>
                        <div className="input-group">
                          <input type="number" min={0} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="">Remark</label>
                <div className="input-group">
                  <input type="number" min={0} />
                </div>
              </div>

              <div className="cta-container w-full flex mt-2 gap-4 items-center">
                {isError && <span className="error">Something went wrong</span>}
                {isSuccess && (
                  <span className="font-semibold h-fit font-p-4 px-4 py-1.5 bg-green-100 text-green-600 border border-green-300 rounded-4xl">
                    Assessment success
                  </span>
                )}
                <button onClick={close} className="cta-2 ml-auto" type="button">
                  Cancel
                </button>
                <button type="button" onClick={()=>setIsLoading(true)} className="cta">
                  {isLoading ? <Loader /> : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default SubmitReport;
