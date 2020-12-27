import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
// import PreviewCompatibleImage from './PreviewCompatibleImage'

const Testimonials = ({ testimonials }) => (
  <div className="columns">
    {testimonials.map((testimonial) => (
      // <article key={v4()} className="message">
      //   <div className="message-body">
      //     {testimonial.quote}
      //     <br />
      //     <cite> – {testimonial.author}</cite>
      //   </div>
      // </article>
      <div key={v4()} className="is-one-third">
        <div className="card m-4" style={{ maxWidth: '300px' }}>
          <div className="card-image">
            <div className="has-background-primary" style={{ width: '300px', height: '200px' }}></div>
            {/* <PreviewCompatibleImage /> */}
          </div>
          <div className="card-content">
            <div className="content">
              {testimonial.quote}
              <br />
              <cite> - {testimonial.author}</cite>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default Testimonials
