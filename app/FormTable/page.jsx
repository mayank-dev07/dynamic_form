"use client";
import useStore from "@/components/zustand";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Space, Table, Tag } from "antd";

const FormTable = () => {
  const [forms] = useState([]);
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
    {
      title: "values",
      key: "values",
      dataIndex: "values",
      render: (tags) => {
        console.log(tags);
        // return (
        //   <>
        //     {tags.map((tag) => {
        //       // let color = tag.length > 5 ? "geekblue" : "green";
        //       // if (tag === "loser") {
        //       //   color = "volcano";
        //       // }
        //       // return (
        //       //   <Tag color={color} key={tag}>
        //       //     {tag.toUpperCase()}
        //       //   </Tag>
        //       // );
        //       console.log(tag);
        //     })}
        //   </>
        // );
      },
    },
  ];

  useLayoutEffect(() => {
    const fetch = async () => {
      const querySnapshot = await getDocs(collection(db, "dynamic_form"));
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          querySnapshot.docs.map((doc, index) => {
            console.log(doc.data().uploadToFirebase);
            if (doc.data().uploadToFirebase.id == user.uid) {
              forms.push(doc.data().uploadToFirebase.form[0]);
            }
          });
          setData(forms);
          console.log(forms);
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
};

export default FormTable;
