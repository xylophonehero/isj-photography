import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import { kebabCase } from 'lodash'
// import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { v4 } from 'uuid'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Subtitle } from '../components/Styled'
import Accordian from '../components/Accordian'
import TestimonialCard from '../components/TestimonialCard'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa'
// import ScrollLock from 'react-scrolllock'
import BackgroundImage from 'gatsby-background-image'

import HTMLBlock from '../components/Transform'

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

const TestimonialBlock = ({ image, text, author }) =>
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
            <div className="column is-6 is-offset-3 has-text-white is-size-5" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <p className="is-italic ">"{text}"</p>
              <p className="has-text-centered">{author}</p>
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
  pricings,
  testimonials,
  faqs,
  howItWorks

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
  const featuredTestimonial = testimonials.find(x => x.featured)

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
      <TestimonialBlock
        text={featuredTestimonial.quote}
        author={featuredTestimonial.author + " - " + featuredTestimonial.location}
        image={featuredTestimonial.image.childImageSharp.fluid}
      />

      <section className="section">
        <div className="container content">
          {/* How it works */}
          <Subtitle>How it works</Subtitle>
          <HTMLBlock content={howItWorks} />
          {/* Pricing */}
          <Subtitle>Pricing</Subtitle>
          {pricings.map(pricing => (
            <>
              <HTMLBlock content={pricing.description} />
              {/* {pricing.description.split("\n").map(item => <p key={item}>{item}</p>)} */}
              <div className="columns">
                {pricing.tables.map((item, index) => (
                  <div className={`column is-one-third ${pricing.tables.length === 1 && "is-offset-4"}`} key={item.title}>
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
                        {item.features?.map(feature => (
                          <p key={feature}><FaCheck /> {feature}</p>
                        ))}
                        <hr />
                      </div>
                    </div>
                  </div>
                ))}

              </div>
              {!!pricing.afterDescription && <HTMLBlock content={pricing.afterDescription} />}
            </>
          ))}
          {/* {!!secondPricing &&
            <>
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div dangerouslySetInnerHTML={{ __html: Transform(secondPricing.description) }} />
                </div>
              </div>
              <div className="columns">
                {secondPricing.tables.map((item, index) => (
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
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <p dangerouslySetInnerHTML={{ __html: secondPricing.afterDescription }} />
                </div>
              </div>
            </>} */}
          <div className="hero has-background-light">
            <div className="hero-body has-text-centered">
              <p className="is-size-4 pb-3">Contact me to chat about your photoshoot.</p>
              <Link to="/contact"><button className="button is-primary">Contact me</button></Link>
            </div>
          </div>
          {/* FAQs */}
          <Subtitle>FAQs</Subtitle>
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <Accordian data={faqs} />
            </div>
          </div>
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
                    style={{ width: '100%', cursor: 'pointer' }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleGalleryClick(index)}

                  >
                    <PreviewCompatibleImage imageInfo={photo.photo} aspectRatio={16 / 9} />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Testimonials */}
        {testimonials.length > 1 &&
          <>
            <Subtitle>Testimonials</Subtitle>
            <div className="columns is-multiline">
              {testimonials.filter(x => x.featured !== true).map(testimonial => (
                <div className="column is-half-tablet">
                  <TestimonialCard key={v4()} testimonial={testimonial} alt={true} />
                </div>
              ))}
            </div>
          </>}
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
        {/* <ScrollLock isActive={modalActive} /> */}
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
  const testimonials = data.allMarkdownRemark.nodes[0].frontmatter.testimonials.filter(x => x.tag === post.frontmatter.title)
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
        pricings={post.frontmatter.pricings}
        // secondPricing={post.frontmatter.secondPricing}
        testimonials={testimonials}
        faqs={post.frontmatter.faqs}
        howItWorks={post.frontmatter.howItWorks}
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
        howItWorks
        pricings {
          description
          tables{
            title
            price
            features
          }
          afterDescription
        }
        # secondPricing {
        #   description
        #   tables{
        #     title
        #     price
        #     features
        #   }
        #   afterDescription
        # }
        faqs{
          question
          answer
        }
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
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "testimonial-page"}}}) {
      nodes {
        frontmatter {
          testimonials {
            author
            tag
            featured
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            location
            quote
          }
        }
      }
    }
  }
`
