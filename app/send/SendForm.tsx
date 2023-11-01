import useSWR from 'swr'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/app/components/button'
import { Input } from '@/app/components/input'
import { Select } from '@/app/components/select'
import { MOCK_ASSETS } from '@/app/mock'

import { useState } from 'react'

async function fetchAssets() {
  return [
    {
      label: 'CKB',
      key: 'CKB',
    },
    ...MOCK_ASSETS.map((asset) => ({
      label: asset.symbol,
      key: asset.symbol,
    })),
  ]
}

type FormData = {
  token: string
  amount: string
  to: string
}

interface SendFormProps {
  onSubmit: (data: FormData) => void
}

export function SendForm(props: SendFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>()

  const { data: assets } = useSWR(['assets'], () => fetchAssets())

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <div className="bg-lighter-color p-4 rounded-xl flex flex-col gap-4">
        <div className="flex flex-col">
          <label>Token</label>

          <Controller
            name="token"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select {...field} options={assets || []} />}
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
