import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "contact-list-7a791.firebaseapp.com",
  projectId: "contact-list-7a791",
  storageBucket: "contact-list-7a791.appspot.com",
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const config = initializeApp(firebaseConfig);
export const Storage = getStorage(config);
