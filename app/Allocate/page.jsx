"use client";
import React, { useEffect} from "react";
import { Select} from "antd";
import useStore from "@/components/zustand";

const { Option } = Select;


const Allocate = () => {
  const option = useStore((state) => state.option);
  useEffect(() => {
    console.log(option)

  }, [option]);

  

  return (
    <>
    {option.length > 0 &&
      <div className="w-full flex justify-center">
        <div className="container px-4">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select users">
          {option.map((option, index) => (
            <Option key={index} value={option.email}>{option.username}</Option>
            ))}
            </Select>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select form"
            className="mt-4"
          />
        </div>
      </div>
}
    </>
  );
};

export default Allocate;
