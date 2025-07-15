"use client";

import { getClassesWithStudents } from "@/api/classes";
import { createStudent } from "@/api/students";
import Loader from "@/components/ux/Loader";
import {
  IconChevronDown,
  IconCircleCheckFilled,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const genders = ["male", "female"];
const incomes = ["high", "medium", "low"];
const transport = [
  {
    label: "walking",
    value: "walking"
  },
  {
    label: "bicycle",
    value: "bicycle",
  }
  ,{
    label: "public transport",
    value: "public_transport",
  }
,
  {
    label: "private transport",
    value: "private_transport",
  }
];

type methodTr = {
  label: string,
  value: string
}

type DATA = {
  id: string;
  class_name: string;
  name: string;
  code: string;
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

function AddStudent() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [activeGender, setActiveGender] = useState(genders[0]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [date_of_birth, setDoB] = useState("");
  const [home_address, setHomeAddy] = useState("");
  const [class_id, setClassId] = useState("");
  const [selectedClass, setSelectedClass] = useState<DATA | null>(null);
  const [student_id, setStudentId] = useState("");
  const [distance_to_school, setDistance] = useState(0);
  const [enrollment_date, setEDate] = useState("");
  const [class_repetitions, setClassrR] = useState(0);
  const [household_income, setIncome] = useState(incomes[2]);
  const [transport_method, setTrans] = useState("");
  const [special_learning, setSpecialLearning] = useState(false);
  const guardian_id = "838de2d0-84cf-4fc5-acd7-e2a65a034a33";
  const [selectedMethod, setSelectedMethod] = useState<methodTr>()

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const state = searchParams.get("add-student");

  useEffect(() => {
    if (selectedClass) {
      setClassId(selectedClass.id);
    }
  }, [selectedClass]);

  useEffect(()=>{
    if(selectedMethod){
      setTrans(selectedMethod.value)
    }
  }, [selectedMethod])

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    createStudent({
      first_name,
      last_name,
      class_id,
      class_repetitions,
      date_of_birth,
      distance_to_school,
      enrollment_date,
      gender: activeGender,
      guardian_id,
      home_address,
      household_income,
      special_learning,
      student_id,
      textbook_availability: true,
      transport_method,
      setIsError,
      setIsLoading,
      setIsSuccess,
      setResponseMessage,
    });
  };

  useEffect(() => {
    if (state && state == "true") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [state]);

  const close = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("add-student");
    const newSearch = params.toString();
    const newUrl = newSearch ? `?${newSearch}` : window.location.pathname;
    history.pushState(null, "", newUrl);
  };

  const [classes, setClasses] = useState<DATA[]>();
  const [classesOpen, setClassesOpen] = useState(false);
  const classDdown = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getClassesWithStudents({
      setData: setClasses,
      setIsError: () => {},
      setIsLoading: () => {},
      setResponseMessage: () => {},
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        classDdown.current &&
        !classDdown.current.contains(event.target as Node)
      ) {
        setClassesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [transOpen, setTransOpen] = useState(false);
  const transDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getClassesWithStudents({
      setData: setClasses,
      setIsError: () => {},
      setIsLoading: () => {},
      setResponseMessage: () => {},
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        transDiv.current &&
        !transDiv.current.contains(event.target as Node)
      ) {
        setTransOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {open && <div onClick={close} className="modal-overlay"></div>}
      <form
        onSubmit={submit}
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          height: "25rem",
        }}
        className={`modal ${open ? "modal-active" : ""} h-[25rem]`}
      >
        <div className="w-full flex items-center">
          <span className="font-semibold opacity-70">New student</span>

          <span
            onClick={close}
            className="ml-auto h-6 w-6 bg-white rounded-[var(--radius-s)] border border-[var(--border-2)] flex items-center cursor-pointer justify-center"
          >
            <IconX className="w-4 h-4" strokeWidth={1} />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 overflow-y-auto auto-rows-min">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              First name
            </label>
            <div className="input-group">
              <input
                required
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Last name
            </label>
            <div className="input-group">
              <input
                required
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Gender
            </label>
            <div className="flex gap-4 mt-2">
              {genders.map((gender) => (
                <span
                  onClick={() => setActiveGender(gender)}
                  className={`radio-btn-container  ${
                    activeGender === gender ? "selected-radio-btn" : ""
                  }`}
                  key={gender}
                >
                  <span className="radio-btn">
                    <IconCircleCheckFilled color="var(--primary)" />
                  </span>
                  <span className="radio-btn-label capitalize">{gender}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Date of birth
            </label>
            <div className="input-group">
              <input
                required
                value={date_of_birth}
                onChange={(e) => setDoB(e.target.value)}
                type="date"
                placeholder="date of birth"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <label htmlFor="" className="font-medium">
              Home address
            </label>
            <div style={{ height: "4rem" }} className="input-group">
              <textarea
                required
                value={home_address}
                onChange={(e) => setHomeAddy(e.target.value)}
                placeholder="address"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Distance to school (KM)
            </label>
            <div className="input-group">
              <input
                required
                value={distance_to_school}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                type="number"
                min={0}
                placeholder="Distance"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Enrollment date
            </label>
            <div className="input-group">
              <input
                required
                value={enrollment_date}
                onChange={(e) => setEDate(e.target.value)}
                type="date"
                placeholder="date of birth"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Student id
            </label>
            <div className="input-group">
              <input
                required
                value={student_id}
                onChange={(e) => setStudentId(e.target.value)}
                type="text"
                placeholder="ID number"
              />
            </div>
          </div>

          <div className=" flex-col gap-2 relative grid grid-rows-[auto_2.15rem]">
            <label htmlFor="" className="font-medium">
              Class
            </label>
            <span
              onClick={() => setClassesOpen(!classesOpen)}
              className="w-full input-group relative z-[3] font-medium cursor-pointer h-[2.15rem] items-center px-2 grid grid-cols-[1fr_auto]"
            >
              <span>
                {selectedClass ? selectedClass.class_name : "Select a class"}
              </span>

              <span className="border-l border-l-[var(--border)] pl-1 ml-auto">
                <IconChevronDown
                  style={{ transition: "ease 0.5s" }}
                  className={`h-4 w-4 opacity-50 ${
                    classesOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </span>
            <AnimatePresence mode="popLayout">
              {classes && classesOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  ref={classDdown}
                  style={{ transition: "ease 0.5s" }}
                  className={`absolute bottom-[2.25rem] h-fit bg-white p-2 rounded-[var(--radius-s)] font-p-3  w-full mr-2`}
                >
                  <span className="h-full flex flex-col overflow-y-auto gap-1">
                    {classes.map((clas) => (
                      <span
                        key={clas.id}
                        onClick={() => {
                          setSelectedClass(clas);
                          setClassesOpen(false);
                        }}
                        className="p-2 bg-white grid items-center grid-cols-[auto_1fr] cursor-pointer border border-[var(--border)] rounded-[var(--radius-s)]"
                      >
                        <span
                          style={{ transition: "ease 0.5s" }}
                          className={`h-4 w-4 rounded-full mr-1 ${
                            selectedClass?.id == clas.id
                              ? "border-[5px] border-[var(--primary)]"
                              : "border-[1px] border-[var(--border)]"
                          }`}
                        ></span>
                        {clas.class_name}
                      </span>
                    ))}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Class repetitions
            </label>
            <div className="input-group">
              <input
                required
                value={class_repetitions}
                onChange={(e) => setClassrR(parseInt(e.target.value))}
                type="number"
                min={0}
                placeholder="date of birth"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Income Level
            </label>
            <div className="flex gap-4 mt-2">
              {incomes.map((level) => (
                <span
                  onClick={() => setIncome(level)}
                  className={`radio-btn-container  ${
                    household_income === level ? "selected-radio-btn" : ""
                  }`}
                  key={level}
                >
                  <span className="radio-btn">
                    <IconCircleCheckFilled color="var(--primary)" />
                  </span>
                  <span className="radio-btn-label capitalize">{level}</span>
                </span>
              ))}
            </div>
          </div>

          <div className=" flex-col gap-2 relative grid grid-rows-[auto_2.15rem]">
            <label htmlFor="" className="font-medium">
              Transport Method
            </label>
            <span
              onClick={() => setTransOpen(!transOpen)}
              className="w-full input-group relative z-[3] font-medium cursor-pointer h-[2.15rem] items-center px-2 grid grid-cols-[1fr_auto]"
            >
              <span className="capitalize">
                {selectedMethod
                  ? selectedMethod.label
                  : "Select an option"}
              </span>

              <span className="border-l border-l-[var(--border)] pl-1 ml-auto">
                <IconChevronDown
                  style={{ transition: "ease 0.5s" }}
                  className={`h-4 w-4 opacity-50 ${
                    transOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </span>
            <AnimatePresence mode="popLayout">
              {transOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  ref={transDiv}
                  style={{ transition: "ease 0.5s" }}
                  className={`absolute bottom-[2.25rem] h-fit bg-white p-2 rounded-[var(--radius-s)] font-p-3  w-full mr-2`}
                >
                  <span className="h-full flex flex-col overflow-y-auto gap-1">
                    {transport.map((tran, index) => (
                      <span
                        key={index}
                        onClick={() => {
                          setSelectedMethod(tran);
                          setTransOpen(false);
                        }}
                        className="p-2 bg-white grid items-center grid-cols-[auto_1fr] cursor-pointer border border-[var(--border)] capitalize rounded-[var(--radius-s)]"
                      >
                        <span
                          style={{ transition: "ease 0.5s" }}
                          className={`h-4 w-4 rounded-full  mr-1 ${
                            transport_method == tran.value
                              ? "border-[5px] border-[var(--primary)]"
                              : "border-[1px] border-[var(--border)]"
                          }`}
                        ></span>
                        {tran.label}
                      </span>
                    ))}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-medium">
              Special learning
            </label>
            <div className="flex gap-4 mt-2">
              <span
                onClick={() => setSpecialLearning(false)}
                className={`radio-btn-container  ${
                  !special_learning ? "selected-radio-btn" : ""
                }`}
              >
                <span className="radio-btn">
                  <IconCircleCheckFilled color="var(--primary)" />
                </span>
                <span className="radio-btn-label capitalize">No</span>
              </span>

              <span
                onClick={() => setSpecialLearning(true)}
                className={`radio-btn-container  ${
                  special_learning ? "selected-radio-btn" : ""
                }`}
              >
                <span className="radio-btn">
                  <IconCircleCheckFilled color="var(--primary)" />
                </span>
                <span className="radio-btn-label capitalize">Yes</span>
              </span>
            </div>
          </div>
        </div>
        <div className="cta-container w-full flex mt-2 gap-4">
          {isError && <span className="error">{responseMessage}</span>}
          <button onClick={close} className="cta-2 ml-auto" type="button">
            Cancel
          </button>
          <button className="cta">{isLoading ? <Loader /> : "Create"}</button>
        </div>
      </form>
    </>
  );
}

export default AddStudent;
