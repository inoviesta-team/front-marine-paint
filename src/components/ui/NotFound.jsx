import React from "react";
import img from "@assets/no-data.png";

export default function NotFound({ message = "Data Tidak Ditemukan!" }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 px-2 py-6 bg-white shadow-md rounded-xl">
      <img src={"https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1746858469~exp=1746862069~hmac=d4b9b74e04a35413010efdca8d16826ad1e004e1777152d73f88de67cd5d48d8&w=740"} alt={message} className="w-40 object-contain" />

      <p className="text-marine-darkBlue font-medium text-md">{message}</p>
    </div>
  );
}

