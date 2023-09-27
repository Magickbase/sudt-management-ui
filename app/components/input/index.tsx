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
        `bg-transparent border-solid border-[1px] border-rim-color rounded-lg p-3 active:border-primary-color focus:border-primary-color transition-all text-sm`,
        { ['border-red-400']: error },
        className,
      )}
    />
  );
});
