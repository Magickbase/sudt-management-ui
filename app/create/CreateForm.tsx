import { useForm } from "react-hook-form";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";

type FormData = {
  symbol: string;
  name: string;
  email: string;
  decimal: string;
  description: string;
  website: string;
};

interface CreateFormProps {
  onSubmit: (data: FormData) => void;
}

export function CreateForm(props: CreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <div className="bg-lighter-color p-4 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col">
          <label>Symbol</label>
          <Input {...register("symbol")} error={errors.symbol !== undefined} />
        </div>

        <div className="flex flex-col">
          <label>Name</label>
          <Input {...register("name")} error={errors.name !== undefined} />
        </div>

        <div className="flex flex-col">
          <label>Creator Email</label>
          <Input {...register("email")} error={errors.email !== undefined} />
        </div>

        <div className="flex flex-col">
          <label>Decimal</label>
          <Input
            {...register("decimal")}
            error={errors.decimal !== undefined}
          />
        </div>

        <div className="flex flex-col">
          <label>Description</label>
          <Input
            {...register("description")}
            error={errors.description !== undefined}
          />
        </div>

        <div className="flex flex-col">
          <label>Website</label>
          <Input
            {...register("website")}
            error={errors.website !== undefined}
          />
        </div>
      </div>

      <Button primary type="submit">
        Confirm
      </Button>
    </form>
  );
}
