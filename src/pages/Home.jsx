import React, { useState, useEffect } from "react";
import NoContacts from "../components/NoContacts";
import Contact from "../components/Contact";
function Home() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [list, setList] = useState();
  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setList(JSON.parse(localStorage.getItem("contacts")));
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [list?.length]);
  return (
    <div className=" flex pt-16 items-center flex-col w-full border-2 h-[100vh]">
      <h1 className=" font-bold text-5xl">Contact List</h1>
      {isEmpty && <NoContacts message="Sorry , there is no Contact saved" />}
      {list?.map((el) => (
        <Contact details={el} />
      ))}
    </div>
  );
}

export default Home;
