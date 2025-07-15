"use client";


import AddStudent from "@/components/modals/add-student/AddStudent";
import NewAssessment from "@/components/modals/NewAssessment";
import AtRisk from "@/components/pages/students/AtRisk";
import FilterByClass from "@/components/pages/students/FilterByClass";
import StudentsTable from "@/components/pages/students/StudentsTable";
import { IconCloudUpload, IconPlus } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [searchName, setSearchName] = useState("");
  const [filterRisk, setFilterRisk] = useState("");
  const [filterClass, setFilterClass] = useState("");

  const addStudent = (state: string) => {
    const params = new URLSearchParams(useSearchParams.toString());
    params.set("add-student", state);
    history.pushState(null, "", `?add-student=${state}`);
  };

  return (
    <>
      <div className="grid w-full pr-4 grid-rows-[auto_1fr] gap-4 overflow-hidden">
        <div className="grid grid-cols-[auto_auto_auto_auto_1fr] w-full">
          <button onClick={() => addStudent("true")} className="cta">
            <IconPlus /> Add student
          </button>
          <button className="cta-2 ml-2">
            <IconCloudUpload /> Import from csv
          </button>

          <AtRisk setFilterRisk={setFilterRisk} filterRisk={filterRisk} />

          <FilterByClass
            setFilterClass={setFilterClass}
            filterClass={filterClass}
          />

          <div className="input-group ">
            <input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              type="text"
              placeholder="search for a student..."
            />
          </div>
        </div>
        <StudentsTable
          filterClass={filterClass}
          filterRisk={filterRisk}
          searchName={searchName}
        />
      </div>

      <AddStudent />
      <NewAssessment />
    </>
  );
}

export default page;
