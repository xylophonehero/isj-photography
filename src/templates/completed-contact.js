import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


const CompletedContact = ({ data }) =>
{
  const PostContent = HTMLContent || Content

  const { image } = data.markdownRemark.frontmatter
  const content = data.markdownRemark.html

  return (
    <Layout>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h2 className="title is-size-1 has-text-weight-bold has-text-centered is-family-secondary">Contact me</h2>
              <hr />

              <div className="columns">
                <div className="column">
                  <PreviewCompatibleImage imageInfo={image} />
                </div>
                <div className="column">
                  <PostContent content={content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>)
}

export default CompletedContact

export const completedContactPageQuery = graphql`
  query CompletedContact{
    markdownRemark(frontmatter: {templateKey: {eq: "completed-contact"}}){
      html
      frontmatter {
        image{
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`