"use client";

import { RootState } from "@app/redux/types";
import "./Header.scss";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Test } from "@app/scripts/types";

export default function Header() {
  const pathname: string = usePathname();
  const routerParams: any = useParams();

  enum PathType {
    dashboard = "Dashboard",
    finalize = "Finalize",
    results = "Results",
    null = "",
  }

  const currentPath: PathType =
    pathname.substring(1, 10) === "dashboard"
      ? PathType.dashboard
      : pathname.substring(1, 9) === "finalize"
      ? PathType.finalize
      : pathname.substring(1, 8) === "results"
      ? PathType.results
      : PathType.null;

  const { tests, status, error } = useSelector(
    (state: RootState) => state.data
  );
  const currentItem: Test | undefined = tests.find(
    (e: Test) => e.id == routerParams.testid
  );

  return (
    <div className="header-container">
      <h1 className="header-title">{currentPath}</h1>
      <p className="header-description">{currentItem?.name}</p>
    </div>
  );
}
