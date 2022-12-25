import React, { useState, useEffect } from "react";
import NoContacts from "../components/NoContacts";
import Contact from "../components/Contact";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setList(JSON.parse(localStorage.getItem("contacts")));

      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, []);

  const handleDelete = (id) => {
    const List = list.filter((el) => {
      return el.id !== id;
    });
    setList(List);
    localStorage.setItem("contacts", JSON.stringify(List));
  };
  return (
    <div className=" flex pt-16 items-center flex-col w-full border-2 h-[100vh]">
      <h1 className=" font-bold text-5xl">Contact List</h1>
      {isEmpty && <NoContacts message="Sorry , there is no Contact saved" />}
      {list?.map((el) => (
        <Contact key={el.id} details={el} Delete={handleDelete} />
      ))}
      <button
        onClick={() => navigate("/add-contact")}
        type="button"
        class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
      >
        + Add Contact
      </button>
    </div>
  );
}

export default Home;
