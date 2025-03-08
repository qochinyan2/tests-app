"use client";

import { Test } from "@app/scripts/types";
import { clearDomain } from "@app/scripts/scripts";
import TestButton from "@app/components/TestButton/TestButton";
import { fetchSites, fetchTests } from "@app/redux/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/redux/types";
import { useEffect, useRef, useState } from "react";
import "./dashboard.scss";

//////////////////
type sortType = {
  by: string;
  to: string;
};

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sites, tests, status, error } = useSelector(
    (state: RootState) => state.data
  );
  const newSites = clearDomain(sites);

  const [foundTests, setFoundTests] = useState<number>(tests.length);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [currentSorting, SetCurrentSorting] = useState<sortType>({
    by: "",
    to: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const filterTests = () => {
    const newTests = [...tests].filter((el) =>
      el.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTests(newTests);
    setFoundTests(newTests.length);
  };
  const focusInput: (bool: boolean) => void = (bool: boolean) => {
    setInputFocused(bool);
  };
  const keyboardClick = (event: KeyboardEvent) => {
    const inputElement = inputRef.current;
    if (inputElement) {
      if (!inputFocused) {
        if (event.key == "/") {
          inputElement?.focus();
          setInputFocused(true);
        }
      }
      if (event.key == "Enter") {
        filterTests();
      }
    }
  };
  const changeInputText = (e: any) => {
    const val = e.target.value;

    if (val.substr(val.length - 1, 1) != "/" && inputFocused) {
      setSearchText(e.target.value);
    }
  };
  useEffect(() => {
    dispatch(fetchSites());
    dispatch(fetchTests());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTests(tests);
    setFoundTests(tests.length);
  }, [tests]);

  useEffect(() => {
    document.addEventListener("keydown", keyboardClick);
    return () => {
      window.removeEventListener("keydown", keyboardClick);
    };
  }, [searchText]);

  const sortAlphaTests = (data: Omit<sortType, "to">) => {
    // name sorting
    let newTests: Test[] = [];

    if (currentSorting.by == data.by && currentSorting.to == "up") {
      if (data.by == "siteId") {
        let correctedSite: any = [...filteredTests].map((e) => {
          let sitename = newSites.find((el) => e.siteId == el.id)?.url;
          let newObj = { ...e, sitename };
          return newObj;
        });

        newTests = [...correctedSite].sort((a, b) =>
          b.sitename.toLowerCase().localeCompare(a.sitename.toLowerCase())
        );
      } else {
        newTests = [...filteredTests].sort((a, b) =>
          b[`${data.by}`]
            .toLowerCase()
            .localeCompare(a[`${data.by}`].toLowerCase())
        );
      }
      SetCurrentSorting({ by: data.by, to: "down" });
    } else {
      if (data.by == "siteId") {
        let correctedSite: any = [...filteredTests].map((e) => {
          let sitename = newSites.find((el) => e.siteId == el.id)?.url;
          let newObj = { ...e, sitename };
          return newObj;
        });

        newTests = [...correctedSite].sort((a, b) =>
          a.sitename.toLowerCase().localeCompare(b.sitename.toLowerCase())
        );
      } else {
        newTests = [...filteredTests].sort((a, b) =>
          a[`${data.by}`]
            .toLowerCase()
            .localeCompare(b[`${data.by}`].toLowerCase())
        );
      }
      SetCurrentSorting({ by: data.by, to: "up" });
    }

    setFilteredTests(newTests);
    setFoundTests(newTests.length);
  };

  const sortStatusTests = () => {
    const newStatusIndexesTests = [...filteredTests].map((e) => {
      let status = e.status.toLocaleLowerCase();
      let statusId =
        status === "online"
          ? 1
          : status === "paused"
          ? 2
          : status === "stopped"
          ? 3
          : 4;
      const newObj = { ...e, statusId };
      return newObj;
    });
    if (currentSorting.by === "status" && currentSorting.to === "up") {
      newStatusIndexesTests.sort((a, b) => b.statusId - a.statusId);
      SetCurrentSorting({ by: "status", to: "down" });
    } else {
      newStatusIndexesTests.sort((a, b) => a.statusId - b.statusId);
      SetCurrentSorting({ by: "status", to: "up" });
    }

    setFilteredTests(newStatusIndexesTests);
    setFoundTests(newStatusIndexesTests.length);
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  if (filteredTests.length < 1) {
    return (
      <div className="dashboard-container issue">
        <div className="search-area">
          <i
            onClick={filterTests}
            className="fa-solid fa-magnifying-glass fa-sm"
            style={{ color: "#222222" }}
          ></i>
          <input
            onFocus={() => {
              focusInput(true);
            }}
            onBlur={() => {
              focusInput(false);
            }}
            onChange={(e) => {
              changeInputText(e);
            }}
            type="text"
            value={searchText}
            placeholder="What test are you looking for?"
            ref={inputRef}
          />
          <p>{foundTests} tests</p>
        </div>
        <div className="issue-container">
          <h1 className="heading">Your search did not match any results.</h1>
          <div
            className="link-container"
            onClick={() => {
              setFilteredTests(tests);
              setSearchText("");
              setFoundTests(tests.length);
            }}
          >
            <button className="button">Reset</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="search-area">
        <i
          onClick={filterTests}
          className="fa-solid fa-magnifying-glass fa-sm"
          style={{ color: "#222222" }}
        ></i>
        <input
          onFocus={() => {
            focusInput(true);
          }}
          onBlur={() => {
            focusInput(false);
          }}
          onChange={(e) => {
            changeInputText(e);
          }}
          type="text"
          value={searchText}
          placeholder="What test are you looking for?"
          ref={inputRef}
        />
        <p>{foundTests} tests</p>
      </div>

      <div className="flex-container">
        <div className="head-row row">
          <p
            onClick={() => {
              sortAlphaTests({ by: "name" });
            }}
            className="table-name-head"
          >
            Name
          </p>
          <p
            className="table-type-head"
            onClick={() => {
              sortAlphaTests({ by: "type" });
            }}
          >
            type
          </p>
          <p
            className="table-status-head"
            onClick={() => {
              sortStatusTests();
            }}
          >
            Status
          </p>
          <p
            className="table-site-head"
            onClick={() => {
              sortAlphaTests({ by: "siteId" });
            }}
          >
            Site
          </p>
        </div>

        {filteredTests.map((e) => {
          return (
            <div key={e.id} className={`body-row row site-${e.siteId}`}>
              <div className="table-name-item">{e.name}</div>
              <div className="table-type-item">{e.type}</div>
              <div className={`table-status-item ${e.status.toLowerCase()}`}>
                {e.status.toLowerCase()}
              </div>
              <div className="table-site-item">
                {newSites.find((_e) => _e.id == e.siteId)?.url}
              </div>
              <div>
                <TestButton
                  id={e.id}
                  type={
                    e.status.toUpperCase() === "DRAFT" ? "finalize" : "results"
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
