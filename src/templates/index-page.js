import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import { motion } from 'framer-motion'
import Content, { HTMLContent } from '../components/Content'
import BackgroundImage from 'gatsby-background-image'
import { GiArrowDunk } from 'react-icons/gi'
import Slider from 'react-slick'
import { useInView } from 'react-intersection-observer'
import { SlideX } from '../components/Animations'
import Gallery from '../components/Gallery'
import Banner from '../components/Banner'
import { v4 } from 'uuid'

// import SessionParallax from '../components/SessionParallax'
// import VerticalTimeline from '../components/VerticalTimeline'
// import useWindowSize from '../components/windowSize'
// import scrollTo from 'gatsby-plugin-smoothscroll'

import Layout from '../components/Layout'
// import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
// import foralEnd from '../img/floral-end.svg'
// import logo from '../img/isjlogo.svg'

// import FitText from '@kennethormandy/react-fittext'

const MobileTimelineItem = ({ item, index }) =>
{
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true })

  return (
    <SlideX animateCondition={inView} amount={'50%'}>
      <Link to={`/sessions/${kebabCase(item.text)}`}>
        <BackgroundImage
          key={item.text}
          className="hero mt-1"
          style={{ minHeight: '20vh' }}
          fluid={item.image.childImageSharp.fluid}
          // eslint-disable-next-line
          style={{ backgroundPosition: index === 1 ? '0% 20%' : 'center' }}
        >
          <div style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} ref={ref}>
            <div className="hero-body">
              <h2 className="is-family-secondary is-size-2 has-text-light p-3">{item.text}</h2>
            </div>
          </div>
        </BackgroundImage>
      </Link>
    </SlideX>
  )
}


export const IndexPageTemplate = ({
  sliderImages,
  timelineImages,
  ieashiaPhoto,
  content,
  contentComponent,
  gallery
}) =>
{
  const PageContent = contentComponent || Content


  const [aboutRef, aboutInView] = useInView({ threshold: 0, triggerOnce: true })
  const [timelineRef, timelineInView] = useInView({ threshold: 0, triggerOnce: true })

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const [activeSlide, setActiveSlide] = useState(0)

  const settings = {
    infinte: true,
    speed: 2000,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "ease-in-out",
    arrows: false,
    dots: false,
    afterChange: current => setActiveSlide(current)
  }

  return (
    <div>
      <div className="touch-landing-container"
      // style={{ minHeight: 'calc(100vh - 5rem)', backgroundImage: 'linear-gradient(to bottom, yellow 50%, transparent)' }}
      >
        <div>
          <Slider {...settings}>
            {sliderImages.map((item, index) => (
              <BackgroundImage
                key={v4()}
                className=""
                fluid={item.image.childImageSharp.fluid}
              >
                <div className="hero is-fullheight-with-navbar is-hidden-touch">
                  <div className="hero-body">
                    <div className="container">
                    </div>
                  </div>
                  <div className="hero-foot is-invisible-mobile">
                    <div className="container">
                      <div className="columns">
                        <div className="column is-6 is-offset-3 has-text-white is-size-5">
                          <motion.div
                            className="p-5 mb-6"
                            style={{}}
                            initial={{ opacity: 0, x: 100 }}
                            animate={activeSlide === index ? { opacity: 1, x: 0, transition: { delay: 0.5, duration: 1 } } : { opacity: 0, x: 100 }}
                          >
                            <p className="is-italic ">"{item.quote}"</p>
                            <cite className="has-text-centered">- {item.author}</cite>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero is-halfheight is-hidden-desktop">
                </div>
              </BackgroundImage>
            ))}
          </Slider>
        </div>
        <div className="is-hidden-desktop" style={{ flexGrow: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="is-size-2 has-text-weight-semibold has-text-centered has-text-primary my-4 is-family-secondary">
            Creating Visual Heirlooms
                </h2>
        </div>
      </div>

      <div className="is-hidden-desktop overflow-x-hidden">

        {timelineImages.map((item, index) => (
          <MobileTimelineItem key={item.text} item={item} index={index} />
        ))}
      </div>

      <div className="is-hidden-touch" ref={timelineRef}>
        <div className="hero linear-gradiant-light">
          <div className="hero-body">
            {/* <div className="is-flex is-justify-content-center"><img src={logo} alt="ISJ Photography" /></div> */}
            <h2 className="is-size-1 has-text-weight-semibold has-text-centered has-text-primary my-4 is-family-secondary">
              Creating Visual Heirlooms
              </h2>
            <p className="has-text-centered is-4">Click on the sessions below to begin exploring them <GiArrowDunk size="2rem" /></p>
            <motion.div className="mt-3" style={{
              position: 'relative',
            }}
              initial="hidden"
              animate={timelineInView ? "visible" : "hidden"}
              variants={variants}
            >

              <div className="columns m-0">
                {timelineImages.map(item => (
                  <motion.div
                    className="column py-0 m-0"
                    variants={itemVariants}
                    key={item.text}
                    style={{
                      margin: '1rem',
                      marginTop: '1.5rem'
                    }}>

                    <Link to={`/sessions/${kebabCase(item.text)}`}>
                      <motion.div
                        // className="card"
                        whileHover={{ scale: 1.1 }}
                        style={{ originY: 0, position: 'relative' }}
                      >
                        <div
                        // className="card-image"
                        // style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                        >
                          {/* <Img fluid={{ ...item.image.childImageSharp.fluid, aspectRatio: 16 / 9 }} /> */}
                          <PreviewCompatibleImage imageInfo={item.image} borderRadius={5} aspectRatio={4 / 3} />
                        </div>
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: '100%', position: 'absolute', width: '100%', top: 0, borderRadius: '5px' }}>
                          <h3
                            className='subtitle is-2 is-family-secondary has-text-white p-2'
                            style={{
                              position: 'absolute',
                              bottom: '0.25rem',
                              left: '0.25rem',
                            }}
                          >
                            {item.text}
                          </h3>
                        </div>
                      </motion.div>
                    </Link>
                    <div className='timeline' style={{ height: '2rem', width: '.125rem', margin: '0 auto' }} />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className='timeline'
                style={{ height: '.125rem', marginLeft: '9.93%' }}
                animate={{ width: timelineInView ? '80.15%' : '0%' }}
                initial={{ width: '0%' }}
                transition={{ duration: 2, delay: 0.4 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      {/* <div className="is-hidden-touch">
        <div className="hero linear-gradiant-light">
          <div className="hero-body">
            <motion.div className="mt-3" style={{
              position: 'relative',
            }}
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              <div className="columns is-multiline">
                {timelineImages.map((item, index) => (
                  <>
                    <motion.div
                      className="column is-4"
                      variants={itemVariants}
                      key={item.text}
                    >
                      <Link to={`/sessions/${kebabCase(item.text)}`}>
                        <motion.div
                          className="card m-3"
                          whileHover={{ scale: 1.1 }}
                          style={{ originY: 0 }}
                        >
                          <div className="card-image">
                            <Img fluid={{ ...item.image.childImageSharp.fluid, aspectRatio: 16 / 9 }} />
                          </div>
                          <div className="card-header">
                            <h3 className='card-header-title is-centered subtitle is-3 is-family-secondary has-text-weight-semibold p-2'>
                              {item.text}
                            </h3>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                    {(index === 0) &&
                      <div className="column is-4 is-flex is-flex-direction-column is-justify-content-center">
                        <h2 className="is-size-1 has-text-weight-semibold has-text-centered has-text-primary my-4 is-family-secondary">
                          Creating Visual Heirlooms
                        </h2>
                        <p className="has-text-centered is-4">Click on the sessions to begin exploring them</p>
                      </div>}
                  </>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div> */}
      <section className="section ">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content" ref={aboutRef}>
                <div className="columns">
                  <div className="column is-4 overflow-x-hidden">
                    <SlideX
                      amount={-200}
                      animateCondition={aboutInView}
                    >
                      <PreviewCompatibleImage imageInfo={ieashiaPhoto} style={{ height: '100%' }} /></SlideX>
                  </div>
                  <div className="column is-8 overflow-x-hidden">
                    <SlideX
                      amount={200}
                      animateCondition={aboutInView}
                    >
                      <PageContent className="content" content={content} />
                      <p className="is-family-secondary is-size-2">Ieashia</p>
                    </SlideX>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section has-background-white-ter">
        <div className="container">
          <div className="is-hidden-touch">
            <Gallery gallery={gallery} desktop={"one-third"} />
          </div>
          <div className="is-hidden-desktop">
            <Gallery gallery={gallery} mobile={"half"} aspectRatio={1} />
          </div>
          <div className="has-text-centered mt-6">

            <Link to="/galleries">
              <button className="button is-light">See more</button>
            </Link>

          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h3 className="has-text-weight-semibold is-size-2 has-text-centered is-family-secondary">
            Latest stories
                  </h3>
          <BlogRoll />
          <div className="has-text-centered">

            <Link to="/blog">
              <button className="button is-light">Read more</button>
            </Link>

          </div>
        </div>
      </section>
      <Banner backgroundColor="white-ter" />
    </div>
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  timelineImages: PropTypes.array
}

const IndexPage = ({ data }) =>
{
  const { html, frontmatter } = data.markdownRemark



  return (
    <Layout>
      <IndexPageTemplate
        // image={frontmatter.image}
        // title={frontmatter.title}
        // heading={frontmatter.heading}
        // subheading={frontmatter.subheading}
        // mainpitch={frontmatter.mainpitch}
        // description={frontmatter.description}
        // intro={frontmatter.intro}
        sliderImages={frontmatter.sliderImages}
        timelineImages={frontmatter.timelineImages}
        ieashiaPhoto={frontmatter.ieashiaPhoto}
        contentComponent={HTMLContent}
        content={html}
        gallery={data.googlePhotosAlbum.photos}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        sliderImages {
          quote
          author
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        timelineImages {
          text
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        ieashiaPhoto {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    googlePhotosAlbum(title: {eq: "Landing"}) {
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
