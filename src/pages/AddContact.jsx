import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function AddContact() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [type, setType] = useState("Personal");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("contacts") !== null) {
      setData(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);
  useEffect(() => {
    if (data.length !== 0) {
      localStorage.setItem("contacts", JSON.stringify(data));
    }
  }, [data]);
  const handleSave = () => {
    setData([
      ...data,
      { id: uuidv4(), name, phone, type, isWhatsapp, profilePic },
    ]);

    localStorage.setItem("contacts", JSON.stringify(data));
  };

  const isEmpty = !name || !phone || !type;
  return (
    <div className=" flex pt-16 items-center flex-col w-full  h-[100vh]">
      <h1 className=" font-bold text-5xl">Add Contact</h1>
      <div className="flex flex-col mt-10 justify-center  rounded-sm shadow-lg gap-2 w-1/2">
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
          name="phone"
          className="inputBox p-4"
          type="number"
          placeholder="phone"
        />
        <div class="relative">
          <select
            onChange={(e) => setType(e.target.value)}
            value={type}
            name="type"
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            {/* <option disabled={true}>Choose one </option> */}
            <option>Personal</option>
            <option>Office</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <input
          onChange={(e) => setProfilePic(e.target.value)}
          value={profilePic}
          name="profile pic"
          className="inputBox p-4"
          type="text"
          placeholder="image url"
        />
        <div className="flex items-center justify-center">
          <span>Whatsapp</span>
          <input
            onChange={(e) => setIsWhatsapp(!isWhatsapp)}
            value={isWhatsapp}
            name="isWhatsapp"
            type="checkbox"
          />
        </div>
      </div>

      <button
        disabled={isEmpty}
        onClick={() => handleSave()}
        type="button"
        className={`mt-4 ${
          isEmpty && " bg-slate-300"
        } text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 ${
          !isEmpty &&
          "dark:hover:text-white  dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        }`}
      >
        Save
      </button>
      <button
        onClick={() => navigate("/")}
        type="button"
        className="mt-4 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
      >
        View list
      </button>
    </div>
  );
}

export default AddContact;
