import React from 'react'
import PropTypes from 'prop-types'
// import { v4 } from 'uuid'
// import { graphql } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import useWindowDimensions from '../hooks/useWindowDimensions'

const TestimonialCard = ({ testimonial, alt }) => 
{
  const { width } = useWindowDimensions()

  return (
    <>
      { alt === true && width > 768 ?
        <div className="card has-background-light mb-5">
          <div className="card-content">
            <div className="media is-align-items-center">
              <div className="media-left">
                <div style={{ width: '200px' }}>
                  <PreviewCompatibleImage imageInfo={testimonial.image} aspectRatio={16 / 9} />
                </div>
              </div>
              <div className="media-content">
                <p className="title is-4">{testimonial.author}</p>
                <p className="subtitle is-6">{testimonial.location}</p>
              </div>
            </div>
            <hr />
            <div className="content">
              <cite>"{testimonial.quote}"</cite>
            </div>
          </div>
        </div>
        :
        <div className="card has-background-light mb-6">
          <div className="card-content">
            <div className={`${testimonial.quote.length > 500 && "columns"} is-desktop`}>

              <div className="column">
                <PreviewCompatibleImage imageInfo={testimonial.image} aspectRatio={16 / 9} />
                <p className="title is-4 is-hidden-widescreen mt-2">{testimonial.author + " from " + testimonial.location}</p>
                {/* <p className="is-hidden-widescreen">{testimonial.location}</p> */}
              </div>

              <div className="column">
                <p className="title is-4 is-hidden-touch is-hidden-desktop-only">{testimonial.author + " from " + testimonial.location}</p>
                {/* <p className="is-hidden-touch is-hidden-desktop-only">{testimonial.location}</p> */}
                <cite>"{testimonial.quote}"</cite>
              </div>
            </div>

          </div>
        </div>
      }
    </>
  )
}

TestimonialCard.propTypes = {
  testimonials: PropTypes.shape({
    quote: PropTypes.string,
    author: PropTypes.string,
  })
  ,
}

export default TestimonialCard