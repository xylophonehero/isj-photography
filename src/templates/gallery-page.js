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

// const GalleryModal = ({ setModalActive, activeItem, handleDirectionClick }) =>
// {
//   return (
//     <div className="modal is-active" style={{ position: 'fixed' }}>
//       <motion.div
//         onClick={() => setModalActive(false)}
//         className="modal-background"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       />
//       <motion.div
//         className="modal-content is-clipped"
//         initial={{ opacity: 0, y: 100, scale: 0.5 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         exit={{ opacity: 0, y: 100, scale: 0.5 }}
//       >
//         {/* TODO animate left and right images */}
//         <motion.div>
//           <PreviewCompatibleImage imageInfo={activeItem} />
//         </motion.div>
//         <div className="is-flex is-justify-content-center">
//           <button className="is-large mt-2 gallery-arrow" aria-label="left" onClick={() => handleDirectionClick(-1)}><FaAngleLeft /></button>
//           <button className="is-large mt-2 gallery-arrow" aria-label="right" onClick={() => handleDirectionClick(1)}><FaAngleRight /></button>
//         </div>
//       </motion.div>

//       <button className="modal-close is-large" aria-label="close" onClick={() => setModalActive(false)} style={{ position: 'fixed' }} />
//     </div>
//   )
// }


export const GalleryPageTemplate = ({
  title,
  gallery,
  content,
  contentComponent
}) =>
{

  const PostContent = contentComponent || Content

  // const [modalActive, setModalActive] = useState(false)
  // const [modalPhotoIndex, setModalPhotoIndex] = useState(0)

  // const handleGalleryClick = (index) =>
  // {
  //   setModalPhotoIndex(index)
  //   setModalActive(true)
  // }

  // const handleDirectionClick = (direction) =>
  // {
  //   const maxIndex = gallery.length - 1
  //   if (direction === -1 && modalPhotoIndex === 0)
  //   {
  //     setModalPhotoIndex(maxIndex)
  //     return;
  //   }
  //   if (direction === 1 && modalPhotoIndex === maxIndex)
  //   {
  //     setModalPhotoIndex(0)
  //     return;
  //   }
  //   setModalPhotoIndex(modalPhotoIndex + direction)
  // }

  // const galleryVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // }
  // const galleryItemVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 }

  // }

  return (
    <>
      <section className="section">
        <div className="container">
          <Title>{`${title} Gallery`}</Title>
          <hr />
          <PostContent content={content} className="has-text-centered is-size-5" />
          {/* Gallery */}
          <Gallery gallery={gallery} />

        </div>
      </section>
      <div className="hero has-background-white-ter mt-6">
        <div className="hero-body has-text-centered">
          <p className="is-size-4 pb-3">Contact me to chat about your photoshoot.</p>
          <Link to="/contact"><button className="button is-primary">Contact me</button></Link>
        </div>
      </div>
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