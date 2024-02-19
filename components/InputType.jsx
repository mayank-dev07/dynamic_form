import React, { useEffect, useState } from "react";
import { Input, Select, Radio, DatePicker, TimePicker } from "antd";
import useStore from "./zustand";

const { TextArea } = Input;

const InputType = (props) => {
  const [type, setType] = useState(props.props);
  // const setData = useStore((state) => state.setData);
  // const data = useStore((state) => state.data);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    console.log(e.target.name);
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    console.log(data);
  };

  const selectType = (type) => {
    // console.log(type);
    switch (type.type) {
      case "Text":
        return (
          <Input
            placeholder={type.placeholder}
            className="w-full"
            onChange={handleChange}
            name={type.label}
          />
        );
      case "Password":
        return (
          <Input.Password
            placeholder={type.placeholder}
            className="w-full"
            onChange={handleChange}
            name={type.label}
          />
        );
      case "Select":
        return (
          <Select
            showSearch
            placeholder={type.placeholder}
            className="w-full"
            onChange={handleChange}
            name={type.label}
            options={type.values}
            mode={type.mode}
          />
        );
      case "Radio":
        return (
          <>
            <Radio.Group
              options={type.values}
              className="w-full"
              onChange={handleChange}
              name={type.label}>
              {type.values}
            </Radio.Group>
          </>
        );
      case "Datepicker":
        return (
          <>
            <DatePicker
              className="w-full"
              onChange={handleChange}
              name={type.label}
              placeholder={type.placeholder}
            />
          </>
        );
      case "TimePicker":
        return (
          <>
            <TimePicker
              className="w-full"
              onChange={handleChange}
              name={type.label}
              placeholder={type.placeholder}
            />
          </>
        );
      case "Textarea":
        return (
          <>
            <TextArea
              rows={type.rows}
              placeholder={type.placeholder}
              className="w-full"
              onChange={handleChange}
              name={type.label}
            />
          </>
        );
    }
  };

  useEffect(() => {
    setType(props.props);
  }, [props]);
  return <>{selectType(type.items)}</>;
};

export default InputType;
