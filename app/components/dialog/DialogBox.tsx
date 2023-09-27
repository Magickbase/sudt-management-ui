import { Dialog, Transition } from "@headlessui/react";
import { type FC, type PropsWithChildren, Fragment } from "react";
import { Button } from "../button";

export const DialogBox: FC<
  PropsWithChildren<{
    title?: string;
    footer?: boolean;
    closeIcon?: boolean;
    isOpen: boolean;
    handleDismiss: () => void;
  }>
> = ({
  title,
  footer = false,
  closeIcon = false,
  isOpen,
  handleDismiss,
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleDismiss}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#151515] bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-white bg-black p-6 text-left align-middle shadow-xl transition-all">
                {Boolean(title) && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-white font-medium leading-6 mb-2 text-center"
                  >
                    {title}
                  </Dialog.Title>
                )}

                {children}

                {footer && (
                  <div className="mt-4">
                    <Button primary block onClick={handleDismiss}>
                      Cancel
                    </Button>
                  </div>
                )}

                {closeIcon && (
                  <button>
                    <img
                      src="/icons/close.svg"
                      alt="close"
                      className="absolute top-4 right-4 cursor-pointer"
                      onClick={handleDismiss}
                    />
                  </button>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
