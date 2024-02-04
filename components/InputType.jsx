import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";

const InputType = (props) => {
  const [type, setType] = useState(props.props);

  const selectType = (type) => {
    switch (type.type) {
      case "Text":
        //   case "email":
        return <Input placeholder={type.message} className="w-full" />;
      case "Password":
        return <Input.Password placeholder={type.message} className="w-full" />;
    }
  };

  useEffect(() => {
    setType(props.props);
  }, [props]);
  return <>{selectType(type.items)}</>;
};

export default InputType;
