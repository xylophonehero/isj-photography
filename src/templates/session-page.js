import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import { kebabCase } from 'lodash'
// import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import ScrollLock from 'react-scrolllock'

// const AnimatedPicture = ({ delay, image }) =>
// {

//   const newVarients = {
//     // hidden: { opacity: 0 },
//     visible: {
//       opacity: [0, 1, 0],
//       transition: {
//         duration: 7,
//         delay: delay,
//         repeat: Infinity,
//         repeatDelay: 9
//       }
//     }
//   }

//   return (
//     <motion.div
//       className='mb-5'
//       // style={{ width: '100%', height: '150px', borderRadius: '5px', opacity: 0 }}
//       // initial="hidden"
//       animate="visible"
//       variants={newVarients}
//     >
//       <PreviewCompatibleImage imageInfo={image} aspectRatio={16 / 9} />
//     </motion.div>
//   )
// }

const GalleryModal = ({ setModalActive, activeItem, handleDirectionClick }) =>
{
  return (
    <div className="modal is-active" style={{ position: 'fixed' }}>
      <motion.div
        onClick={() => setModalActive(false)}
        className="modal-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="modal-content is-clipped"
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
      >
        {/* TODO animate left and right images */}
        <motion.div>
          <PreviewCompatibleImage imageInfo={activeItem} />
        </motion.div>
        <div className="is-flex is-justify-content-center">
          <button className="is-large mt-2 gallery-arrow" aria-label="left" onClick={() => handleDirectionClick(-1)}><FaAngleLeft /></button>
          <button className="is-large mt-2 gallery-arrow" aria-label="right" onClick={() => handleDirectionClick(1)}><FaAngleRight /></button>
        </div>
      </motion.div>

      <button className="modal-close is-large" aria-label="close" onClick={() => setModalActive(false)} style={{ position: 'fixed' }} />
    </div>
  )
}

export const SessionPageTemplate = ({
  content,
  contentComponent,
  // description,
  // tags,
  title,
  gallery
  // helmet,
}) =>
{
  const PostContent = contentComponent || Content

  const [modalActive, setModalActive] = useState(false)
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0)

  const handleGalleryClick = (index) =>
  {
    setModalPhotoIndex(index)
    setModalActive(true)
  }

  const handleDirectionClick = (direction) =>
  {
    const maxIndex = gallery.length - 1
    if (direction === -1 && modalPhotoIndex === 0)
    {
      setModalPhotoIndex(maxIndex)
      return;
    }
    if (direction === 1 && modalPhotoIndex === maxIndex)
    {
      setModalPhotoIndex(0)
      return;
    }
    setModalPhotoIndex(modalPhotoIndex + direction)
  }

  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  const galleryItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }

  }

  return (

    <section className="section">
      {/* {helmet || ''} */}
      <div className="container content">
        <div className="columns">
          {/* <div className='column is-3' >
            <div className='movingimagewrapper' >
              <AnimatedPicture delay={8} image={gallery[0].photo} />
              <AnimatedPicture delay={0} image={gallery[1].photo} />
              <AnimatedPicture delay={12} image={gallery[2].photo} />
              <AnimatedPicture delay={4} image={gallery[3].photo} />
            </div>
          </div> */}
          <div className="column is-6 is-offset-3">
            <div className="section">
              <h1 className="title is-size-1 has-text-weight-bold has-text-centered is-family-secondary">
                {title}
              </h1>
              <hr />
              <PostContent content={content} className="has-text-centered is-size-5" />
              <div style={{ height: '100vh' }} />
            </div>

          </div>
          {/* <div className='column is-3' >
            <div className='movingimagewrapper' >
              <AnimatedPicture delay={6} image={gallery[4].photo} />
              <AnimatedPicture delay={14} image={gallery[5].photo} />
              <AnimatedPicture delay={2} image={gallery[6].photo} />
              <AnimatedPicture delay={10} image={gallery[7].photo} />
            </div>
          </div> */}
        </div>
        <motion.div
          ref={galleryRef}
          animate={galleryInView ? 'visible' : ''}
          variants={galleryVariants}
          initial='hidden'
        >

          <h3 className='subtitle is-size-2 has-text-weight-bold has-text-centered is-family-secondary'>Gallery</h3>
          <div className='columns is-multiline'>

            {gallery.map((photo, index) => (
              <div key={photo.photo.id} className='column is-one-quarter-desktop is-half-tablet'>
                <motion.div
                  variants={galleryItemVariants}
                  // className='has-background-primary'
                  style={{ width: '100%' }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleGalleryClick(index)}

                >
                  <PreviewCompatibleImage imageInfo={photo.photo} aspectRatio={16 / 9} />
                </motion.div>
              </div>
            ))}
            {/* {galleryImages.map(item => (
              <div key={item} className='column is-one-quarter-desktop is-half-tablet'>
                <motion.div
                  variants={galleryItemVariants}
                  className='has-background-primary'
                  style={{ width: '100%', height: '200px', borderRadius: '5px' }}>

                </motion.div>
              </div>
            ))} */}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {
          modalActive &&
          <GalleryModal
            setModalActive={setModalActive}
            activeItem={gallery[modalPhotoIndex].photo}
            handleDirectionClick={handleDirectionClick}
          />
        }

      </AnimatePresence>
      <ScrollLock isActive={modalActive} />
    </section >

  )
}

SessionPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  // description: PropTypes.string,
  title: PropTypes.string,
  // helmet: PropTypes.object,
}

const SessionPage = ({ data }) =>
{
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SessionPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        // description={post.frontmatter.description}
        // helmet={
        //   <Helmet titleTemplate="%s | Blog">
        //     <title>{`${post.frontmatter.title}`}</title>
        //     <meta
        //       name="description"
        //       content={`${post.frontmatter.description}`}
        //     />
        //   </Helmet>
        // }
        // tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        gallery={data.googlePhotosAlbum.photos}
      />
    </Layout>
  )
}

SessionPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default SessionPage

export const pageQuery = graphql`
  query SessionPageByID($id: String!, $title: String!) {
    markdownRemark(id: { eq: $id }) {
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
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
