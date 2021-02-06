import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { v4 } from 'uuid'
import Layout from '../components/Layout'
// import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
// import Content, { HTMLContent } from '../components/Content'
import TestimonialCard from '../components/TestimonialCard'

export const TestimonialPageTemplate = ({ description, testimonials }) =>
{


  return (
    <section className="section section--gradient">
      <div className="container">


        <h2 className="title is-size-1 has-text-weight-bold has-text-centered is-family-secondary">
          Testimonials
              </h2>
        <hr />
        <div className="content">
          <p>{description}</p>
        </div>
        <div className="columns is-multiline">
          {testimonials.map(testimonial => (
            <div key={v4()} className={`column ${testimonial.quote.length < 500 ? "is-half-tablet" : "is-full"}`}>
              <TestimonialCard testimonial={testimonial} alt={false} />
            </div>
            // <div key={testimonial.author + testimonial.location} className="card has-background-light mb-6">
            //   <div className="card-content">
            //     <div className="columns is-desktop">

            //       <div className="column">
            //         <PreviewCompatibleImage imageInfo={testimonial.image} />
            //         <p className="title is-4 is-hidden-widescreen mt-2">{testimonial.author}</p>
            //         <p className="is-hidden-widescreen">{testimonial.location}</p>
            //       </div>

            //       <div className="column content">
            //         <p className="title is-4 is-hidden-touch is-hidden-desktop-only">{testimonial.author}</p>
            //         <p className="is-hidden-touch is-hidden-desktop-only">{testimonial.location}</p>
            //         <p className="is-italic">"{testimonial.quote}"</p>
            //       </div>
            //     </div>

            //   </div>
            // </div>

          ))}
        </div>


      </div>
    </section >
  )
}

TestimonialPageTemplate.propTypes = {
  description: PropTypes.string,
  testimonials: PropTypes.array
}

const TestimonialPage = ({ data }) =>
{
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <TestimonialPageTemplate
        description={data.markdownRemark.html}
        testimonials={frontmatter.testimonials}
      />
    </Layout>
  )
}

TestimonialPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TestimonialPage

export const testimonialPageQuery = graphql`
  query TestimonialPage {
    markdownRemark(frontmatter: { templateKey: { eq: "testimonial-page" } }) {
      html
      frontmatter {
        testimonials{
          author
          location
          quote
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
