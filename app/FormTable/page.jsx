"use client";
import useStore from "@/components/zustand";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Space, Table, Tag } from "antd";
import { Timeline } from "antd";
import { comment } from "postcss";

const FormTable = () => {
  const [forms] = useState([]);
  const [data, setData] = useState([]);
  const [created, setCreated] = useState([]);
  const [ob, setOb] = useState([]);
  let ref = useRef(false);

  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Required",
      dataIndex: "required",
      key: "required",
    },
    {
      title: "Grid",
      dataIndex: "grid",
      key: "grid",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (tag) => {
        if (tag) {
          return `${tag}`;
        } else {
          return "NA";
        }
      },
    },
  ];

  const flatten = (array) => {
    let result = [];
    for (const item of array) {
      if (Array.isArray(item)) {
        result = result.concat(flatten(item));
      } else {
        result.push(item);
      }
    }
    return result;
  };

  // useLayoutEffect(() => {
  //   const fetch = async () => {
  //     const querySnapshot = await getDocs(collection(db, "dynamic_form"));
  //     onAuthStateChanged(auth, (user) => {
  //       console.log(user);
  //       if (user) {
  //         querySnapshot.docs.map((doc) => {
  //           console.log(doc.data().uploadToFirebase);
  //           let obj = doc.data().uploadToFirebase;
  //           forms.push(Object.keys(obj));

  //           const nestedArray = forms;
  //           const flatArray = flatten(nestedArray);
  //           console.log(flatArray);

  //           const arr = flatArray;
  //           const uniqueSet = new Set(arr);
  //           console.log(uniqueSet);
  //           setCreated(() => [...uniqueSet]);
  //         });
  //       }
  //     });
  //   };
  //   if (!ref.current) {
  //     fetch();
  //     ref.current = true;
  //   }
  // }, []);

  return (
    <>
      <div className="w-screen py-12">
        <div className="w-full flex justify-center items-center">
          <>
            <div className=" md:min-w-[600px] p-12">
              <Timeline>
                {created.map((item, index) => (
                  <Timeline.Item
                    key={index}
                    className="cursor-pointer w-max !text-lg">
                    {item}
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </>
          {/* <Table
            bordered
            scroll={{ x: "80vw" }}
            columns={columns}
            dataSource={data}
            className="w-11/12"
          /> */}
        </div>
      </div>
    </>
  );
};

export default FormTable;
