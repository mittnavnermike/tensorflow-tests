import React from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Switch from '@heydays/Switch'
import Container from './elements/Container'

const Header = ({ className, isDark, setIsDark }) => {
  return (
    <Container>
      <div className={className}>
        <h1>
          <Link href="/">
            <a>NEXT STARTER</a>
          </Link>
        </h1>
        <Switch
          size={60}
          state={isDark}
          onClick={() => setIsDark(prevState => !prevState)}
        />
      </div>
    </Container>
  )
}

export default styled(Header)(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
)
