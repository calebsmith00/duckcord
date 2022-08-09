import { MouseEvent } from "react";

export default function FormButton(props: any) {
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    props.onClick();
  };
  return (
    <button type="submit" onClick={handleSubmit}>
      {props.text || "Generic Button"}
    </button>
  );
}
