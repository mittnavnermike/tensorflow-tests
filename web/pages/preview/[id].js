import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import client, { getPreview } from 'lib/sanity'

import TemplateResolver from '@heydays/TemplateResolver'
import Head from 'next/head'

// Might be something to cathc from here:
// https://henrique.codes/gatsby-live-preview-sanity/

export const getServerSideProps = async ({ params, preview = false }) => {
  const data = await getPreview(params)
  return {
    props: { data: data[0] } // will be passed to the page component as props
  }
}

const Preview = ({ className, data }) => {
  return (
    <div className={className}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="Preview">
        <div className="Preview__content">
          {data && <TemplateResolver page={data} />}
        </div>
      </div>
    </div>
  )
}

export default styled(Preview)(({ theme }) => css``)
