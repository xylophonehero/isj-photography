import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Banner from '../components/Banner'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

export const BlogPostTemplate = ({
  id,
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  slug,
}) =>
{
  const PostContent = contentComponent || Content

  const disqusConfig = {
    url: `https://isjphotography.com${slug}`,
    identifier: id,
    title: title,
  }

  return (
    <>
      <section className="section">
        {helmet || ''}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-1 has-text-weight-bold is-bold-light has-text-centered is-family-secondary">
                {title}
              </h1>
              {/* <p>{description}</p> */}
              <PostContent className="convert-images" content={content} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map((tag) => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <CommentCount config={disqusConfig} placeholder={'...'} />

              <Disqus config={disqusConfig} />
            </div>
          </div>

        </div>
      </section>
      <Banner backgroundColor="white-ter" />
    </>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) =>
{
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        slug={post.fields.slug}
        id={post.id}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields{
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
