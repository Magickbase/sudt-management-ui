import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { propagateServerField } from "next/dist/server/lib/render-server";

type SelectValue = string | number;
type SelectOptions<V> = {
  key: V;
  label: string | React.ReactNode;
};

interface SelectProps<V> {
  onChange: (value: V) => void;
  options: SelectOptions<V>[];
  value: V;
  defaultValue?: V;
  placeholder?: string;
}

export function Select<V = SelectValue>({
  placeholder = "please select an option...",
  ...props
}: SelectProps<V>) {
  const [_selected, _setSelected] = useState<V | undefined>(
    props.defaultValue || undefined
  );

  const handleChange = (value: V) => {
    if (props.onChange) {
      props.onChange(value);
    }

    _setSelected(value);
  };

  const selected = props.value === undefined ? _selected : props.value;

  const optionMaps = useMemo(() => {
    return props.options.reduce(
      (a, b) => ({ ...a, [b.key as string]: b }),
      {}
    ) as { [key: string]: SelectOptions<V> };
  }, [props.options]);

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full border-rim-color border-[1px] border-solid rounded-lg py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {selected !== undefined
              ? optionMaps[selected as string]?.label
              : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <img
              src="/icons/coveronUpDown.svg"
              className="h-4 w-4 text-rim-corlor"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="border-[1px] border-solid border-rim-color absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#111111] py-1 px-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pr-4 ${
                    active ? "bg-lighter-color" : ""
                  } ${
                    optionIdx < props.options.length - 1 ? "border-b-[1px] border-solid border-rim-color" : ''
                  }`
                }
                value={option.key}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
