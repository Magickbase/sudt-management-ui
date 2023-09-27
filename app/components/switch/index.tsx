import { useState } from 'react'
import { Switch } from '@headlessui/react'

interface ToggleProps {
  defaultEnabled?: boolean;
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
}

export function Toggle(props: ToggleProps) {
  const [_enabled, _setEnabled] = useState<boolean>(
    props.defaultEnabled || false
  );

  const handleChange = (enabled: boolean) => {
    if (props.onChange) {
      props.onChange(enabled);
    }

    _setEnabled(enabled);
  };


  const enabled = props.enabled === undefined ? _enabled : props.enabled;

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-primary-color' : 'bg-transparent'
      } relative inline-flex h-6 w-11 items-center rounded-full border-1 border-solid border-primary-color transition`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6 bg-white' : 'translate-x-1 bg-primary-color'
        } inline-block h-4 w-4 transform rounded-full transition`}
      />
    </Switch>
  )
}