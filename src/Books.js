import React, { Suspense } from 'react'
import Img from './Img'

// const Img = React.lazy(() => import('./Img'));

export default function Books({ content }) {
  return (
    <React.ConcurrentMode>
      <React.Fragment>
        <h1>Book Gallery</h1>
        <p>{content.name}</p>
        <Suspense maxDuration={100} fallback={<div>Loading Image...</div>}>
          <Img src={content.image} alt={content.name} />
        </Suspense>
      </React.Fragment>
    </React.ConcurrentMode>
  )
}
