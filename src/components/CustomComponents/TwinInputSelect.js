import React, { useEffect } from "react";
import { Input, Select } from "antd";
import { phoneSaveAction } from "../../action/authAction";
import { useDispatch } from "react-redux";
const { Option } = Select;

export default function TwinInputSelect({
  placeholder,
  onChange,
  required,
  id,
  value,
  list,
  type,

  ...props
}) {
  const [data, setData] = React.useState(null);
  const dispatch = useDispatch();

  const getSelection = (item) => {
    setData({ ...data, prefix: item });
  };
  const getInput = (event) => {
    setData({ ...data, value: event.target.value });
  };

  useEffect(() => {
    dispatch(phoneSaveAction(data));
  }, [data]);
  return (
    <Input.Group compact size="large" style={{ width: "100%" }}>
      <Select
        style={{ borderRadius: "5px" }}
        defaultValue={list && list[0]}
        onChange={getSelection}
      >
        {list &&
          list.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
      </Select>
      <Input
        style={{ maxWidth: "70%", borderRadius: "5px" }}
        placeholder={placeholder || ""}
        required={required}
        onChange={onChange}
        type={type || "text"}
        value={value}
      />
    </Input.Group>
  );
}
