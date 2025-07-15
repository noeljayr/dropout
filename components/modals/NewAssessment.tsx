"use client";

import { newPrediction } from "@/api/predictions";
import { getStudentById } from "@/api/students";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../ux/Loader";

const closeViewStudent = () => {
  const params = new URLSearchParams(window.location.search);
  params.delete("student");
  const newSearch = params.toString();
  const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
  history.pushState(null, "", newUrl);
};

const close = () => {
  const params = new URLSearchParams(window.location.search);
  params.delete("new-assesment");
  const newSearch = params.toString();
  const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
  history.pushState(null, "", newUrl);
};

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

function NewAssessmentButton({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const state = searchParams.get("new-assesment");

  const openModal = () => {
    closeViewStudent();

    const params = new URLSearchParams(useSearchParams.toString());
    params.set("new-assesment", id);
    history.pushState(null, "", `?new-assesment=${id}`);
  };

  useEffect(() => {
    if (state && state.length > 3) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [state]);

  return (
    <button
      onClick={openModal}
      className="px-2 py-1.5 flex gap-1 cursor-pointer items-center  mr-auto bg-white rounded-[var(--radius-s)] border border-[var(--border-2)] font-p-3"
    >
      <IconPlus color="var(--primary)" className="h-4 w-4 opacity-50" />
      New assesment
    </button>
  );
}

export default NewAssessment;

function NewAssessment() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [student, setStudent] = useState<Student>();
  const [bullying_incidents_total, setIncidents] = useState(0);
  const [school_attendance_rate, setATRate] = useState(0);
  const [term_avg_score, setAvg] = useState(0);
  const [class_repetitions, setReps] = useState(0);

  const studentId = searchParams.get("new-assesment");

  useEffect(() => {
    if (studentId && studentId.length > 3) {
      setOpen(true);
      getStudentById({
        id: studentId,
        setData: setStudent,
        setIsError,
        setIsLoading,
        setResponseMessage,
      });
    } else {
      setOpen(false);
    }
  }, [studentId]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!student) return;
    newPrediction({
      age: student.age,
      bullying_incidents_total,
      class_repetitions,
      distance_to_school: student.distance_to_school,
      gender: student.gender == "male" ? "Male" : "Female",
      household_income: student.household_income,
      orphan_status: "single",
      school_attendance_rate,
      special_learning: student.special_learning,
      standard: 1,
      student_id: student.id,
      setResponseMessage,
      setIsError,
      setIsLoading,
      setIsSuccess,
      term_avg_score,
    });
  };

  return (
    <>
      {open && <div onClick={close} className="modal-overlay"></div>}

      <div className={`modal ${open ? "modal-active" : ""}`}>
        {student && (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex items-center">
              <span className="font-semibold">
                New assessment for {student.first_name} {student.last_name}
              </span>
              <span
                onClick={close}
                className="ml-auto h-6 w-6 bg-white rounded-[var(--radius-s)] border border-[var(--border-2)] flex items-center cursor-pointer justify-center"
              >
                <IconX className="w-4 h-4" strokeWidth={1} />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Total number of bullying incidents</label>
                <div className="input-group">
                  <input
                    value={bullying_incidents_total}
                    onChange={(e) => setIncidents(parseInt(e.target.value))}
                    type="number"
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="">Class repititions</label>
                <div className="input-group">
                  <input
                    value={class_repetitions}
                    onChange={(e) => setReps(parseInt(e.target.value))}
                    type="number"
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Shool attendance rate{" "}
                  <span className="font-p-3 opacity-50">{`( 0 - 100%)`}</span>
                </label>
                <div className="input-group">
                  <input
                    value={school_attendance_rate}
                    onChange={(e) => setATRate(parseInt(e.target.value))}
                    type="number"
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Average score{" "}
                  <span className="font-p-3 opacity-50">{`( 0 - 100%)`}</span>
                </label>
                <div className="input-group">
                  <input
                    value={term_avg_score}
                    onChange={(e) => setAvg(parseInt(e.target.value))}
                    type="number"
                    min={0}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="cta-container w-full flex mt-2 gap-4 items-center">
              {isError && <span className="error">Something went wrong</span>}
              {isSuccess && <span  className="font-semibold h-fit font-p-4 px-4 py-1.5 bg-green-100 text-green-600 border border-green-300 rounded-4xl">Assessment success</span>}
              <button onClick={close} className="cta-2 ml-auto" type="button">
                Cancel
              </button>
              <button className="cta">
                {isLoading ? <Loader /> : "Assess"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export { NewAssessment, NewAssessmentButton };
