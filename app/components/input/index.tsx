import type { FC, InputHTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";
import classnames from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, className, ...attrs }: InputProps,
  ref
) {
  return (
    <input
      {...attrs}
      ref={ref}
      className={classnames(
        `rounded-lg p-3 transition-all text-sm`,
        { ['border-red-400']: error },
        { ['bg-transparent border-solid border-[1px] border-rim-color active:border-primary-color focus:border-primary-color']: !attrs.disabled },
        { ['bg-lighter-color']: attrs.disabled },
        className,
      )}
    />
  );
});
