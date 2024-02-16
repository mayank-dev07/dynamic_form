import React, { useEffect, useState } from "react";
import { Form, Button } from "antd";
import InputType from "./InputType";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const PreviewForm = (props) => {
  console.log(props);
  const [preview, setPrewiew] = useState(props.props);

  useEffect(() => {
    setPrewiew(props.props);
  }, [props]);
  useEffect(() => {
    console.log(preview);
    // setJson((prev) => ({ ...prev, preview }));
  });

  const stringToBool = (value) => {
    switch (value) {
      case "false":
        return false;
      default:
        return true;
    }
  };

  const handleClick = async () => {
    console.log(preview);
    await addDoc(collection(db, "dynamic_form"), {
      preview,
    });
  };

  return (
    <>
      <Form className="px-4 md:px-2 md:w-10/12 lg:w-8/12">
        <div className="w-full flex flex-wrap justify-between">
          {preview.map((items, index) => (
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
              <InputType props={{ items }} />
            </Form.Item>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <Button className="bg-black text-white w-min" onClick={handleClick}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PreviewForm;
