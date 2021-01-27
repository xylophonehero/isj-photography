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
    autoplaySpeed: 10000,
    cssEase: "ease-in-out",
    afterChange: current => setActiveSlide(current)
  }

  // const timelinePoints = {
  //   height: '2rem',
  //   width: '2rem',
  //   left: '.5rem',
  //   position: 'absolute',
  //   backgroundColor: 'black',
  //   border: 'solid black .25rem',
  //   borderRadius: '1rem',
  //   transform: 'translateY(-30px)'

  // }

  // const [sessionInView, setSessionInView] = useState('')
  // const handleNewSessionInView = (target) =>
  // {
  //   setSessionInView(kebabCase(target))
  // }
  // const windowSize = useWindowSize()
  // const { scrollY } = useViewportScroll()
  // const ballPosition = useTransform(scrollY, [200, windowSize.height * 4], [windowSize.height * 0.05, windowSize.height * 0.65])

  return (
    <div>
      <div>
        <Slider {...settings}>
          {timelineImages.map((item, index) => (
            <BackgroundImage
              key={item.text}
              className=""
              fluid={item.image.childImageSharp.fluid}
            >
              <div className="hero is-fullheight-with-navbar">
                <div className="hero-body">
                  <div className="container">
                    {/* <img src={logo} alt="ISJ Photography" style={{ margin: 'auto' }} /> */}
                    {/* <div className="columns" style={{ height: '50vh' }}>
                      <div className="column is-6 is-offset-3 has-text-white is-size-5 is-flex is-justify-content-flex-end is-flex-direction-column">
                        <motion.div
                          className="p-5 mb-5"
                          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                          initial={{ opacity: 0, x: 100 }}
                          animate={activeSlide === index ? { opacity: 1, x: 0, transition: { delay: 0.5, duration: 1 } } : { opacity: 0, x: 100 }}
                        >
                          <p className="is-italic ">"{item.text}"</p>
                          <p className="has-text-centered">{"Nick"}</p>
                        </motion.div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="hero-foot is-invisible-mobile">
                  <div className="container">
                    <div className="columns">
                      <div className="column is-6 is-offset-3 has-text-white is-size-5">
                        <motion.div
                          className="p-5 mb-6"
                          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                          initial={{ opacity: 0, x: 100 }}
                          animate={activeSlide === index ? { opacity: 1, x: 0, transition: { delay: 0.5, duration: 1 } } : { opacity: 0, x: 100 }}
                        >

                          <p className="is-italic ">"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem exercitationem sapiente excepturi rem esse odit ipsa facilis asperiores nobis enim quos, voluptatum voluptates consectetur voluptas et labore consequatur ut eos."</p>
                          <p className="has-text-centered">{"Nick"}</p>
                        </motion.div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </BackgroundImage>
          ))}
        </Slider>
      </div>

      <div className="is-hidden-desktop overflow-x-hidden">
        {timelineImages.map((item, index) => (
          <MobileTimelineItem key={item.text} item={item} index={index} />
        ))}
      </div>

      {/* <section className="is-hidden-desktop  section section--gradient">
        <div className="columns is-mobile mt-5" >

          <div className="column is-2 p-0">
            <VerticalTimeline sessionInView={sessionInView} foralEnd={foralEnd} />
          </div>
          <div className="column is-10">
            <div className="container">

              <SessionParallax title="Engagement" handleSessionInView={handleNewSessionInView} />
              <SessionParallax title="Weddings" handleSessionInView={handleNewSessionInView} />
              <SessionParallax title="Maternity" handleSessionInView={handleNewSessionInView} />
              <SessionParallax title="Newborns" handleSessionInView={handleNewSessionInView} />
              <SessionParallax title="Family Photos" handleSessionInView={handleNewSessionInView} />
            </div>
          </div>
        </div>
      </section> */}
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
              {/* horizontal line */}
              {/* <img src={foralEnd} style={{ position: 'absolute', top: 0, left: 0, height: '3rem', transform: 'rotate(-90deg)' }} alt='floral' /> */}

              {/* <img src={foralEnd} style={{ position: 'absolute', top: 0, right: 0, height: '3rem', transform: 'rotate(90deg)' }} alt='floral' /> */}
              {/* <img src={foralEnd} style={{ position: 'absolute', top: '.57rem', right: '91%', height: '3rem', transform: 'rotate(-90deg)' }} alt='floral' />
              <div
                className='timeline'
                style={{ height: 0, width: '84%', borderTop: '.125rem solid', position: 'absolute', top: '2rem', left: '8%' }}

              />
              <img src={foralEnd} style={{ position: 'absolute', top: '.57rem', left: '91%', height: '3rem', transform: 'rotate(90deg)' }} alt='floral' /> */}
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
                        className="card"
                        whileHover={{ scale: 1.1 }}
                        style={{ originY: 0, position: 'relative' }}
                      >
                        <div className="card-image" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                          {/* <Img fluid={{ ...item.image.childImageSharp.fluid, aspectRatio: 16 / 9 }} /> */}
                          <PreviewCompatibleImage imageInfo={item.image} borderRadius={0} aspectRatio={4 / 3} />
                        </div>
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: '100%', position: 'absolute', width: '100%', top: 0 }}>
                          <h3
                            className='subtitle is-2 is-family-secondary has-text-white p-2'
                            style={{
                              position: 'absolute',
                              bottom: '10%',
                              left: '10%',
                              // backgroundColor: 'rgba(0,0,0,0.4)'
                              // transform: 'translate(-50%, -50%)',
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
              <div
                className='timeline'
                style={{ height: '.125rem', width: '80.15%', margin: 'auto' }}

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
        # title
        # heading
        # subheading
        # mainpitch {
        #   title
        #   description
        # }
        # description
        timelineImages {
          text
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid
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
