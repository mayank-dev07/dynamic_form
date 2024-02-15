"use client";
import Formcomponents from "@/components/Formcomponents";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center py-20">
        <p className="mb-5 text-xl font-serif font-bold">Dynamic Form</p>
        <>
          <Formcomponents />
        </>
      </div>
    </>
  );
}
