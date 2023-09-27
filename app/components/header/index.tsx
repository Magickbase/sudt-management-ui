
import { useRouter } from "next/navigation";


interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  const router = useRouter();
  return (
    <div
      className="flex items-center mb-4 cursor-pointer text-highlight-color text-lg"
      onClick={() => router.back()}
    >
      <img className="mr-2 h-3" src="/icons/back.svg" alt="back" />
      <span>{title}</span>
    </div>
  );
}
