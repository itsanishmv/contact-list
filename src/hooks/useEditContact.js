import React from "react";
import { useState, useEffect } from "react";
import { Storage } from "../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
function useEditContact(id) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [type, setType] = useState();
  const [data, setData] = useState([]);
  const [profilePic, setProfilePic] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();
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
  return {
    name,
    phone,
    type,
    data,
    profilePic,
    image,
    loading,
    setName,
    setPhone,
    setType,
    setImage,
    handleSaveChanges,
  };
}

export default useEditContact;
