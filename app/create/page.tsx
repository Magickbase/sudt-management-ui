"use client";
import { PageHeader } from "@/app/components/header";
import { TokenInfomationForm } from "@/app/components/token/TokenInfomationForm";

export default function CreatePage({}: {}) {
  return (
    <>
      <PageHeader title="Create UDT" />
      <TokenInfomationForm onSubmit={(data) => console.log(data)} />
    </>
  );
}
