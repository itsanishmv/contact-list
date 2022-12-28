import React, { useState, useEffect } from "react";
import NoContacts from "../components/NoContacts";

import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
const Contact = lazy(() => import("../components/Contact"));
function Home() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const getLocalStorageData = JSON.parse(localStorage.getItem("contacts"));
  useEffect(() => {
    console.log("render");
    const getLocalStorageData = JSON.parse(localStorage.getItem("contacts"));
    if (getLocalStorageData?.length !== 0) {
      setList(
        getLocalStorageData?.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );

      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [getLocalStorageData?.length]);

  const handleDelete = (id) => {
    const List = list.filter((el) => {
      return el.id !== id;
    });
    setList(List);
    localStorage.setItem("contacts", JSON.stringify(List));
  };

  return (
    <div className=" flex pt-16 gap-4 items-center flex-col  h-[100vh]">
      <h1 className=" font-bold text-5xl">Contact List</h1>
      {isEmpty && <NoContacts message="Sorry , there is no Contact saved" />}
      <div className="w-full flex h-1/2 overflow-y-scroll flex-col items-center">
        {list?.map((el) => (
          <Suspense fallback={<div>Skeleton...</div>}>
            <Contact key={el.id} details={el} Delete={handleDelete} />
          </Suspense>
        ))}
      </div>

      {getLocalStorageData?.length !== 0 && (
        <button
          onClick={() => navigate("/add-contact")}
          type="button"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          + Add Contact
        </button>
      )}
    </div>
  );
}

export default Home;
