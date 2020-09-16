import React from 'react'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

import CardSection from './CardSection'
import TextSection from './TextSection'
import FullImageSection from './FullImageSection'
import Section from './Section'
import TextImageSplit from './TextImageSplit'
import VideoSection from './VideoSection'
import Tabs from '../elements/Tabs'
import { spacing } from '../../styles/utilities'
import Stagger from '@heydays/animation/Stagger'

const sectionTypes = {
  section: Section,
  cardSection: CardSection,
  textSection: TextSection,
  imageSection: FullImageSection,
  textImageSplit: TextImageSplit,
  carousel: dynamic(() => import('./CarouselSection')),
  tabs: Tabs,
  videoSection: VideoSection
}

const StyledPageBuilder = styled.div`
  .PageBuilder__item {
    ${spacing.section('mt')};
  }
`

const PageBuilder = ({ sections }) => {
  return (
    <StyledPageBuilder>
      <Stagger>
        {sections?.map((section, index) => {
          const Component = sectionTypes[section._type] || null
          return Component ? (
            <div key={section._key} className="PageBuilder__item">
              <Component
                {...section}
                prevComp={sections[index - 1] ? sections[index - 1] : null}
                nextComp={sections[index + 1] ? sections[index + 1] : null}
              />
            </div>
          ) : (
            <p key={section._key} style={{ background: 'yellow' }}>
              Component {section._type} not found
            </p>
          )
        })}
      </Stagger>
    </StyledPageBuilder>
  )
}

export default PageBuilder
