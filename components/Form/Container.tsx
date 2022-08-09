import FormButton from "./Button";

export default function Form(props: any) {
  return (
    <form>
      {props.children}

      <div>
        <FormButton text="Submit" onClick={props.onSubmit} />
        <FormButton text="Clear" onClick={props.onClear} />
      </div>
    </form>
  );
}
