"use client";
// import Formcomponents from "@/components/Formcomponents";
import Login from "@/components/Login";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center py-20">
        <>
          {/* <div className="w-full flex justify-center -items-center"> */}
          <Login />
          {/* </div> */}
          {/* <Formcomponents /> */}
        </>
      </div>
    </>
  );
}
