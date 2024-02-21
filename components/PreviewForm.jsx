import React, { useEffect, useLayoutEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

import { Form, Button, message } from "antd";
import InputType from "./InputType";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import useStore from "./zustand";

const PreviewForm = () => {
  const setData = useStore((state) => state.setData);
  const details = useStore((state) => state.data);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const stringToBool = (value) => {
    switch (value) {
      case "false":
        return false;
      default:
        return true;
    }
  };

  const handleClick = async () => {
    console.log(details);
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        messageApi.info("Form is added to firestore");
        console.log(user.uid);
        console.log(details);
        const uploadToFirebase = { id: user.uid, form: details };
        console.log(uploadToFirebase);
        addDoc(
          collection(db, "dynamic_form"),
          JSON.parse(JSON.stringify({ uploadToFirebase }))
        );
        setTimeout(() => {
          setData([]);
        }, 1000);
      }
    });
    console.log(auth);
    if (auth) {
    }
  };

  const remove = (id) => {
    console.log(id);
    setData(details.filter((item, index) => index != id));
  };

  return (
    <>
      {contextHolder}
      {details.length > 0 && (
        <Form
          className="px-4 md:px-2 md:w-10/12 lg:w-8/12 w-full flex flex-wrap justify-between"
          form={form}
          onFinish={handleClick}>
          {details.map((items, index) => (
            <>
              <Form.Item
                key={index}
                name={items.label}
                label={items.label}
                rules={[
                  {
                    required: stringToBool(items.required),
                    message: items.message,
                  },
                ]}
                className={`${items.grid} items-start px-4`}>
                <div className="flex">
                  <InputType props={items} />
                  <Button
                    type="none"
                    // className="w-1/12"
                    onClick={() => remove(index)}
                    icon={<CloseOutlined />}></Button>
                </div>
              </Form.Item>
            </>
          ))}
          <div className="w-full flex justify-center">
            <Button
              className="bg-black text-white w-min"
              htmlType="submit"
              // onClick={() => {
              //   handleClick(details);
              //   messageApi.info("Form is added to firestore");
              // }}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default PreviewForm;
