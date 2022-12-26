import React from "react";

function ConfirmationModal({ Delete, setIsOpen }) {
  return (
    <div className="fixed bottom-0  right-0 h-1/3 z-30 md:translate-x-1/2 md:translate-y-1/2  rounded-lg gap-4 shadow-full bg-slate-100  md:bottom-1/2 md:right-1/2  rouned md:w-1/3 md:h-1/3 flex flex-col justify-center items-center">
      <div className=" text-2xl">Are you sure ?</div>
      <p className=" text-xs text-slate-500 px-10 text-center">
        Do you really want to delete these records? This process cannot be
        undone.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => Delete()}
          className="border-2 p-4 bg-red-500 text-white rounded-xl font-semibold"
        >
          Delete
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="border-2 p-4 text-slate-500 font-semibold rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
