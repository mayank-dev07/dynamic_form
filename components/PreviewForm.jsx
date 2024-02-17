import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

import { Form, Button } from "antd";
import InputType from "./InputType";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRouter } from "next/navigation";

const PreviewForm = (props) => {
  console.log(props.props);
  const router = useRouter();
  const [preview, setPrewiew] = useState(props.props);

  useEffect(() => {
    setPrewiew(props.props);
  }, [props]);

  const stringToBool = (value) => {
    switch (value) {
      case "false":
        return false;
      default:
        return true;
    }
  };

  const handleClick = (preview) => {
    console.log({ preview });
    console.log(JSON.stringify({ preview }));
    console.log(JSON.parse(JSON.stringify({ preview })));
    addDoc(
      collection(db, "dynamic_form"),
      JSON.parse(JSON.stringify({ preview }))
    );
    router.push("/GenerateForm");
  };

  const remove = (id) => {
    console.log(id);
    setPrewiew(preview.filter((item, index) => index != id));
  };

  return (
    <>
      {preview.length > 0 && (
        <Form className="px-4 md:px-2 md:w-10/12 lg:w-8/12">
          <div className="w-full flex flex-wrap justify-between">
            {preview.map((items, index) => (
              <>
                <div className="flex w-full">
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

                  <Button
                    type="none"
                    onClick={() => remove(index)}
                    icon={<CloseOutlined />}></Button>
                </div>
              </>
            ))}
          </div>
          <div className="w-full flex justify-center">
            <Button
              className="bg-black text-white w-min"
              onClick={() => handleClick(preview)}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default PreviewForm;
