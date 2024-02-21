"use client";
import useStore from "@/components/zustand";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Space, Table, Tag } from "antd";
import { auth, db } from "@/app/firebase";

export default function Page({ params }) {
  console.log({ params }.params.item);
  const [form] = useState({ params }.params.item);
  const [data, setData] = useState([]);
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

  useLayoutEffect(() => {
    const fetch = async () => {
      const querySnapshot = await getDocs(collection(db, "dynamic_form"));
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          querySnapshot.docs.map((doc) => {
            console.log(doc.data().uploadToFirebase[`${form}`]);
            if (doc.data().uploadToFirebase[`${form}`]) {
              setData(doc.data().uploadToFirebase[`${form}`]);
            }
          });
        }
      });
    };
    if (!ref.current) {
      fetch();
      ref.current = true;
    }
  }, []);

  return (
    <>
      <div className="w-screen py-12">
        <div className="w-full flex justify-center items-center">
          <Table
            bordered
            scroll={{ x: "80vw" }}
            columns={columns}
            dataSource={data}
            className="w-11/12"
          />
        </div>
      </div>
    </>
  );
}
