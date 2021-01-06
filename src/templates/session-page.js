import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { kebabCase } from 'lodash'
// import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Subtitle } from '../components/Styled'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa'
import ScrollLock from 'react-scrolllock'
import BackgroundImage from 'gatsby-background-image'

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

const TestimonialBlock = ({ image, text }) =>
{
  const [offset, setOffset] = useState(0)
  useEffect(() =>
  {
    function handleScroll()
    {
      setOffset(window.pageYOffset)
    }

    window.addEventListener("scroll", handleScroll)

    return () =>
    {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="hero is-large">
      <BackgroundImage
        fluid={image}
        style={{ backgroundPosition: `center ${100 - offset / 15}%` }}
      >
        <div className="hero-body">
          <div className="columns">
            <div className="column is-6 is-offset-3 has-text-white is-italic is-size-5" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              "{text}"
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>

  )
}

export const SessionPageTemplate = ({
  content,
  contentComponent,
  // description,
  // tags,
  title,
  gallery,
  pricing
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


  const mockpricing = {
    description: "I offer packages to suit your needs and budget. Choose from the options below and please get in touch if you’d like anything a little different.",
    tables: [
      {
        title: "Pinnacle",
        image: "GatsbySharpHolder",
        price: "499",
        features: [
          "ahsjahksdjkasd",
          "ajsdklajskldaj ajdhakjshdjasd",
          "ahsjdkhasjkda ahdja jah ah jahk",
          "ahsjdkhasjkda ahdja jah ah jahk",
          "ahsjdkhasjkda ahdja jah ah jahk",
        ]
      },
      {
        title: "Vista",
        image: "GatsbySharpHolder",
        price: "399",
        features: [
          "ahsjahksdjkasd",
          "ajsdklajskldaj ajdhakjshdjasd",
          "ahsjdkhasjkda ahdja jah ah jahk"
        ]
      },
      {
        title: "Signature",
        image: "GatsbySharpHolder",
        price: "299",
        features: [
          "ahsjahksdjkasd",
          "ajsdklajskldaj ajdhakjshdjasd",
          "ahsjdkhasjkda ahdja jah ah jahk"
        ]
      },
    ]
  }

  if (!pricing) { pricing = mockpricing }

  return (
    <>
      <section className="section" style={{ perspective: '2px' }}>
        {/* {helmet || ''} */}
        <div className="container content">
          {/* Intro */}
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
        </div>
      </section>
      {/* Testimonial */}
      <TestimonialBlock text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum ipsum sed iure voluptatibus, quas explicabo dicta expedita, dolorem commodi eos incidunt quidem rem sunt ab autem dolores quasi et error!"
        image={gallery[0].photo.childImageSharp.fluid}
      />
      <section className="section">
        <div className="container content">
          {/* Pricing */}
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <Subtitle>Pricing</Subtitle>
              <p>{pricing.description}</p>
            </div>
          </div>
          <div className="columns">
            {pricing.tables.map((item, index) => (
              <div className="column" key={item.title}>
                <div className={`card has-background-white ${index > 0 && "mt-3"}`}>
                  <header className="card-header">

                    <p className="card-header-title has-text-weight-semibold is-size-3">
                      {item.title}
                    </p>

                  </header>
                  <div className="card-image">
                    <PreviewCompatibleImage imageInfo={gallery[0].photo} borderRadius={0} />
                  </div>

                  <div className="card-content">
                    <p className={`is-size-3 has-text-centered ${index === 0 ? "has-text-primary has-text-weight-bold" : "has-text-weight-semibold"}`}>
                      {Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, }).format(item.price)}
                    </p>
                    <hr />
                    {item.features.map(feature => (
                      <p key={feature}><FaCheck /> {feature}</p>
                    ))}
                    <hr />

                  </div>


                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '100vh' }} />
          {/* Gallery */}
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
        {/* Modal */}
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
    </>
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
        pricing={post.frontmatter.pricing}
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
        pricing {
          description
          tables{
            title
            price
            features
          }

        }
      }
    }
    googlePhotosAlbum(title: {eq: $title}) {
      photos {
        photo {
          id
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
