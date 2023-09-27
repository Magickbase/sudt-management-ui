"use client";
import { PageHeader } from "@/app/components/header";
import { CreateForm } from "./CreateForm";

export default function CreatePage({}: {}) {
  return (
    <>
      <PageHeader title="Create UDT" />
      <CreateForm onSubmit={(data) => console.log(data)} />
    </>
  );
}
