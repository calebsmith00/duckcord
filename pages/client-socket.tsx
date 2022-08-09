import { NextPageContext } from "next";

export default function ClientSocket(props: any) {
  return <></>;
}

export async function getServerSideProps(context: NextPageContext) {
  const socketReq = await fetch("http://localhost:3000/api/socket");
  const socket = await socketReq.json();

  return {
    props: {},
  };
}
