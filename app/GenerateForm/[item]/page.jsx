"use client";
import useStore from "@/components/zustand";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Space, Table, Modal, Button,Form ,Input} from "antd";
import { auth, db } from "@/app/firebase";
import { useForm } from "antd/es/form/Form";
import PreviewForm from "@/components/PreviewForm";

export default function Page({ params }) {
  console.log({ params }.params);
  const[form1] =Form.useForm()
  const [form] = useState({ params }.params.item);
  const [data, setData] = useState([]);
  let ref = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
  
  const openModal =()=>{
    console.log(data)
showModal()
  }

  return (
    <>
          <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}>
        {/* <Form form={form1} >
          <Form.Item
            name="name"
            label="Form Name"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "enter the form name",
              },
            ]}>
            <Input placeholder="enter form name" />
          </Form.Item>
          <div className="w-full flex justify-center">
            <Button htmlType="submit" className="bg-black text-white">
              Submit
            </Button>
          </div>

        </Form> */}
        <div className="w-full flex justify-center items-center mt-4">
       <PreviewForm props={data} />
        </div>
      </Modal>
      <div className=" py-12">
        <div className=" flex flex-col justify-center items-center">
          <div className="w-11/12 grid justify-items-end"> 


       <Button onClick={openModal}>View</Button>
          </div>
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
