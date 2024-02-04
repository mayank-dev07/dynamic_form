import React, { useEffect, useState } from "react";
import { type } from "../app/json/type";
import { Button, Form, Input, Select, Checkbox, Row, Col } from "antd";
import PreviewForm from "./PreviewForm";

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
    console.log(formType);
    console.log(data);
  }, [formType, data]);

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        className="w-11/12 flex flex-wrap justify-evenly">
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: "Please input your name" }]}
          className="w-1/4 px-4">
          <Select
            placeholder="Please select a country"
            options={type}
            showSearch
            onChange={(value) => {
              setData(values);
            }}></Select>
        </Form.Item>
        <Form.Item
          name="label"
          label="Label"
          rules={[{ required: true, message: "Please enter label name" }]}
          className="w-1/4 px-4">
          <Input placeholder="label name" />
        </Form.Item>
        {/* <div className="flex"> */}
        <Form.Item
          name="required"
          label="required"
          rules={[{ required: true, message: "Please enter label name" }]}
          className="w-1/4 px-4">
          <Input placeholder="label name" />
        </Form.Item>
        <Form.Item
          name="placeholder"
          label="placeholder"
          rules={[{ required: true, message: "Please enter label name" }]}
          className="w-1/4 px-4">
          <Input placeholder="label name" />
        </Form.Item>
        {/* </div> */}
        {/* {value.[]} */}
        <div className="flex w-1/3">
          {/* <Form.Item name="checkbox-group" label=" PROPS">
            <Checkbox.Group>
              <Row>
                <Col>
                  <Checkbox value="A">A</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="B">B</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="C">C</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="D">D</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="E">E</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="F">F</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item> */}
        </div>
        <Form.Item
          name="grid"
          label="grid"
          rules={[{ required: true, message: "Please enter label name" }]}
          className="w-1/4">
          <Input placeholder="label name" />
        </Form.Item>
        <div className="w-full flex justify-center">
          <Button htmlType="submit" className="bg-black text-white w-1/3">
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
