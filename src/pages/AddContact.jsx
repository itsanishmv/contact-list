import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SPINNER from "../Assets/spinner.svg";
function AddContact() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [type, setType] = useState("Personal");
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [image, setImage] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
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
    setLoading(true);
    const imageRef = ref(Storage, `/image${image.name + uuidv4()}`);
    uploadBytes(imageRef, image).then((res) => {
      getDownloadURL(imageRef, res.metadata.fullPath).then((url) => {
        setData([
          ...data,
          { id: uuidv4(), name, phone, type, isWhatsapp, profilePic: url },
        ]);
        console.log("uploaded");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    });

    localStorage.setItem("contacts", JSON.stringify(data));
  };

  const isEmpty = !name || !phone || !type || !image;
  return (
    <div className=" flex pt-16 items-center flex-col w-full  h-[100vh]">
      <h1 className=" font-bold text-5xl">Add Contact</h1>
      <div className="flex flex-col mt-10 justify-center  rounded-sm gap-2 w-1/2">
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
              className=" h-20 w-20"
              src={image && URL?.createObjectURL(image)}
              alt="preview"
            />
          </label>
        </div>
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
        {loading ? (
          <img className="  h-5 w-5 " src={SPINNER} alt="spinner" />
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
}

export default AddContact;
