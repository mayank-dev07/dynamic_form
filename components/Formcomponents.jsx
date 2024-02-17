import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import PreviewForm from "./PreviewForm";
import { type } from "../app/json/type";
import { required } from "../app/json/required";
import { grid } from "../app/json/grid";
import { props } from "../app/json/options";

const Formcomponents = () => {
  const [formType, setFormType] = useState([]);
  const [data, setData] = useState("");
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      console.log(values);
      // if(values.label.trim()==""){

      // }
      if (values.values) {
        values.values = values.values.map((item) => ({
          ...item,
          label: item.value,
        }));
      }
      console.log(values);
      setFormType((prev) => [...prev, values]);
      form.resetFields();
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className="w-11/12 flex flex-wrap justify-evenly">
        <div className="flex flex-col w-full">
          <p className="font-serif font-bold text-base md:text-lg mb-5 uppercase flex justify-center">
            enter&nbsp;basics&nbsp;info&nbsp;about&nbsp;form&nbsp;input
          </p>
          <div className="w-full flex justify-evenly">
            <div className="w-1/2 flex flex-col md:flex-row">
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your name",
                  },
                ]}
                className="w-full md:w-1/2 px-4">
                <Select
                  placeholder="Please select a input type"
                  options={type}
                  showSearch
                  onChange={(value) => {
                    setData(value);
                  }}></Select>
              </Form.Item>
              <Form.Item
                name="label"
                label="Label"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter label name",
                  },
                ]}
                className="w-full md:w-1/2 px-4">
                <Input placeholder="label name" />
              </Form.Item>
            </div>
            <div className="w-1/2 flex flex-col md:flex-row">
              <Form.Item
                name="required"
                label="Required"
                rules={[
                  { required: true, message: "Please enter required type" },
                ]}
                className="w-full md:w-1/2 px-4">
                <Select
                  placeholder="Please select a required"
                  options={required}
                  showSearch></Select>
              </Form.Item>
              <Form.Item
                name="placeholder"
                label="Placeholder"
                rules={[
                  { whitespace: true, message: "Please enter placeholder" },
                ]}
                className="w-full md:w-1/2 px-4">
                <Input placeholder="write a placeholder" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex w-full ">
          <div className="w-1/2 md:w-1/4 flex flex-col px-4">
            <div className="font-serif font-bold text-base md:text-lg my-5 ">
              ENTER THE GRID
            </div>
            <Form.Item
              name="grid"
              label="Grid"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter grid",
                },
              ]}
              className="w-full">
              <Select
                placeholder="Please select a input length"
                options={grid}
                showSearch></Select>
            </Form.Item>
          </div>

          {data == "Textarea" ? (
            <div className="w-1/2 md:w-1/4  flex flex-col ml-8">
              <p className="font-serif font-bold text-base md:text-lg my-5">
                ENTER&nbsp;THE&nbsp;NUMBERS&nbsp;OF&nbsp;ROWS
              </p>
              <Form.Item
                name="rows"
                label="Rows"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter rows",
                  },
                ]}
                className="w-full">
                <Input placeholder="write the number of rows" />
              </Form.Item>
            </div>
          ) : (
            <></>
          )}

          {data == "Select" ? (
            <div className="w-1/2 md:w-1/4 flex flex-col px-4">
              <div className="font-serif font-bold text-base md:text-lg my-5 ">
                ENTER THE MODE
              </div>
              <Form.Item name="mode" label="Mode" className="w-full">
                <Select
                  placeholder="Please select a input length"
                  options={[
                    { label: "Multiple", value: "multiple" },
                    { label: "None", value: "none" },
                  ]}></Select>
              </Form.Item>
            </div>
          ) : (
            ""
          )}
        </div>

        {props.includes(data) && (
          <div className="flex flex-col w-full">
            <p className="font-serif font-bold text-lg my-5 uppercase">
              Enter&nbsp;the&nbsp;{data}&nbsp;Options
            </p>
            <div className="w-full flex flex-wrap">
              <Form.List name="values">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="flex mr-4 ">
                        <Form.Item
                          {...restField}
                          name={[name, "value"]}
                          label={"value"}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Enter option",
                            },
                          ]}>
                          <Input placeholder="Option" />
                        </Form.Item>

                        <Button
                          type="none"
                          onClick={() => remove(name)}
                          icon={<CloseOutlined />}></Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<FolderAddOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
        )}

        <div className="w-full flex justify-center">
          <Button htmlType="submit" className="bg-black text-white w-min">
            Preview
          </Button>
        </div>
      </Form>

      {formType.length > 0 && (
        <>
          <div className="w-full flex justify-center items-center mt-16">
            <PreviewForm props={formType} />
            {/* </Form> */}
          </div>
        </>
      )}
    </>
  );
};

export default Formcomponents;
