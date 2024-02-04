import React, { useEffect, useState } from "react";
import { Form } from "antd";
import InputType from "./InputType";

const PreviewForm = (props) => {
  console.log(props);
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

  return (
    <>
      <div className="w-full flex flex-wrap">
        {preview.map((items, index) => {
          console.log(items.type);
          return (
            <Form.Item
              key={index}
              name={items.label}
              label={items.label}
              rules={[
                {
                  required: stringToBool(items.required),
                  message: items.message,
                },
                // {
                //   type:,
                // },
              ]}
              // className={`grid grid-cols-${items.grid} w-full`}
            >
              <InputType props={{ items }} />
            </Form.Item>
          );
        })}
      </div>
    </>
  );
};

export default PreviewForm;
