import React, { useRef, useLayoutEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import useMediaQuery from '../hooks/useMediaQuery'
import useWindowSize from '../hooks/useWindowSize'
import { breakpoints } from '../../styles/themes'

const StyledAspectContainer = styled.div`
  position: relative;
  .AspectContainer__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  .AspectContainer__content {
    display: flex;
    width: 100%;
    min-height: 100%;
  }
`

const AspectContainer = ({
  aspects = { xs: 1 },
  aspect,
  preventOverflow = true,
  maxHeight,
  children,
  className
}) => {
  const media = useMediaQuery()
  const { innerHeight, innerWidth } = useWindowSize({ debounce: 100 })
  const contentEl = useRef(null)
  const wrapperEl = useRef(null)
  const [currentRatio, setCurrentRatio] = useState(1)

  // Compute a full set of ratios based on breakpoints
  const computeRatios = () => {
    let calculatedRatios = {}
    let prevRatio = aspects[Object.keys(breakpoints)[0]]
    for (const bp of Object.keys(breakpoints)) {
      // If "ratio" and not "ratios" is set, override all values with "ratio"
      if (aspect) {
        calculatedRatios[bp] = aspect
      } else {
        if (aspects[bp] !== undefined) {
          calculatedRatios[bp] = aspects[bp]
          prevRatio = aspects[bp]
        } else {
          calculatedRatios[bp] = prevRatio
        }
      }
    }
    return calculatedRatios
  }

  // Create a memo to prevent unwanted recalculation of ratios
  const memoizedRatios = useMemo(computeRatios, [aspect, aspects])

  // Prevent container from being smaller than it's content
  const setWrapperMinHeight = () => {
    if (contentEl) {
      // Unset the container min height to make sure we get correct actual height
      // useState(minHeight, setMinHeight) is NOT an option
      wrapperEl.current.style.minHeight = ''
      // Get wrapper and content heights
      const wrapperHeight = wrapperEl.current.getBoundingClientRect().height
      const contentHeight = contentEl.current.getBoundingClientRect().height
      // Set minHeight for wrapper
      if (contentHeight >= wrapperHeight) {
        wrapperEl.current.style.minHeight = `${contentHeight}px`
      }
    }
  }

  // Calculate ratio based on breakpoint
  const calculateNewRatio = () => {
    if (memoizedRatios[media] !== undefined) {
      setCurrentRatio(memoizedRatios[media])
    }
  }

  // Recalculate container overflow
  /*
  Recalculating when child is added is not 100% reliable
  might be because it's fired before the child is fully rendered
  */
  useLayoutEffect(() => {
    if (children && preventOverflow) {
      setWrapperMinHeight()
    }
  }, [innerHeight, innerWidth, preventOverflow, children, currentRatio])

  // Get ratio based on breakpoint
  useLayoutEffect(calculateNewRatio, [media])

  return (
    <StyledAspectContainer
      className={className}
      style={{
        maxHeight
      }}
      ref={wrapperEl}
      hasRatio={currentRatio !== false}
    >
      <div
        style={{
          paddingTop: currentRatio !== false ? `${currentRatio * 100}%` : null
        }}
      />
      {children && (
        <div className="AspectContainer__container">
          <div className="AspectContainer__content" ref={contentEl}>
            {children}
          </div>
        </div>
      )}
    </StyledAspectContainer>
  )
}

export default AspectContainer
