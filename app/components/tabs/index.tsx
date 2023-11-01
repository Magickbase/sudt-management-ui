import { type FC, ReactNode, useState } from 'react'
import { Tab } from '@headlessui/react'
import classnames from 'classnames'

interface TabsItem {
  label: string
  children?: ReactNode
}

interface TabsProps {
  items: TabsItem[]
  defaultActiveIndex?: number
  activeIndex?: number
  onChange?: (activeIndex: number) => void
}

export const Tabs: FC<TabsProps> = (props) => {
  const [_activeIndex, _setActiveIndex] = useState<number>(
    props.defaultActiveIndex || 0,
  )

  const handleChangeActiveIndex = (index: number) => {
    if (props.onChange) {
      props.onChange(index)
      return
    }

    _setActiveIndex(index)
  }

  const activeIndex = props.activeIndex ?? _activeIndex

  return (
    <Tab.Group selectedIndex={activeIndex} onChange={handleChangeActiveIndex}>
      <Tab.List className="px-4 pt-4 border-b border-solid border-[#333333] flex justify-between relative">
        {props.items.map((item, index) => (
          <Tab
            className={classnames(
              {
                'border-highlight-color text-highlight-color':
                  activeIndex === index,
              },
              { 'border-[transparent]': activeIndex !== index },
              'border-0 border-b-4 border-solid pb-3',
            )}
            key={index}
          >
            {item.label}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="p-4">
        {props.items.map((item, index) => (
          <Tab.Panel key={index}>{item.children}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
