import React from "react";

function Contact({ details }) {
  return (
    <div className=" border-2 bg-red-200 rounded-xl">
      <h3>{details?.name}</h3>
      <h3>{details?.phone}</h3>
      <h3>{details?.type}</h3>
    </div>
  );
}

export default Contact;
