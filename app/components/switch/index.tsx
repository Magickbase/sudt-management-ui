import { useState } from 'react'
import { Switch, SwitchProps } from '@headlessui/react'

interface ToggleProps
  extends Omit<
    SwitchProps<'button'>,
    'checked' | 'defaultChecked' | 'onChange'
  > {
  defaultEnabled?: boolean
  enabled?: boolean
  onChange?: (enabled: boolean) => void
}

export function Toggle({
  enabled: propsEnabled,
  defaultEnabled,
  onChange,
  className,
  ...switchProps
}: ToggleProps) {
  const [_enabled, _setEnabled] = useState<boolean>(defaultEnabled || false)

  const handleChange = (enabled: boolean) => {
    if (onChange) {
      onChange(enabled)
    }

    _setEnabled(enabled)
  }

  const enabled = propsEnabled === undefined ? _enabled : propsEnabled

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-primary-color' : 'bg-transparent'
      } ${className} relative inline-flex h-6 w-11 items-center rounded-full border-1 border-solid border-primary-color transition`}
      {...switchProps}
    >
      <span
        className={`${
          enabled ? 'translate-x-6 bg-white' : 'translate-x-1 bg-primary-color'
        } inline-block h-4 w-4 transform rounded-full transition`}
      />
    </Switch>
  )
}
