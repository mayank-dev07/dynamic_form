import React, { useEffect, useLayoutEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

import { Form, Button, message, Modal, Input } from "antd";
import InputType from "./InputType";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import useStore from "./zustand";
import { usePathname } from "next/navigation";

const PreviewForm = (props) => {
  const [forms] = useState([]);
  const pathname = usePathname();
  console.log(props);
  const setData = useStore((state) => state.setData);
  const setform = useStore((state) => state.setForm);
  const details = useStore((state) => state.data);
  const details1 = useStore((state) => state.form);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const stringToBool = (value) => {
    switch (value) {
      case "false":
        return false;
      default:
        return true;
    }
  };

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

  const handleClick = async () => {
    console.log(details);
    showModal();
  };

  const remove = (id) => {
    console.log(id);
    setData(details.filter((item, index) => index != id));
  };

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const setName = (values) => {
    console.log(details);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        console.log(details1);
        messageApi.info("Form is added to firestore");
        console.log(user.uid);
        console.log(details);
        const uploadToFirebase = { id: user.uid, [values.name]: details };
        console.log(uploadToFirebase);
        addDoc(
          collection(db, "dynamic_form"),
          JSON.parse(JSON.stringify({ uploadToFirebase }))
        );
        const fetch = async () => {
          const querySnapshot = await getDocs(collection(db, "dynamic_form"));
          onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
              querySnapshot.docs.map((doc) => {
                if (doc.data().uploadToFirebase.id === user.uid) {
                  forms.push(Object.keys(obj));
                  console.log(forms);

                  const nestedArray = forms;
                  const flatArray = flatten(nestedArray);

                  const arr = flatArray;
                  const uniqueSet = new Set(arr);
                  setform([...uniqueSet]);
                } else {
                  setform([]);
                }
              });
            }
          });
        };
        setTimeout(() => {
          setData([]);
          fetch();
        }, 1000);
      }
    });
  };

  return (
    <>
      {contextHolder}

      <Modal
        title="Add name of the form"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form form={form1} onFinish={setName}>
          <Form.Item
            name="name"
            label="Form Name"
            rules={[
              {
                whitespace: true,
                required: true,
                message: "enter the form name",
              },
            ]}
          >
            <Input placeholder="enter form name" />
          </Form.Item>
          <div className="w-full flex justify-center">
            <Button htmlType="submit" className="bg-black text-white">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      {props.props.length > 0 && (
        <Form
          className="px-4  w-full flex flex-wrap justify-between"
          form={form}
          onFinish={handleClick}
        >
          {props.props.map((items, index) => (
            <>
              <Form.Item
                key={index}
                name={items.label}
                label={items.label}
                rules={[
                  {
                    whitespace: true,
                    required: stringToBool(items.required),
                    message: items.message,
                  },
                ]}
                className={`${items.grid} items-start px-4`}
              >
                <div className="flex">
                  <InputType props={items} />
                  {(pathname == "/GenerateForm" ||
                    pathname == "/GenerateForm/") && (
                    <Button
                      type="none"
                      onClick={() => remove(index)}
                      icon={<CloseOutlined />}
                    ></Button>
                  )}
                </div>
              </Form.Item>
            </>
          ))}
          <div className="w-full flex justify-center">
            {(pathname == "/GenerateForm" || pathname == "/GenerateForm/") && (
              <Button className="bg-black text-white w-min" htmlType="submit">
                Add Name
              </Button>
            )}
          </div>
        </Form>
      )}
    </>
  );
};

export default PreviewForm;
