import useSWR from 'swr'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/app/components/button'
import { Input } from '@/app/components/input'
import { Select } from '@/app/components/select'
import { sudtApi } from '../components/apiClient'
import { useAccount } from '../hooks/useAccount'
import { useMemo } from 'react'

type FormData = {
  typeId: string
  amount: string
  to: string
}

interface SendFormProps {
  defaultValues?: Partial<FormData>
  onSubmit: (data: FormData) => void
}

export function SendForm(props: SendFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: props.defaultValues })

  const { addressHash } = useAccount()
  const { data: assets, isLoading } = useSWR(
    addressHash ? ['assets', addressHash] : null,
    () => sudtApi.account.listAssets(addressHash),
  )

  const assetOptions = useMemo(
    () =>
      assets?.map((asset) => ({
        label: asset.displayName,
        key: asset.typeId,
      })) || [],
    [assets],
  )

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <div className="bg-lighter-color p-4 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col">
          <label>Token</label>

          <Controller
            name="typeId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} options={assetOptions} />}
          />
        </div>

        <div className="flex flex-col">
          <label>Amount</label>
          <Input
            {...register('amount', { required: true })}
            error={errors.amount !== undefined}
          />
          {errors.amount && <p>amount is required.</p>}
        </div>

        <div className="flex flex-col">
          <label>To</label>
          <Input
            placeholder="ckb...."
            {...register('to', { required: true })}
            error={errors.amount !== undefined}
          />
          {errors.to && <p>to is required.</p>}
        </div>
      </div>

      <Button primary type="submit">
        Confirm
      </Button>
    </form>
  )
}
