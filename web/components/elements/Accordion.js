/**
 * Usage:
 * <Accordion items={props.node.items} exclusive />
 * <Accordion items={props.node.items} />
 *
 * Props:
 * @prop {boolean} exclusive
 * Decides if one opens at the time or multiple opens
 *
 * @prop {number} defaultActive
 * Pass the index if you want to leave one open by default
 *
 * TODO: Allow nested accordions
 *
 * https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
 */

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

import keyCodes from '../../utils/keyCodes'

import { color, spacing } from '../../styles/utilities'
import { H3 } from '@heydays/Typography'
import Editor from '../editor'

const Accordion = ({
  items,
  exclusive = false,
  defaultActive = null,
  className
}) => {
  const [active, setActive] = useState(
    exclusive ? defaultActive : [defaultActive]
  )

  // wrapper ref for accesibilty
  const wrapper = useRef()

  // return null if no array
  if (!items || (!Array.isArray(items) && items.length === 0)) return null

  const handleClick = i => {
    if (exclusive) {
      active === i ? setActive(null) : setActive(i)
    } else {
      if (active.includes(i)) {
        const newActive = [...active].filter(a => a !== i)
        setActive(newActive)
      } else {
        setActive([...active, i])
      }
    }
  }
  return (
    <div className={className} ref={wrapper}>
      {items.map(
        (item, i) =>
          item.title &&
          item.content && (
            <StyledAccordion.Item
              key={item._key}
              i={i}
              active={active}
              item={item}
              exclusive={exclusive}
              handleClick={handleClick}
              wrapperRef={wrapper}
            />
          )
      )}
    </div>
  )
}

const AccordionItem = ({
  className,
  item,
  handleClick,
  i,
  active,
  wrapperRef
}) => {
  const handleKeyDown = e => {
    const { arrowDown, arrowUp, home, end } = keyCodes
    // https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html#kbd_label
    // Prevent scrolling if following keys are pressed
    if ([arrowDown, arrowUp, home, end].indexOf(e.keyCode) > -1) {
      e.preventDefault()
    }
    const refs = [...wrapperRef.current.querySelectorAll('.trigger')]

    if (e.keyCode === arrowDown) {
      if (refs[i + 1]) {
        refs[i + 1].focus()
      } else {
        refs[0].focus()
      }
    }
    if (e.keyCode === arrowUp) {
      if (refs[i - 1]) {
        refs[i - 1].focus()
      } else {
        refs[refs.length - 1].focus()
      }
    }
    if (e.keyCode === home) {
      refs[0].focus()
    }
    if (e.keyCode === end) {
      refs[refs.length - 1].focus()
    }
  }
  const horVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  }
  const verVariants = {
    closed: { rotate: 0 },
    open: { rotate: -90 }
  }
  return (
    <div className={className}>
      <button
        className="trigger"
        onClick={() => handleClick(i)}
        onMouseDown={e => e.preventDefault()} // To prevent focus on click but still keeps focus on tab
        onKeyDownCapture={e => handleKeyDown(e)}
        aria-expanded={
          active === i || (Array.isArray(active) && active.includes(i))
            ? 'true'
            : 'false'
        }
        aria-controls={`${item._key}-${i}`}
        id={`${i}-${item._key}`}
      >
        <H3 className="title">{item.title}</H3>
        <svg className="icon" viewBox="0 0 10 10">
          <motion.line
            variants={verVariants}
            animate={active === i ? 'open' : 'closed'}
            className="ver"
            x1="5"
            y1="0"
            x2="5"
            y2="10"
          />
          <motion.line
            variants={horVariants}
            animate={active === i ? 'open' : 'closed'}
            className="hor"
            x1="0"
            y1="5"
            x2="10"
            y2="5"
          />
        </svg>
      </button>
      <div
        className="content"
        id={`${item._key}-${i}`}
        aria-labelledby={`${i}-${item._key}`}
      >
        <Editor blocks={item.content} />
      </div>
    </div>
  )
}

const StyledAccordion = styled(Accordion)(({ theme }) => css``)

StyledAccordion.Item = styled(AccordionItem)(
  ({ theme, active, exclusive, i }) => {
    const isActive = exclusive ? active === i : active.includes(i)
    return css`
      ${theme.border.large('border-bottom')};
      border-color: ${isActive
        ? theme.colors.primary
        : color.darken(theme.colors.primary, 0.2)};
      transition: border-color ${theme.trans.fast}, color ${theme.trans.fast};

      .trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        text-align: left;
        ${spacing.xs('py')};

        .title {
          font-family: ${theme.fontFamily.sans};
          color: ${isActive
            ? theme.colors.primary
            : color.darken(theme.colors.primary, 0.2)};
        }

        &:focus {
          outline: none;
          background: ${theme.colors.primary};
        }
      }

      .icon {
        width: ${theme.icons.small};
        height: ${theme.icons.small};
        ${spacing.sm('mr')};
        line {
          stroke: ${isActive
            ? theme.colors.primary
            : color.darken(theme.colors.primary, 0.2)};
        }
      }

      .content {
        display: ${isActive ? 'block' : 'none'};
        ${spacing.sm('px')}
        ${spacing.md('pb')}
      }

      &:hover {
        border-color: ${color.darken(theme.colors.primary, 0.5)};
        .trigger .title {
          color: ${color.darken(theme.colors.primary, 0.5)};
        }

        .icon {
          line {
            stroke: ${color.darken(theme.colors.primary, 0.5)};
          }
        }
      }
    `
  }
)

export default StyledAccordion
