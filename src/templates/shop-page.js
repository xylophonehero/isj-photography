import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ShopPageTemplate = ({ title, content, contentComponent, image }) =>
{
  const PageContent = contentComponent || Content
  console.log(image.childImageSharp)
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-1 has-text-weight-bold is-family-secondary has-text-centered">
                {title}
              </h2>
              <hr />
              <PreviewCompatibleImage imageInfo={image} />
              <div className="my-6 has-text-centered">
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ShopPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ShopPage = ({ data }) =>
{
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ShopPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        image={post.frontmatter.image}
      />
    </Layout>
  )
}

ShopPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ShopPage

export const shopPageQuery = graphql`
  query ShopPage {
    markdownRemark(frontmatter: { templateKey: { eq: "shop-page" } }) {
      html
      frontmatter {
        title
        image {
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
