import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { bp, spacing, color, remSize } from '../../styles/utilities'

const defaultOptions = {
  // groupCells: true,
  // freeScroll: false,
  wrapAround: false,
  // imagesLoaded: false,
  // lazyLoad: false,
  // contain: true,
  pageDots: true,
  prevNextButtons: false,
  adaptiveHeight: true
}

const Carousel = ({
  className,
  children,
  options = defaultOptions,
  customButtons = true
}) => {
  const [flkty, setFlkty] = useState(null)
  const container = useRef(null)

  // Init
  useLayoutEffect(() => {
    if (!flkty) {
      import('flickity').then(res => {
        const flickity = res.default
        // flickity('next')
        if (container?.current) {
          setFlkty(
            new flickity(container.current, {
              ...options,
              initialIndex: 0 // set index of default slide
            })
          )
        }
      })
    }
  }, [options, children, flkty])

  // Prevent vertical scrolling when swiping
  useLayoutEffect(() => {
    function touchStart(e) {
      this.firstClientX = e.touches[0].clientX
      this.firstClientY = e.touches[0].clientY
    }

    function preventTouch(e) {
      const minValue = 3 // threshold

      this.clientX = e.touches[0].clientX - this.firstClientX
      this.clientY = e.touches[0].clientY - this.firstClientY

      // Vertical scrolling does not work when you start swiping horizontally.
      if (Math.abs(this.clientX) > minValue) {
        e.preventDefault()
        e.returnValue = false
        return false
      }
    }
    if (flkty) {
      // console.log('TCL: Carousel -> flkty', flkty)
      // flkty.on('dragStart', this.handleDrag)
      // flkty.on('dragEnd', this.handleDrag)
    }
    const wrapper = container?.current
    if (wrapper) {
      wrapper.addEventListener('touchstart', touchStart, {
        passive: true
      })
      wrapper.addEventListener('touchmove', preventTouch, {
        passive: false
      })
    }

    return () => {
      if (container?.current) {
        wrapper.removeEventListener('touchstart', touchStart)
        wrapper.removeEventListener('touchmove', preventTouch, {
          passive: false
        })
      }
    }
  }, [children, options, flkty, container])

  return (
    <div className={className}>
      <div ref={container} id="hello">
        {children.map((child, index) => (
          <figure key={child?.props?.node?._key} className="item">
            {React.cloneElement(child, {
              flkty,
              index
            })}
          </figure>
        ))}
      </div>
      {customButtons && container && flkty && (
        <CustomButtons flkty={flkty} children={children} />
      )}
    </div>
  )
}

const CustomButtons = ({ flkty, children }) => {
  const [index, setIndex] = useState(flkty?.selectedIndex)
  const prevButton = useRef(null)
  const nextButton = useRef(null)

  useEffect(() => {
    flkty.on('change', i => setIndex(i))
  }, [flkty])

  // Navigation
  useLayoutEffect(() => {
    const handlePrev = () => flkty.select(index - 1)
    const handleNext = () => flkty.select(index + 1)

    const pButton = prevButton?.current
    const nButton = nextButton?.current

    if (pButton && nButton) {
      pButton.addEventListener('click', handlePrev)
      nButton.addEventListener('click', handleNext)
    }

    return () => {
      if (pButton && nButton) {
        pButton.removeEventListener('click', handlePrev)
        nButton.removeEventListener('click', handleNext)
      }
    }
  }, [prevButton, nextButton, flkty, index])

  return (
    <Navigation flkty={flkty} index={index} children={children}>
      index: {index}
      <button
        ref={prevButton}
        aria-label="Previous"
        className="Navigation__button Navigation__button--prev"
      >
        prev
      </button>
      <button
        ref={nextButton}
        aria-label="Next"
        className="Navigation__button Navigation__button--next"
      >
        next
      </button>
    </Navigation>
  )
}

const Navigation = styled.div(
  ({ theme, flkty, index, children }) => css`
    .Navigation__button {
      height: ${flkty?.viewport?.getBoundingClientRect()?.height}px;
      position: absolute;
      top: 0;
      background: ${theme?.colors?.background};
      transition: ${theme?.transition?.fast};
      z-index: 9;

      &:active {
        transform: translateX(-20px);
      }

      &--prev {
        left: 0;
        opacity: ${index < 1 ? 0 : 1};
        pointer-events: ${index < 1 ? 'none' : 'auto'};
      }

      &--next {
        right: 0;
        opacity: ${index < children.length + 1 ? 1 : 0};
        pointer-events: ${index < children.length + 1 ? 'auto' : 'none'};
      }
    }
  `
)

export default styled(Carousel)(
  ({ theme }) => css`
    position: relative;
    max-width: 100%;


    /*! Flickity v2.1.2 https://flickity.metafizzy.co
    ---------------------------------------------- */

    .flickity-enabled {
      position: relative;
    }

    .flickity-enabled:focus {
      outline: none;
    }

    .flickity-viewport {
      overflow: hidden;
      position: relative;
      height: 100%;

      .is-selected {
        opacity: 1;
      }
    }

    .flickity-slider {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    /* draggable */

    .flickity-enabled.is-draggable {
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    .flickity-enabled.is-draggable .flickity-viewport {
      /* cursor: move;
      cursor: -webkit-grab; */
      cursor: grab;
    }

    .flickity-enabled.is-draggable .flickity-viewport.is-pointer-down {
      cursor: grabbing;
    }

    /* ---- flickity-button ---- */

    .flickity-button {
      /* display: none; */
      position: absolute;
      z-index: 2;
      background: ${theme.colors.secondary};
      border: none;
      color: ${theme.colors.text};

      ${spacing.md('p')};

      svg {
        display: none;
      }

      ${bp.above.md`
        display: block;
      `};
    }

    .flickity-button:hover {
      /* background: white; */
      cursor: pointer;
    }

    .flickity-button:focus {
      outline: none;
      box-shadow: 0 0 0 5px #19f;
    }

    .flickity-button:active {
      margin-left: ${remSize(10)};
    }

    .flickity-button:disabled {
      opacity: 0;
      cursor: auto;
      /* prevent disabled button from capturing pointer up event. #716 */
      pointer-events: none;
    }

    .flickity-button-icon {
      fill: black;
    }

    /* ---- previous/next buttons ---- */

    .flickity-prev-next-button {
      top: 50%;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      /* vertically center */
      transform: translateY(-50%);
      transition: ${theme.trans.fast};
      color: ${theme.colors.text};

      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${theme.colors.primary};
      }
    }

    .flickity-prev-next-button.next {
      right: 0;
      left: auto;

      &:after {
        content: '\\2192';
        display: block;
      }
    }
    .flickity-prev-next-button.previous {
      left: 0;

      &:after {
        content: '\\2190';
        display: block;
      }
    }

    /* right to left */
    .flickity-rtl .flickity-prev-next-button.previous {
      left: auto;
      right: 10px;
    }
    .flickity-rtl .flickity-prev-next-button.next {
      right: auto;
      left: 10px;
    }

    .flickity-prev-next-button .flickity-button-icon {
      position: absolute;
      left: 30%;
      top: 30%;
      width: 40%;
      height: 40%;
    }

    .item {
      width: 80%;
      opacity: .5;

      &.is-selected {
        opacity: 1;
      }
    }

    /* ---- page dots ---- */

    .flickity-page-dots {
      display: flex;
      justify-content: center;
    }

    .flickity-page-dots .dot {
      cursor: pointer;

      ${spacing.md('py')}
      ${spacing.xs('mx')}
      width: ${remSize(50)};

      &:before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 2px;
        background: orange;
        transition: ${theme.trans.fast};
      }

      &:hover {
        &:before {
          background: ${color.darken(theme.colors.text, 0.2)};
        }
      }

      &.is-selected {
        &:before {
          background: ${theme.colors.text};
        }
      }
    }

    /* .flickity-slider .gatsby-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    } */
  `
)
