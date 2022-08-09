import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io();

interface FormProps {
  onSubmitFetch?: string | undefined;
  populateInputs?: any[];
}

export default function useForm(props: FormProps) {
  const { onSubmitFetch = undefined, populateInputs = [] } = props;
  const [formFields, setFormFields] = useState<any>();
  const [socketId, setSocketId] = useState<any>("");

  useEffect(() => {
    socket.on("SignUpReceive", async (signupDetails) => {
      if (onSubmitFetch === undefined) return;
      try {
        const request = await fetch(onSubmitFetch, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupDetails),
        });
        const response = await request.json();

        console.log(response);
      } catch (e) {
        console.error(`Error onSubmit ${e}`);
      }
    });

    populateInputs.map((input, index) => {
      setFormFields((prevState: any) => ({
        ...prevState,
        [input.name]: "",
      }));
    });
  }, [populateInputs, onSubmitFetch]);

  const onChange = (key: string, value: any) => {
    setFormFields((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const isValidInput = (): boolean => {
    const fieldKeys = Object.keys(formFields);
    for (const index in fieldKeys) {
      const formFieldKey = fieldKeys[index];
      if (
        formFields[formFieldKey] === undefined ||
        formFields[formFieldKey] === ""
      ) {
        return false;
      }
    }

    return true;
  };

  const onSubmit = async () => {
    const validInput = isValidInput();

    if (validInput && onSubmitFetch !== undefined) {
      socket.emit("SignUpRequest", formFields, onSubmitFetch);
    }
  };

  const onClear = () => {
    const clearedFields: any = {};
    Object.assign(clearedFields, formFields);

    const fieldKeys = Object.keys(clearedFields);
    for (const index in fieldKeys) {
      const indexOfField = fieldKeys[index];
      clearedFields[indexOfField] = undefined;
    }

    setFormFields(clearedFields);
  };

  return {
    onChange,
    onSubmit,
    onClear,
    formFields,
  };
}
