import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Radio, DatePicker } from "antd";

const InputType = (props) => {
  console.log(props.props.items);
  const [type, setType] = useState(props.props);

  const selectType = (type) => {
    console.log(type.values);
    switch (type.type) {
      case "Text":
        return <Input placeholder={type.placeholder} className="w-full" />;
      case "Password":
        return (
          <Input.Password placeholder={type.placeholder} className="w-full" />
        );
      case "Select":
        return (
          <Select
            showSearch
            placeholder={type.placeholder}
            className="w-full"
            options={type.values}
          />
        );
      case "Radio":
        return (
          <>
            <Radio.Group options={type.values}>{type.values}</Radio.Group>
          </>
        );
      case "Datepicker":
        return (
          <>
            <DatePicker className="w-full" />
          </>
        );

      // <TextArea rows={4} />;
    }
  };

  useEffect(() => {
    setType(props.props);
  }, [props]);
  return <>{selectType(type.items)}</>;
};

export default InputType;
