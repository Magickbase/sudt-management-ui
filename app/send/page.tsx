"use client";
import { PageHeader } from "@/app/components/header";
import { SendForm } from "./SendForm";

export default function SendPage({}: {}) {
  return (
    <>
      <PageHeader title="Send" />
      <SendForm onSubmit={(data) => console.log(data)} />
    </>
  );
}
