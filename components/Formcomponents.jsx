import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Checkbox, Row, Col, Space } from "antd";
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
  const onFinish = async () => {
    try {
      const values = await form.getFieldValue();
      setFormType((prev) => [...prev, values]);
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
          <p className="font-serif font-bold text-lg mb-5">
            ENTER BASIC INFO ABOUT FORM INPUT
          </p>
          <div className="w-full flex justify-evenly">
            <div className="w-1/2 flex flex-col md:flex-row">
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please input your name" }]}
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
                rules={[{ required: true, message: "Please enter label name" }]}
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
                  { required: true, message: "Please enter placeholder" },
                ]}
                className="w-full md:w-1/2 px-4">
                <Input placeholder="write a placeholder" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex w-full ">
          <div className="w-1/2 md:w-1/4 flex flex-col">
            <div className="font-serif font-bold text-base md:text-lg my-5 ">
              ENTER THE SIZE OF INPUT FIELD
            </div>
            <Form.Item
              name="grid"
              label="Grid"
              rules={[{ required: true, message: "Please enter grid" }]}
              className="w-full">
              <Select
                placeholder="Please select a input length"
                options={grid}
                showSearch></Select>
            </Form.Item>
          </div>

          <div className="w-1/2 md:w-1/4  flex flex-col ml-8">
            <p className="font-serif font-bold text-base md:text-lg my-5">
              ENTER THE NUMBERS OF ROWS
            </p>
            <Form.Item
              name="grid"
              label="Rows"
              rules={[{ required: true, message: "Please enter grid" }]}
              className="w-full">
              <Input placeholder="write the number of rows" />
            </Form.Item>
          </div>
        </div>

        {props.includes(data) && (
          <div className="flex flex-col w-full">
            <p className="font-serif font-bold text-lg my-5">
              ENTER THE DROPDOWN FIELDS
            </p>
            <div className="w-full flex flex-wrap">
              <Form.List name="values">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="flex mr-4 ">
                        <Form.Item
                          {...restField}
                          name={([name, "value"], [name, "label"])}
                          rules={[{ required: true, message: "Enter option" }]}>
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
          <Button htmlType="submit" className="bg-black text-white w-1/6">
            Submit
          </Button>
        </div>
      </Form>

      {formType.length > 0 && (
        <>
          <div className="w-full flex justify-center items-center mt-16">
            <Form className="w-8/12">
              <PreviewForm props={formType} />
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default Formcomponents;