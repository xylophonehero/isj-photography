import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Banner from '../components/Banner'

export const AboutPageTemplate = ({ title, content, contentComponent }) =>
{
  const PageContent = contentComponent || Content

  return (
    <>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">

              <h2 className="title is-size-1 has-text-weight-bold is-family-secondary has-text-centered">
                {title}
              </h2>
              <hr />
              <PageContent className="content" content={content} />
              {/* <p className="is-family-secondary is-size-2">Ieashia</p> */}


            </div>
          </div>
        </div>
      </section>
      <Banner backgroundColor="white-ter" />
    </>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) =>
{
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
