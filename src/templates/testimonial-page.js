import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
// import Content, { HTMLContent } from '../components/Content'

export const TestimonialPageTemplate = ({ description, testimonials }) =>
{


  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-1 has-text-weight-bold has-text-centered is-family-secondary">
                Testimonials
              </h2>
              <hr />
              <div className="content">
                <p>{description}</p>
              </div>
              <div className="columns is-multiline">
                {testimonials.map(testimonial => (
                  <div key={testimonial.author} className="column is-half-tablet">
                    <div className="card has-background-light" key={testimonial.author}>
                      <div className="card-content">
                        <div className="columns is-desktop">

                          <div className="column">
                            <PreviewCompatibleImage imageInfo={testimonial.image} />
                            <p className="title is-4 is-hidden-widescreen mt-2">{testimonial.author}</p>
                          </div>

                          <div className="column content">
                            <p className="title is-4 is-hidden-touch is-hidden-desktop-only">{testimonial.author}</p>
                            <p className="is-italic">"{testimonial.quote}"</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        description={frontmatter.description}
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
      frontmatter {
        description
        testimonials{
          author
          quote
          image {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
