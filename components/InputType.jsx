import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";

const InputType = (props) => {
  console.log(props.props.items);
  const [type, setType] = useState(props.props);

  const selectType = (type) => {
    console.log(type);
    switch (type.type) {
      case "Text":
        return <Input placeholder={type.placeholder} className="w-full" />;
      case "Password":
        return (
          <Input.Password placeholder={type.placeholder} className="w-full" />
        );
      case "select":
        return (
          <Select
            showSearch
            placeholder={type.placeholder}
            className="w-full"
            options={type.values}
          />
        );
    }
  };

  useEffect(() => {
    setType(props.props);
  }, [props]);
  return <>{selectType(type.items)}</>;
};

export default InputType;
