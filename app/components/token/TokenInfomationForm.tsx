import { useForm } from 'react-hook-form'
import { Button } from '@/app/components/button'
import { Input } from '@/app/components/input'
import { Token } from '@/app/type'

interface TokenInfomationFormProps {
  token?: Token
  onSubmit?: (data: Token) => void
  readonly?: boolean
}

export function TokenInfomationForm({
  token,
  onSubmit = () => {},
  readonly = false,
}: TokenInfomationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Token>({ defaultValues: token })

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-lighter-color p-4 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col">
          <label>Name</label>
          <Input
            disabled={readonly}
            {...register('name')}
            error={errors.name !== undefined}
          />
        </div>

        <div className="flex flex-col">
          <label>Creator Email</label>
          <Input
            disabled={readonly}
            {...register('email')}
            error={errors.email !== undefined}
          />
        </div>

        <div className="flex flex-col">
          <label>Amount</label>
          <Input
            disabled={readonly}
            {...register('amount')}
            error={errors.amount !== undefined}
          />
        </div>

        <div className="flex flex-col">
          <label>Decimal</label>
          <Input
            disabled={readonly}
            {...register('decimal')}
            error={errors.decimal !== undefined}
          />
        </div>

        <div className="flex flex-col">
          <label>Description</label>
          <Input
            disabled={readonly}
            {...register('description')}
            error={errors.description !== undefined}
          />
        </div>

        <div className="flex flex-col">
          <label>Website</label>
          <Input
            disabled={readonly}
            {...register('website')}
            error={errors.website !== undefined}
          />
        </div>
      </div>

      {!readonly && (
        <Button primary type="submit">
          Confirm
        </Button>
      )}
    </form>
  )
}
