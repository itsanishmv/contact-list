import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import DELETE_ICON from "../Assets/delete_icon.svg";
function Contact({ details, Delete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" border-2 w-1/3  rounded-3xl flex gap-4 justify-between items-center p-4 box-border shadow-lg">
      {isOpen && (
        <Modal Delete={() => Delete(details.id)} setIsOpen={setIsOpen} />
      )}
      <div className=" flex items-center gap-2">
        <img className=" h-16 w-16 rounded-full border-2" src="" alt="avatar" />
        <div>
          <h3 className=" text-lg font-semibold">{details?.name}</h3>
          <h3 className=" text-sm">{details?.phone}</h3>
        </div>
      </div>

      <h3 className="border-2 p-2 rounded-xl bg-yellow-200 w-32">
        {details?.type}
      </h3>
      <button
        onClick={() => setIsOpen(true)}
        className=" rounded-full border-2 hover:shadow-xl"
      >
        {" "}
        <img src={DELETE_ICON} alt="delete" />
      </button>
    </div>
  );
}

export default Contact;
