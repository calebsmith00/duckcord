import Form from "../components/Form/Container";
import FormInput from "../components/Form/Input";
import useForm from "../hooks/useForm";
import { useEffect, useState } from "react";

const signupInputs = [
  { label: "Email", name: "email", onChange: undefined, value: "" },
  { label: "Username", name: "username", onChange: undefined, value: "" },
  { label: "Password", name: "password", onChange: undefined, value: "" },
];

export default function Signup() {
  const form = useForm({
    onSubmitFetch: "http://localhost:3000/api/signup",
    populateInputs: signupInputs,
  });

  return (
    <div>
      <Form onClear={form.onClear} onSubmit={form.onSubmit}>
        {signupInputs.map((input, index) => {
          const value =
            form.formFields === undefined ? "" : form.formFields[input.name];

          return (
            <FormInput
              key={index}
              label={input.label}
              name={input.name}
              onChange={form.onChange}
              value={value}
            ></FormInput>
          );
        })}
      </Form>
    </div>
  );
}
