import React, { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import DELETE_ICON from "../Assets/delete_icon.svg";
import EDIT_ICON from "../Assets/edit_icon.svg";
import { useNavigate } from "react-router-dom";
function Contact({ details, Delete }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className=" border-2 w-1/3  rounded-3xl flex gap-4 justify-between items-center p-4 box-border shadow-lg">
      {isOpen && (
        <ConfirmationModal
          Delete={() => Delete(details.id)}
          setIsOpen={setIsOpen}
        />
      )}
      <div className=" flex items-center gap-2">
        <img className=" h-16 w-16 rounded-full border-2" src="" alt="avatar" />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <h3 className=" text-lg font-semibold">{details?.name}</h3>
            <span className="border-2 p-1 box-border rounded-xl bg-yellow-200    text-xs">
              {details?.type}
            </span>
          </div>

          <h3 className=" text-sm">{details?.phone}</h3>
        </div>
      </div>
      <div className=" flex">
        <button onClick={() => navigate(`/edit-contact/${details.id}`)}>
          <img
            className=" rounded-full  hover:shadow-xl"
            clsa
            src={EDIT_ICON}
            alt="edit_icon"
          />
        </button>
        <button onClick={() => setIsOpen(true)}>
          {" "}
          <img
            className=" rounded-full  hover:shadow-xl"
            src={DELETE_ICON}
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
}

export default Contact;
