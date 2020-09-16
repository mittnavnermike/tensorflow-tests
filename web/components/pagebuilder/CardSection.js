import React from 'react'
import Grid, { GridItem } from '../elements/Grid'
import Animate from '@heydays/animation/Animate'

import Card from '../elements/Card'
import LinkResolver from '@heydays/LinkResolver'

const CardSection = ({ title, seeAllLink, cardsList = [], ...props }) => {
  return (
    <div className="CardSection">
      {title && <h2>{title}</h2>}
      <Grid gap={true}>
        {cardsList.map(card => {
          const { content, cardOverride } = card
          return (
            <GridItem span={{ xs: 12, md: 4 }} key={card?._key}>
              <Animate>
                <Card
                  title={cardOverride?.title || content?.title}
                  image={cardOverride?.image || content?.mainImage}
                  excerpt={cardOverride?.content || content?.excerpt}
                  link={cardOverride?.link || content}
                />
              </Animate>
            </GridItem>
          )
        })}
      </Grid>
      {seeAllLink && (
        <LinkResolver link={seeAllLink}>
          {seeAllLink?.title || seeAllLink?.reference?.title}
        </LinkResolver>
      )}
    </div>
  )
}

export default CardSection
