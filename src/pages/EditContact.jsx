import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Storage } from "../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import SPINNER from "../Assets/spinner.svg";
function EditContact() {
  const [name, setName] = useState();

  const [phone, setPhone] = useState();
  const [type, setType] = useState();
  const [data, setData] = useState([]);
  const [profilePic, setProfilePic] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const arr = JSON.parse(localStorage.getItem("contacts"));
  useEffect(() => {
    const Fields = arr?.filter((contact) => {
      return contact.id === id;
    });

    setName(Fields[0]?.name);
    setPhone(Fields[0]?.phone);
    setType(Fields[0]?.type);
    setProfilePic(Fields[0]?.profilePic);
    const newArr = arr?.filter((contact) => {
      return contact.id !== id;
    });
    setData(newArr);
  }, [id, image]);

  function uploadNewPic(fields) {
    setLoading(true);
    const imageRef = ref(Storage, `/image${image.name + uuidv4()}`);
    uploadBytes(imageRef, image).then((res) => {
      getDownloadURL(imageRef, res.metadata.fullPath).then((url) => {
        const changes = {
          id: id,
          name: name ? name : fields[0].name,
          phone: phone ? phone : fields[0].phone,
          type: type ? type : fields[0].type,
          profilePic: url,
        };
        localStorage.setItem("contacts", JSON.stringify([...data, changes]));
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    });
  }
  function handleSaveChanges() {
    const fields = arr?.filter((contact) => {
      return contact.id === id;
    });
    if (image) {
      uploadNewPic(fields);
    } else {
      const changes = {
        id: id,
        name: name ? name : fields[0].name,
        phone: phone ? phone : fields[0].phone,
        type: type ? type : fields[0].type,
        profilePic: profilePic ? profilePic : fields[0].profilePic,
      };
      localStorage.setItem("contacts", JSON.stringify([...data, changes]));
      navigate("/");
    }
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
              src={image ? URL.createObjectURL(image) : profilePic}
              alt="preview"
            />
          </label>
        </div>
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
      </div>
    </div>
  );
}

export default EditContact;
