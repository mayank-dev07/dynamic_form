import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Checkbox, Row, Col, Space } from "antd";
import { CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import PreviewForm from "./PreviewForm";
import { type } from "../app/json/type";
import { required } from "../app/json/required";
import { grid } from "../app/json/grid";

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

  useEffect(() => {
    console.log(data);
  }, [data]);

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
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please input your name" }]}
              className="w-1/4 px-4">
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
              className="w-1/4 px-4">
              <Input placeholder="label name" />
            </Form.Item>

            <Form.Item
              name="required"
              label="required"
              rules={[
                { required: true, message: "Please enter required type" },
              ]}
              className="w-1/4">
              <Select
                placeholder="Please select a required"
                options={required}
                showSearch></Select>
            </Form.Item>
            <Form.Item
              name="placeholder"
              label="placeholder"
              rules={[{ required: true, message: "Please enter placeholder" }]}
              className="w-1/4 px-4">
              <Input placeholder="write a placeholder" />
            </Form.Item>
          </div>
        </div>

        <div className="w-full flex flex-col">
          <p className="font-serif font-bold text-lg my-5">
            ENTER THE SIZE OF THE INPUT FIELD
          </p>
          <Form.Item
            name="grid"
            label="grid"
            rules={[{ required: true, message: "Please enter grid" }]}
            className="w-1/4">
            <Select
              placeholder="Please select a input length"
              options={grid}
              showSearch></Select>
          </Form.Item>
        </div>

        {data === "select" && (
          <div className="flex flex-col w-full">
            <p className="font-serif font-bold text-lg my-5">
              ENTER THE DROPDOWN FIELDS
            </p>
            <div className="w-full flex flex-wrap">
              <Form.List name="values">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className="flex mr-4">
                        <Form.Item
                          {...restField}
                          name={[name, "value"]}
                          rules={[{ required: true, message: "Enter option" }]}>
                          <Input placeholder="Option" />
                        </Form.Item>

                        <CloseOutlined onClick={() => remove(name)} />
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
