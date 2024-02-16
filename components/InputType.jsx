import React, { useEffect, useState } from "react";
import { Input, Select, Radio, DatePicker, TimePicker } from "antd";
const { TextArea } = Input;

const InputType = (props) => {
  const [type, setType] = useState(props.props);

  const selectType = (type) => {
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
            mode={type.mode}
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
            <DatePicker className="w-full" placeholder={type.placeholder} />
          </>
        );
      case "TimePicker":
        return (
          <>
            <TimePicker className="w-full" placeholder={type.placeholder} />
          </>
        );
      case "Textarea":
        return (
          <>
            <TextArea
              rows={type.rows}
              placeholder={type.placeholder}
              className="w-full"
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
