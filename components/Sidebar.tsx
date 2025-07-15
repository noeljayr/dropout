"use client";

import { getStats } from "@/api/stats";
import { useTokenStore } from "@/stores/useTokenStore";
import {
  IconSchool,
  IconSmartHome,
  IconTimeline,
  IconUsersGroup,
  IconBook,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

type DATA = {
  total_students: number;
  at_risk_students: number;
  total_classes: number;
  average_attendance: number;
};

function Sidebar() {
  const { username, name } = useTokenStore();
  const pathname = usePathname();
  const router = useRouter();

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

  if (!pathname.startsWith("/dashboard")) {
    return <></>;
  }

  const logout = () => {
    useTokenStore.getState().logout();
    router.push("/auth");
  };

  return (
    <>
      <div className="flex flex-col gap-2 bg-white p-4 h-screen border-r border-r-[var(--border-2)]">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <span className="h-8 w-8 bg-[var(--black)] text-white flex items-center justify-center rounded-full leading-0 font-bold">
            {name[0]}
          </span>
          <div className="flex flex-col gap-0.5 truncate">
            <span className="font-p-3 font-semibold truncate">{name}</span>
            <span className="font-p-3 opacity-60 truncate">@{username}</span>
          </div>
        </div>

        <div className="flex flex-col pt-2 gap-2">
          <Link
            href="/dashboard"
            className={`grid grid-cols-[auto_1fr] p-2 ${
              pathname == "/dashboard" ? "bg-[var(--input-bg)]" : ""
            } rounded-[var(--radius-s)] gap-4 items-center`}
          >
            <IconSmartHome
              color={`${
                pathname === "/dashboard" || pathname === "/dashboard/"
                  ? "var(--primary)"
                  : "var(--black)"
              }`}
              strokeWidth={1.5}
              className={`${
                pathname === "/dashboard" || pathname === "/dashboard/"
                  ? "opacity-100"
                  : "opacity-50"
              } h-4 w-4`}
            />
            <span className={`font-medium`}>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/students"
            className={`grid relative grid-cols-[auto_1fr] p-2 ${
              pathname.startsWith("/dashboard/students")
                ? "bg-[var(--input-bg)]"
                : ""
            } rounded-[var(--radius-s)] gap-4 items-center`}
          >
            <IconSchool
              color={`${
                pathname.startsWith("/dashboard/students")
                  ? "var(--primary)"
                  : "var(--black)"
              }`}
              strokeWidth={1.5}
              className={`${
                pathname.startsWith("/dashboard/student")
                  ? "opacity-100"
                  : "opacity-50"
              } h-4 w-4`}
            />
            <span className={`font-medium flex`}>
              Students
              {data && data.at_risk_students > 0 && (
                <span className="ml-2 font-p-3 rounded-full bg-red-600 h-4 w-4 flex items-center justify-center text-white font-bold">
                  {data?.at_risk_students}
                </span>
              )}
            </span>
          </Link>

          <Link
            href="/dashboard/classes"
            className={`grid grid-cols-[auto_1fr] p-2 ${
              pathname.startsWith("/dashboard/classes")
                ? "bg-[var(--input-bg)]"
                : ""
            } rounded-[var(--radius-s)] gap-4 items-center`}
          >
            <IconUsersGroup
              color={`${
                pathname.startsWith("/dashboard/classes")
                  ? "var(--primary)"
                  : "var(--black)"
              }`}
              strokeWidth={1.5}
              className={`${
                pathname.startsWith("/dashboard/classes")
                  ? "opacity-100"
                  : "opacity-50"
              } h-4 w-4`}
            />
            <span className={`font-medium`}>Classes</span>
          </Link>

          <Link
            href="/dashboard/subjects"
            className={`grid grid-cols-[auto_1fr] p-2 ${
              pathname.startsWith("/dashboard/subjects")
                ? "bg-[var(--input-bg)]"
                : ""
            } rounded-[var(--radius-s)] gap-4 items-center`}
          >
            <IconBook
              color={`${
                pathname.startsWith("/dashboard/subjects")
                  ? "var(--primary)"
                  : "var(--black)"
              }`}
              strokeWidth={1.5}
              className={`${
                pathname.startsWith("/dashboard/subjects")
                  ? "opacity-100"
                  : "opacity-50"
              } h-4 w-4`}
            />
            <span className={`font-medium`}>Subjects</span>
          </Link>

          <Link
            href="/dashboard/reports"
            className={`grid grid-cols-[auto_1fr] p-2 ${
              pathname.startsWith("/dashboard/reports")
                ? "bg-[var(--input-bg)]"
                : ""
            } rounded-[var(--radius-s)] gap-4 items-center`}
          >
            <IconTimeline
              color={`${
                pathname.startsWith("/dashboard/reports")
                  ? "var(--primary)"
                  : "var(--black)"
              }`}
              strokeWidth={1.5}
              className={`${
                pathname.startsWith("/dashboard/reports")
                  ? "opacity-100"
                  : "opacity-50"
              } h-4 w-4`}
            />
            <span className={`font-medium`}>Grades</span>
          </Link>
        </div>
        <button
          onClick={logout}
          style={{ width: "100%" }}
          className="mt-auto cta-2"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Sidebar;
