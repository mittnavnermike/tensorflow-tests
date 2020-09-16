import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'

import keyCodes from '../../utils/keyCodes'

import Editor from '../editor'
import { bp, remSize } from '../../styles/utilities'

/**
 * https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html
 */

const Tabs = ({ items, className }) => {
  const defaultActive =
    Array.isArray(items) && items.filter(tab => tab.defaultOpen)

  const [activeTab, setActiveTab] = useState(
    defaultActive.length > 0 ? defaultActive[0] : items && items[0] && items[0]
  )

  const wrapper = useRef()

  if (!items) return null

  const handleClick = tab => {
    setActiveTab(tab)
  }

  const handleKeyDown = (e, i) => {
    const { arrowLeft, arrowRight, home, end } = keyCodes

    if ([home, end].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }

    const refs = [...wrapper.current.querySelectorAll('.trigger')]

    if (e.keyCode === arrowRight) {
      if (refs[i + 1]) {
        refs[i + 1].focus()
        setActiveTab(items[i + 1])
      } else {
        refs[0].focus()
        setActiveTab(items[0])
      }
    }
    if (e.keyCode === arrowLeft) {
      if (refs[i - 1]) {
        refs[i - 1].focus()
        setActiveTab(items[i - 1])
      } else {
        refs[refs.length - 1].focus()
        setActiveTab(items[refs.length - 1])
      }
    }
    if (e.keyCode === home) {
      refs[0].focus()
      setActiveTab(items[0])
    }
    if (e.keyCode === end) {
      refs[refs.length - 1].focus()
      setActiveTab(items[refs.length - 1])
    }
  }
  return (
    <div className={className} ref={wrapper}>
      <div className="triggers" role="tablist">
        {items &&
          items.map((tab, i) => {
            const isTabActive = activeTab?._key === tab._key
            return (
              tab.title &&
              tab.content && (
                <StyledTabs.Trigger
                  key={`trigger-${tab._key}`}
                  isTabActive={isTabActive}
                  tab={tab}
                  onKeyDownCapture={e => handleKeyDown(e, i)}
                  onMouseDown={e => e.preventDefault()} // To prevent focus on click but still keeps focus on tab
                  onClick={() => handleClick(tab)}
                >
                  {tab.title}
                </StyledTabs.Trigger>
              )
            )
          })}
      </div>
      <div className="window">
        {items &&
          items.map((tab, i) => {
            const isTabActive = activeTab?._key === tab._key
            return (
              tab.content &&
              tab.title && (
                <StyledTabs.Panel
                  key={`pane-${tab._key}`}
                  tab={tab}
                  onKeyDownCapture={e => handleKeyDown(e, i)}
                  isTabActive={isTabActive}
                >
                  <Editor blocks={tab.content} />
                </StyledTabs.Panel>
              )
            )
          })}
      </div>
    </div>
  )
}

const TabTrigger = ({ className, children, isTabActive, tab, ...props }) => {
  return (
    <button
      {...props}
      role="tab"
      aria-selected={isTabActive}
      tabIndex={!isTabActive ? '-1' : null}
      aria-controls={tab._key}
      className={`${className} trigger`}
    >
      {children}
    </button>
  )
}
const TabPanel = ({ className, children, tab, isTabActive, ...props }) => {
  return (
    <div
      {...props}
      role="tabpanel"
      id={tab._key}
      aria-labelledby={tab._key}
      // tabIndex="0" // removed because of linter
      key={`pane-${tab._key}`}
      className={className}
    >
      {children}
    </div>
  )
}

const StyledTabs = styled(Tabs)(props => {
  return css`
    ${bp.above.lg`
    display: flex;
  `}
    .window {
      background: red;
      flex-grow: 1;
    }

    .triggers {
      width: 100%;
      display: flex;
      justify-content: space-between;

      ${bp.above.lg`
        width: ${remSize(400)};
        flex-direction: column;
        justify-content: flex-start;
    `}
    }
  `
})

StyledTabs.Trigger = styled(TabTrigger)(
  ({ theme, isTabActive }) => css`
    text-align: left;
    flex-grow: 1;
    background: ${isTabActive ? theme.colors.primary : theme.colors.secondary};

    ${bp.above.lg`
      flex-grow: 0;
    `}
  `
)

StyledTabs.Panel = styled(TabPanel)(
  ({ isTabActive }) =>
    css`
      display: ${isTabActive ? 'block' : 'none'};
    `
)

export default StyledTabs
