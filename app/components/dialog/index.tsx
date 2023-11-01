import { Dialog, Transition } from '@headlessui/react'
import { type FC, type ReactElement, Fragment, useState } from 'react'
import { Button as PrimaryButton } from '../button'

export const MyDialog: FC<{ title: string; description: string | ReactElement }> = ({ title, description }) => {
  let [isOpen, setIsOpen] = useState(true)

  function handleDismiss() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

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
                  <Dialog.Title as="h3" className="text-lg text-white font-medium leading-6 mb-2 text-center">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm leading-7 text-[#ccc]">{description}</p>
                  </div>

                  <div className="mt-4">
                    <PrimaryButton onClick={handleDismiss}>Cancel</PrimaryButton>
                  </div>
                  <button>
                    <img
                      src="/icons/close.svg"
                      alt="close"
                      className="absolute top-4 right-4 cursor-pointer"
                      onClick={handleDismiss}
                    />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
