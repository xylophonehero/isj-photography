import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import { motion } from 'framer-motion'
import Content, { HTMLContent } from '../components/Content'
import BackgroundImage from 'gatsby-background-image'

// import SessionParallax from '../components/SessionParallax'
// import VerticalTimeline from '../components/VerticalTimeline'
// import useWindowSize from '../components/windowSize'
// import scrollTo from 'gatsby-plugin-smoothscroll'

import Layout from '../components/Layout'
// import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Img from 'gatsby-image'
import foralEnd from '../img/floral-end.svg'
import logo from '../img/isjlogo.svg'

// import FitText from '@kennethormandy/react-fittext'


export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  timelineImages,
  ieashiaPhoto,
  content,
  contentComponent
}) =>
{
  const PageContent = contentComponent || Content

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
      <div className="is-hidden-desktop">
        {timelineImages.map((item, index) => (
          <Link key={item.text} to={`/sessions/${kebabCase(item.text)}`}>
            <BackgroundImage
              key={item.text}
              className="hero mt-1"
              style={{ minHeight: '20vh' }}
              fluid={item.image.childImageSharp.fluid}
              // eslint-disable-next-line
              style={{ backgroundPosition: index === 1 ? '0% 20%' : 'center' }}
            >
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                <div className="hero-body">
                  <h2 className="is-family-secondary is-size-2 has-text-light p-3">{item.text}</h2>
                </div>
              </div>
            </BackgroundImage>
          </Link>
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
      <div className="is-hidden-touch">
        <div className="hero linear-gradiant-light">
          <div className="hero-body">
            <div className="is-flex is-justify-content-center"><img src={logo} alt="ISJ Photography" /></div>
            <h2 className="is-size-1 has-text-weight-semibold has-text-centered has-text-primary my-4 is-family-secondary">
              Creating Visual Heirlooms
              </h2>

            <motion.div style={{
              position: 'relative',
              display: 'flex'
            }}
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              {/* horizontal line */}
              <img src={foralEnd} style={{ position: 'absolute', top: '.57rem', right: '91%', height: '3rem', transform: 'rotate(-90deg)' }} alt='floral' />
              <div
                className='timeline'
                style={{ height: 0, width: '84%', borderTop: '.125rem solid', position: 'absolute', top: '2rem', left: '8%' }}

              />
              <img src={foralEnd} style={{ position: 'absolute', top: '.57rem', left: '91%', height: '3rem', transform: 'rotate(90deg)' }} alt='floral' />
              {timelineImages.map(item => (
                <motion.div
                  variants={itemVariants}
                  key={item.text}
                  style={{
                    width: '17%',
                    margin: '1rem',
                    marginTop: '2rem'
                  }}>
                  {/* vertical lines */}
                  <div className='timeline' style={{ height: '2rem', width: 0, borderLeft: '.125rem solid', margin: '0 auto' }} />
                  <Link to={`/sessions/${kebabCase(item.text)}`}>
                    <motion.div
                      className="card"
                      whileHover={{ scale: 1.2 }}
                      style={{ originY: 0 }}
                    >
                      <div className="card-image">
                        <Img fluid={{ ...item.image.childImageSharp.fluid, aspectRatio: 16 / 9 }} />
                        {/* <PreviewCompatibleImage imageInfo={{ image: item.image }} borderRadius={0} /> */}
                      </div>
                      <div className="card-header">

                        <h3
                          className='card-header-title is-centered subtitle is-3 is-family-secondary has-text-weight-semibold p-2'
                          style={{ fontSize: '1.8vw' }}
                        >
                          {item.text}
                        </h3>

                      </div>
                    </motion.div>
                  </Link>

                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <section className="section pt-0">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="columns">
                    <div className="column is-4">
                      <PreviewCompatibleImage imageInfo={ieashiaPhoto} style={{ height: '100%' }} />
                    </div>
                    <div className="column is-8">
                      <PageContent className="content" content={content} />
                      <p className="is-family-secondary is-size-2">Ieashia</p>
                    </div>
                  </div>

                  <div style={{ height: '100vh' }} />


                  {/* <div className="tile">
                      <h1 className="title">{mainpitch.title}</h1>
                    </div>
                    <div className="tile">
                      <h3 className="subtitle">{mainpitch.description}</h3>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-12">
                      <h3 className="has-text-weight-semibold is-size-2">
                        {heading}
                      </h3>
                      <p>{description}</p>
                    </div>
                  </div>
                  <Features gridItems={intro.blurbs} />
                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/products">
                        See all products
                    </Link>
                    </div>
                  </div>
                  <div className="column is-12">*/}
                  <h3 className="has-text-weight-semibold is-size-2 has-text-centered is-family-secondary">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>

                </div>
              </div>
            </div>
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
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        timelineImages={frontmatter.timelineImages}
        ieashiaPhoto={frontmatter.ieashiaPhoto}
        contentComponent={HTMLContent}
        content={html}
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
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        # intro {
        #   blurbs {
        #     image {
        #       childImageSharp {
        #         fluid(maxWidth: 240, quality: 64) {
        #           ...GatsbyImageSharpFluid
        #         }
        #       }
        #     }
        #     text
        #   }
        #   heading
        #   description
        # }
        timelineImages {
          text
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
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
  }
`
