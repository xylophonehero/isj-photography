import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

const CompletedContact = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <section className="section section--gradient">
        <div className="container content">
          <h1 className="title is-size-1 has-text-weight-bold is-family-secondary has-text-centered">
            {frontmatter.title}
          </h1>
          <hr />
          <p>{frontmatter.description}</p>
          <div className="is-flex is-flex-direction-column is-align-items-center">
            <video className="mt-4" width="100%" controls>
              <source src="/img/christmas-video.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
            <a
              className="mt-4"
              href="https://isjphotography.bigcartel.com/product/the-complete-christmas-experience-2021"
            >
              <button className="button is-light">
                {frontmatter.linkText}
              </button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CompletedContact

export const completedContactPageQuery = graphql`
  query Christmas {
    markdownRemark(frontmatter: { templateKey: { eq: "christmas" } }) {
      frontmatter {
        title
        description
        linkText
      }
    }
  }
`
