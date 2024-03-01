"use client";
// import useStore from "@/components/zustand";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Space, Table, Modal, Button, Form, Input, message } from "antd";
import { auth, db } from "@/app/firebase";
// import { useForm } from "antd/es/form/Form";
import PreviewForm from "@/components/PreviewForm";
import { useRouter } from "next/navigation";
import useStore from "@/components/zustand";

export default function Page({ params }) {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  console.log({ params }.params.item);
  const detail = useStore((state) => state.form);
  const setform = useStore((state) => state.setForm);
  const [form] = useState({ params }.params.item);
  const [data, setData] = useState([]);
  let id = useRef("");
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
            console.log(doc.data().uploadToFirebase[`${form}`], doc.id);
            if (doc.data().uploadToFirebase[`${form}`]) {
              setData(doc.data().uploadToFirebase[`${form}`]);
              id.current = doc.id;
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

  const openModal = () => {
    console.log(data);
    showModal();
  };
  // const fetch = async () => {
  //   const querySnapshot = await getDocs(collection(db, "dynamic_form"));
  //   onAuthStateChanged(auth, (user) => {
  //     console.log(user);
  //     console.log(querySnapshot);
  //     if (user) {
  //       querySnapshot.docs.map((doc) => {
  //         console.log(doc.data());
  //       });
  //     }
  //   });
  // };
  const deleteForm = async (view) => {
    messageApi.info("Form deleted successfully");
    console.log(detail);
    console.log(view);
    setform(detail.filter((item) => item != view));
    await deleteDoc(doc(db, "dynamic_form", id.current));
    setTimeout(() => {
      router.back();
    }, [1000]);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="View form"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}
        width={900}
      >
        <div className="w-full flex justify-center items-center mt-4">
          <PreviewForm props={data} />
        </div>
      </Modal>
      <div className=" py-12">
        <div className=" flex flex-col justify-center items-center">
          <div className="w-11/12 grid justify-items-end">
            <div className="flex gap-5">
              <Button onClick={openModal}>View</Button>
              <Button onClick={() => deleteForm({ params }.params.item)}>
                Delete
              </Button>
            </div>
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
