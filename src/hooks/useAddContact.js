import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
function useAddContact() {
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
  return {
    name,
    phone,
    type,
    image,
    isWhatsapp,
    loading,
    handleSave,
    setName,
    setData,
    setPhone,
    setImage,
    setIsWhatsapp,
    setLoading,
    setType,
  };
}

export default useAddContact;
