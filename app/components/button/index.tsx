import type { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";
import classnames from "classnames";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  primary?: boolean;
  ghost?: boolean;
  block?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  ghost = false,
  primary = false,
  block = false,
  ...attrs
}) => (
  <button
    {...attrs}
    className={classnames(
      className,
      { ["bg-transparent border-solid"]: ghost },
      { ["bg-primary-color text-white"]: primary && !ghost },
      { ["text-primary-color"]: primary && ghost },
      { ["border-primary-color"]: primary },
      { ["w-full"]: block },
      `p-[14px] rounded-2xl font-medium text-base leading-0 disabled:opacity-50`
    )}
  >
    {children}
  </button>
);
