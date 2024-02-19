"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Form, Button } from "antd";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import InputType from "@/components/InputType";
import useStore from "@/components/zustand";

const GenerateForm = () => {
  const [form] = Form.useForm();
  const [element, setElement] = useState([]);
  const { data } = useStore((state) => state.data);

  useLayoutEffect(() => {
    const getForm = async () => {
      // const q = query(dynamic_form,orderBy(""))
      const querySnapshot = await getDocs(collection(db, "dynamic_form"));
      let generate = [];
      querySnapshot.forEach((doc) => {
        generate.push({ ...doc.data(), id: doc.id });
        console.log(doc.id, doc.data());
      });
      setElement(generate.slice(-1)[0].preview);
      console.log(generate.slice(-1)[0].preview);
    };
    getForm();
  }, []);

  const stringToBool = (value) => {
    switch (value) {
      case "false":
        return false;
      default:
        return true;
    }
  };

  const onFinish = async () => {
    console.log(data);
    // try {
    //   const values = await form.getFieldValue();
    //   console.log(values);
    // } catch (errorInfo) {
    //   console.log(errorInfo);
    // }
  };

  return (
    <>
      <div className="w-screen flex justify-center pt-24">
        <Form form={form} className="px-4 md:px-2 md:w-10/12 lg:w-8/12">
          <div className="w-full flex flex-wrap justify-between">
            {element.map((items, index) => (
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
                className={`${items.grid} items-start px-4 `}>
                <InputType props={{ items }} />
              </Form.Item>
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Button onClick={onFinish} className="bg-black text-white w-min">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default GenerateForm;
