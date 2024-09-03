import React from "react";

export default function Button({text,size,click}) {
  return (
    <button onClick={click} className={`border-2 text-[#898e92] font-bold text-${size} px-5 py-3 rounded-[100px] transition duration-300 ease-in-out hover:bg-primary-gradient  hover:text-white`}>
      {text}
    </button>
  );
}
