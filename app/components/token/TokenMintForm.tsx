import { useForm } from 'react-hook-form'
import { Button } from '@/app/components/button'
import { Input } from '@/app/components/input'
import { Token } from '@/app/type'

type FormData = {
  amount: string
  to: string
}

interface TokenMintFormProps {
  onSubmit: (data: FormData) => void
}

export function TokenMintForm({ onSubmit }: TokenMintFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-lighter-color p-4 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col">
          <label>Amount</label>
          <Input {...register('amount')} error={errors.amount !== undefined} />
        </div>

        <div className="flex flex-col">
          <label>To</label>
          <Input {...register('to')} error={errors.to !== undefined} />
        </div>
      </div>

      <Button primary type="submit">
        Confirm
      </Button>
    </form>
  )
}
