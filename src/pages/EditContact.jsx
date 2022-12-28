import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SPINNER from "../Assets/spinner.svg";
import useEditContact from "../hooks/useEditContact";
function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    name,
    phone,
    type,
    profilePic,
    image,
    loading,
    setName,
    setPhone,
    setType,
    setImage,
    handleSaveChanges,
  } = useEditContact(id);

  return (
    <div className=" border-2 flex justify-center h-[100vh]">
      <div className="flex flex-col items-center w-2/3  pt-16 gap-4 ">
        <h2 className=" font-bold text-4xl">Edit contact </h2>
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
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              accept="image/*"
              id="dropzone-file"
              type="file"
              class="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              className=" h-20 w-20 object-cover"
              src={image ? URL.createObjectURL(image) : profilePic}
              alt="preview"
            />
          </label>
        </div>
        <div className="flex">
          <button
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            onClick={() => handleSaveChanges()}
          >
            {loading ? (
              <img className="h-5 w-5" src={SPINNER} alt="loadnig.." />
            ) : (
              " save changes"
            )}
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditContact;
