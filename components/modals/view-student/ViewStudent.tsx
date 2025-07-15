"use client";

import "@/css/modals.css";
import {  IconX } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getStudentAssessment } from "@/api/students";
import Loader from "../../ux/Loader";
import HistoryChart from "./HistoryChart";
import { formatDate } from "@/utils/formatDate";
import { NewAssessmentButton } from "../NewAssessment";
import StudentGuardian from "./StudentGuardian";

type SubjectScore = {
  subject: string;
  score: number;
  grade: string;
};

type RiskPrediction = {
  risk_score: number;
  risk_level: string;
  contributing_factors: string[];
  recommendations: string[];
  prediction_time: string;
};

type PredictionHistory = {
  date: string;
  risk_level: number;
  score: number;
};

type StudentData = {
  student_info: {
    student_id: string;
    name: string;
    age: number;
    gender: string;
    status: string;
    class: string;
  };
  academic_performance: {
    current_term: string;
    average_score: number;
    subject_scores: SubjectScore[];
  };
  risk_assessment: {
    real_time_prediction: RiskPrediction;
    historical_predictions: PredictionHistory[];
  };
};

const tabs = ["Student Info", "Academic Performance", "Risk Assessment"];

function ViewStudent() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<StudentData>();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const student = searchParams.get("student");

  useEffect(() => {
    if (student && student.length > 3) {
      setOpen(true);

      getStudentAssessment({
        setData,
        setIsError,
        setIsLoading,
        setResponseMessage: () => {},
        id: student,
      });
    } else {
      setOpen(false);
    }
  }, [student]);

  const close = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("student");
    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
    history.pushState(null, "", newUrl);
  };

  return (
    <>
      {open && <div onClick={close} className="modal-overlay"></div>}

      <AnimatePresence mode="popLayout">
        <motion.div
          layout="position"
          className={`modal ${open ? "modal-active" : ""} h-[25rem]`}
        >
          <motion.div layout="position" className="w-full flex items-center">
            <span className="font-semibold opacity-70">
              Student Information
            </span>

            <span
              onClick={close}
              className="ml-auto h-6 w-6 bg-white rounded-[var(--radius-s)] border border-[var(--border-2)] flex items-center cursor-pointer justify-center"
            >
              <IconX className="w-4 h-4" strokeWidth={1} />
            </span>
          </motion.div>

          {isLoading ? (
            <div className="h-[10rem] w-full flex items-center justify-center">
              <Loader variant="primary" />
            </div>
          ) : isError ? (
            <></>
          ) : data ? (
            <>
              <motion.div layout="position" className="w-full relative">
                <div className="grid grid-cols-3 border-b border-b-[var(--border-2)] font-p-3">
                  {tabs.map((tab, index) => (
                    <span
                      key={index}
                      onClick={() => setActiveTab(tab)}
                      style={{ transition: "ease 0.5s" }}
                      className={`relative text-center ${
                        activeTab === tab ? "opacity-100" : "opacity-50"
                      } font-medium cursor-pointer pb-2`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="underline"
                          className="absolute left-0 right-0 bottom-0 h-[1px] bg-[var(--primary)]"
                        />
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {activeTab === "Student Info" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout="position"
                    key={"info"}
                    className="flex flex-col gap-1"
                  >
                    <div className="section font-p-2 p-2 bg-white/50 rounded-[var(--radius-m)] border border-[var(--border-2)]">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="font-medium opacity-70 font-p-3">ID</span>{" "}
                          <span className="capitalize">
                            {data.student_info.student_id}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium opacity-70 font-p-3">Name</span>{" "}
                          <span className="capitalize">
                            {data.student_info.name}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium opacity-70 font-p-3">Class</span>{" "}
                          <span className="capitalize">
                            {data.student_info.class}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium opacity-70 font-p-3">Age</span>{" "}
                          <span className="capitalize">
                            {data.student_info.age}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium opacity-70 font-p-3">
                            Gender
                          </span>{" "}
                          <span className="capitalize">
                            {data.student_info.gender}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="font-medium opacity-70 font-p-3">
                            Status
                          </span>{" "}
                          <span className="capitalize">
                            {data.student_info.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <StudentGuardian
                      studentId={student || ""}
                    />
                  </motion.div>
                ) : activeTab === "Academic Performance" ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout="position"
                    key={"ac"}
                    className="section font-p-2 p-2 bg-white/50 rounded-[var(--radius-m)] border border-[var(--border-2)]"
                  >
                    <span className="font-p-3 mb-4">
                      Current term{" "}
                      <span className="opacity-50">{`(${data.academic_performance.current_term.toUpperCase()})`}</span>
                    </span>

                    <div className="grid grid-cols-2 gap-2 my-4">
                      {data.academic_performance.subject_scores.map(
                        (subj, idx) => (
                          <div
                            key={idx}
                            className="flex relative w-full justify-between items-center border border-[var(--primary)]/15 p-2 rounded-[var(--radius-m)] overflow-hidden"
                          >
                            <div className="font-medium">{subj.subject}</div>
                            <div className="text-right">
                              <div className="font-p-2">
                                {subj.score.toFixed(0)}%
                              </div>
                              <div className="font-p-4 mt-0.5 text-gray-500">
                                Grade: {subj.grade}
                              </div>
                            </div>

                            <motion.span
                              whileInView={{ width: `${subj.score}%` }}
                              className={`absolute left-0 top-0 bg-[var(--primary)]/5  h-full`}
                            ></motion.span>
                          </div>
                        )
                      )}
                    </div>

                    <div className="">
                      <span className="font-medium">Average Score:</span>{" "}
                      {data.academic_performance.average_score.toFixed(0)}%
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout="position"
                    key={"assess"}
                    className="flex flex-col gap-2 max-h-[28rem] overflow-y-auto"
                  >
                    <div className="section font-p-2 p-2 bg-white/50 rounded-[var(--radius-m)] border border-[var(--border-2)]">
                      <div className="flex w-full items-center gap-4">
                        <NewAssessmentButton id={student || ""} />

                        <div className="font-p-3">
                          <span className="font-medium">Risk Score:</span>{" "}
                          {data.risk_assessment.real_time_prediction.risk_score.toFixed(
                            2
                          )}
                        </div>

                        <div
                          className={`font-p-4 flex items-center h-fit rounded-full font-medium ${data.risk_assessment.real_time_prediction.risk_level}`}
                        >
                          {data.risk_assessment.real_time_prediction.risk_level}
                        </div>
                      </div>
                      <div className="text-sm mt-2">
                        <div className=" bg-white p-3 rounded-[var(--radius-m)]">
                          <div className="font-medium mb-1">
                            Contributing Factors:
                          </div>
                          <ul className="list-disc list-inside opacity-70">
                            {data.risk_assessment.real_time_prediction.contributing_factors.map(
                              (f, i) => (
                                <li className="leading-[180%]" key={i}>
                                  {f}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="mt-1 bg-white p-3 rounded-[var(--radius-m)]">
                          <div className="font-medium mb-1">
                            Recommendations:
                          </div>
                          <ul className="list-disc opacity-70 list-inside">
                            {data.risk_assessment.real_time_prediction.recommendations.map(
                              (r, i) => (
                                <li className="leading-[180%]" key={i}>
                                  {r}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="mt-2 font-p-3 opacity-50 font-medium">
                          Last assessed on:{" "}
                          {formatDate(
                            data.risk_assessment.real_time_prediction
                              .prediction_time
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="section font-p-2 p-2 flex flex-col gap-2 bg-white/50 rounded-[var(--radius-m)] border border-[var(--border-2)]">
                      <span className="font-semibold">Assessment history</span>
                      <div className="flex relative w-full">
                        <HistoryChart
                          historical_predictions={
                            data.risk_assessment.historical_predictions
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <></>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default ViewStudent;
