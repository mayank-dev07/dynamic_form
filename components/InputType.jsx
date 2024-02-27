import React, { useEffect, useState } from "react";
import { Input, Select, Radio, DatePicker, TimePicker } from "antd";
import useStore from "./zustand";

const { TextArea } = Input;

const InputType = (props) => {
  const details = useStore((state) => state.data);
  const [type, setType] = useState(props.props);

  useEffect(() => {
    console.log(props.props);
    setType(props.props);
  }, [props]);

  const selectType = (type) => {
    switch (type.type) {
      case "Text":
        return (
          <Input
            placeholder={type.placeholder}
            className="w-full"
            name={type.label}
            value={type.value?type.value:undefined}
            onChange={(e) => {
              details.find((obj) => {
                if (obj.label == type.label) {
                  obj.value = e.target.value;
                }
              });
            }}
          />
        );
      case "Password":
        return (
          <Input.Password
            placeholder={type.placeholder}
            className="w-full"
            name={type.label}
            value={type.value?type.value:undefined}
            onChange={(e) => {
              details.find((obj) => {
                if (obj.label == type.label) {
                  obj.value = e.target.value;
                }
              });
            }}
          />
        );
      case "Select":
        return (
          <Select
            showSearch
            placeholder={type.placeholder}
            className="w-full"
            name={type.label}
            value={type.value?type.value:undefined}
            options={type.values}
            mode={type.mode}
            onChange={(e) => {
              details.find((obj) => {
                if (obj.label == type.label) {
                  obj.value = e;
                }
              });
            }}
          />
        );
      case "Radio":
        return (
          <>
            <Radio.Group
              options={type.values}
              className="w-full"
              onChange={(e) => {
                details.find((obj) => {
                  if (obj.label == type.label) {
                    obj.value = e.target.value;
                  }
                });
              }}
              name={type.label}
              value={type.value?type.value:undefined}>
              {type.values}
            </Radio.Group>
          </>
        );
      case "Datepicker":
        return (
          <>
            <DatePicker
              className="w-full"
              onChange={(e) => {
                details.find((obj) => {
                  if (obj.label == type.label) {
                    obj.value = e.target.value;
                  }
                });
              }}
              name={type.label}
              value={type.value?type.value:undefined}
              placeholder={type.placeholder}
            />
          </>
        );
      case "TimePicker":
        return (
          <>
            <TimePicker
              className="w-full"
              onChange={(e) => {
                details.find((obj) => {
                  if (obj.label == type.label) {
                    obj.value = e.target.value;
                  }
                });
              }}
              name={type.label}
              value={type.value?type.value:undefined}
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
              onChange={(e) => {
                details.find((obj) => {
                  if (obj.label == type.label) {
                    obj.value = e.target.value;
                  }
                });
              }}
              name={type.label}
              value={type.value?type.value:undefined}
            />
          </>
        );
    }
  };

  return <>{selectType(type)}</>;
};

export default InputType;
