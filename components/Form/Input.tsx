import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  placeholder?: string;
  type?: string;
  label: string;
  value: string;
  onChange: Function;
}

export default function FormInput(props: InputProps) {
  const { type = "text", placeholder, name, label } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name = undefined, value = undefined } = e.target;
    if (name === undefined) return;

    props.onChange(name, value);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder || label}
        name={name}
        onChange={onChange}
        value={props.value}
      />
    </div>
  );
}
