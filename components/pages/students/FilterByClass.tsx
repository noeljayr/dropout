"use client";

import { getClassesWithStudents } from "@/api/classes";
import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

function FilterByClass({
  setFilterClass,
  filterClass,
}: {
  setFilterClass: (state: string) => void;
  filterClass: string;
}) {
  const [filters, setClasses] = useState<DATA[]>();
  const [open, setOpen] = useState(false);
  const dropdownDiv = useRef<HTMLDivElement | null>(null);

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
        dropdownDiv.current &&
        !dropdownDiv.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span
      ref={dropdownDiv}
      style={{ transition: "ease 0.5s" }}
      className={`relative h-[2.15rem] font-p-3  w-[8rem] mr-2`}
    >
      <span
        onClick={() => setOpen(!open)}
        className="w-full relative z-[3] font-medium cursor-pointer h-[2.15rem] items-center px-2 grid grid-cols-[1fr_auto]"
      >
        <span>{filterClass.length > 3 ? filterClass : "All classes"}</span>

        <span className="border-l border-l-[var(--border)] pl-1">
          <IconChevronDown
            style={{ transition: "ease 0.5s" }}
            className={`h-4 w-4 opacity-50 ${open ? "rotate-180" : "rotate-0"}`}
          />
        </span>
      </span>

      <span
        style={{ transition: "ease 0.5s" }}
        className={`bg-white/25 z-[2] absolute w-full grid gap-1 px-1 pb-1 overflow-hidden top-0 left-0 backdrop-blur-[2px] border border-[var(--border-2)] ${
          open
            ? "h-[10rem] rounded-[var(--radius-m)] pt-[2.25rem]"
            : "h-[2.15rem] rounded-[var(--radius-s)]"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {open && filters && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col overflow-y-auto gap-1"
            >
              {filters.map((clas, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setFilterClass(clas.class_name);
                    setOpen(false);
                  }}
                  className="p-2 bg-white grid items-center grid-cols-[auto_1fr] cursor-pointer border border-[var(--border)] rounded-[var(--radius-s)]"
                >
                  <span
                    style={{ transition: "ease 0.5s" }}
                    className={`h-4 w-4 rounded-full mr-1 ${
                      filterClass == clas.class_name
                        ? "border-[5px] border-[var(--primary)]"
                        : "border-[1px] border-[var(--border)]"
                    }`}
                  ></span>
                  {clas.class_name}
                </span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}

export default FilterByClass;
