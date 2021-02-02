import React from 'react';
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
// import { motion, AnimatePresence } from 'framer-motion'
// import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { Title } from '../components/Styled'
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import Gallery from '../components/Gallery'
import Banner from '../components/Banner'
import { kebabCase } from 'lodash'

export const GalleryPageTemplate = ({
  title,
  to,
  gallery,
  content,
  contentComponent
}) =>
{

  const PostContent = contentComponent || Content

  return (
    <>
      <section className="section">
        <div className="container">
          <Title>{`${title} Gallery`}</Title>
          <hr />
          <PostContent content={content} className="has-text-centered is-size-5" />
          {/* Gallery */}
          <Gallery gallery={gallery} aspectRatio={4 / 3} objectPosition={title === 'Headshots' ? "30%" : 'center'} />

        </div>
        {to !== "Coming soon" && <div className="has-text-centered mt-5">
          <Link to={`/sessions/${!!to ? to : kebabCase(title)}`}>
            <button className="button is-primary">More Info and Pricing</button>
          </Link>
        </div>}
      </section>
      <Banner backgroundColor="white-ter" />
    </>
  )
}

GalleryPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  gallery: PropTypes.array
}


const GalleryPage = ({ data }) =>
{
  const post = data.markdownRemark
  const gallery = data.googlePhotosAlbum.photos

  return (
    <Layout>
      <GalleryPageTemplate
        title={post.frontmatter.title}
        to={post.frontmatter.to}
        gallery={gallery}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
}

GalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
    googlePhotosAlbum: PropTypes.object
  })
}

export default GalleryPage;

export const pageQuery = graphql`
  query GalleryPageByID($id: String!, $title: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      frontmatter {
        title
        to
      }
    }
    googlePhotosAlbum(title: {eq: $title}) {
      photos {
        photo {
          id
          childImageSharp {
            fluid(maxWidth: 1024, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`