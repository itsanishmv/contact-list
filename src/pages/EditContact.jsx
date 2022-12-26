import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function EditContact() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [type, setType] = useState();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const arr = JSON.parse(localStorage.getItem("contacts"));
  useEffect(() => {
    const newArr = arr?.filter((contact) => {
      return contact.id !== id;
    });
    setData(newArr);
  }, []);

  function handleSaveChanges() {
    const existingFields = arr?.filter((contact) => {
      return contact.id === id;
    });

    const changes = {
      id: id,
      name: name ? name : existingFields[0].name,
      phone: phone ? phone : existingFields[0].phone,
      type: type ? type : existingFields[0].type,
    };
    localStorage.setItem("contacts", JSON.stringify([...data, changes]));
    navigate("/");
  }
  return (
    <div className=" border-2 flex justify-center h-[100vh]">
      <div className="flex flex-col items-center w-1/2  pt-16 gap-4 ">
        <h2 className=" font-bold text-5xl">Edit contact </h2>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          className="inputBox p-4"
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          name="name"
          className="inputBox p-4"
          type="number"
          placeholder="phone"
        />
        <input
          onChange={(e) => setType(e.target.value)}
          value={type}
          name="name"
          className="inputBox p-4"
          type="text"
          placeholder="type"
        />
        <button
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          onClick={() => handleSaveChanges()}
        >
          save changes
        </button>
      </div>
    </div>
  );
}

export default EditContact;
