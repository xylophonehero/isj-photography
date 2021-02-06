import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
// import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
// import Img from 'gatsby-image'
import { v4 } from 'uuid'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { Subtitle } from '../components/Styled'
import Accordian from '../components/Accordian'
import TestimonialCard from '../components/TestimonialCard'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FaCheck } from 'react-icons/fa'
import { IconContext } from 'react-icons'
// import ScrollLock from 'react-scrolllock'
import BackgroundImage from 'gatsby-background-image'
import { Link as AnchorLink, Element } from 'react-scroll'
import { SlideX } from '../components/Animations'
import Gallery from '../components/Gallery'

import HTMLBlock from '../components/Transform'
import Banner from '../components/Banner'
import useWindowDimensions from '../hooks/useWindowDimensions'

const TestimonialBlock = ({ image, text, author }) =>
{
  const [offset, setOffset] = useState(0)

  const [featuredTestimonialRef, featuredTestimonialInView] = useInView({ threshold: 0, triggerOnce: true })

  const { width } = useWindowDimensions()

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
    <>
      { width > 768 ?
        <div className="hero is-large">
          <BackgroundImage
            fluid={image}
            style={{ backgroundPosition: `center ${60 - offset / 20}%` }}
          >
            <div className="hero-body" style={{ height: '100%' }}>
              <div className="columns" ref={featuredTestimonialRef}>
                {!!text ? <motion.div
                  className="column is-6 is-offset-3 has-text-white is-size-5 is-invisible-touch has-background-black-opacity"
                  whileHover={{ opacity: 0 }}
                >
                  <SlideX

                    style={{ userSelect: 'none' }}
                    className="p-3"
                    amount={0}
                    animateCondition={featuredTestimonialInView}
                  >
                    <p className="is-italic ">"{text}"</p>
                    <p className="has-text-centered">{author}</p>
                  </SlideX>
                </motion.div> :
                  <div style={{ height: '100%' }} />
                }


              </div>
            </div>
          </BackgroundImage>
        </div>
        :
        <BackgroundImage
          fluid={image}
        >
          <div style={{ width: '100vw', height: '50vh' }}>
            {/* <BackgroundImage
              fluid={image}
              style={{ backgroundPosition: `center ${60 - offset / 20}%` }}
            >
              <div className="hero-body" style={{ height: '100%' }}>
                <div />
              </div> 
            </BackgroundImage>*/}
            {/* <Img fluid={image} /> */}
          </div>
        </BackgroundImage>
      }
    </>
  )
}

export const SessionPageTemplate = ({
  content,
  contentComponent,
  title,
  gallery,
  pricing,
  testimonials,
  faqs,
  howItWorks,
  helmet,
}) =>
{

  const PostContent = contentComponent || Content

  const featuredTestimonial = testimonials.find(x => x.featured)

  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0, triggerOnce: true })
  const [pricingRef, pricingInView] = useInView({ threshold: 0, triggerOnce: true })
  const [faqsRef, faqsInView] = useInView({ threshold: 0, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0, triggerOnce: true })

  const pricingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.4
      }
    }
  }
  const pricingBlockVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <>
      {helmet || ''}
      <div className="" style={{ position: 'sticky', top: 0, zIndex: 4, backgroundColor: '#F2ECE7' }}>
        <div className="columns is-centered is-multiline is-mobile py-2 m-0" style={{ width: '100%' }}>
          {/* <div className="column is-hidden-mobile" /> */}
          {!!howItWorks && <div className="column is-narrow is-half-mobile has-text-centered">
            <AnchorLink activeClass="activeAnchor" to="howItWorks" spy={true} smooth={true}>
              How It Works
            </AnchorLink>
          </div>}
          <div className="column is-narrow is-half-mobile has-text-centered">
            <AnchorLink activeClass="activeAnchor" to="pricing" spy={true} smooth={true}>
              Pricing
            </AnchorLink>
          </div>
          <div className="column is-narrow is-half-mobile has-text-centered">
            <AnchorLink activeClass="activeAnchor" to="faqs" spy={true} smooth={true}>
              FAQs
            </AnchorLink>
          </div>
          {/* {testimonials.length > 1 && <div className="column is-narrow is-half-mobile has-text-centered">
            <AnchorLink activeClass="activeAnchor" to="testimonials" spy={true} smooth={true}>
              Testimonials
            </AnchorLink>
          </div>} */}
          {title !== "Mini Session" &&
            <div className="column is-narrow is-half-mobile has-text-centered">


              {(title === "Headshots" || title === "Prom Package") ?
                <AnchorLink activeClass="activeAnchor" to="gallery" spy={true} smooth={true}>
                  FAQs
            </AnchorLink>
                :
                <Link to={`/galleries/${kebabCase(title)}`}>Gallery</Link>
              }

            </div>}
          {/* <div className="column is-hidden-mobile" /> */}
        </div>
      </div>

      <section className="section" style={{ perspective: '2px' }}>
        <div className="container content">
          {/* Intro */}
          <div className="columns">
            <div className="column is-6 is-offset-3">

              <h1 className="title is-size-1 has-text-weight-bold has-text-centered is-family-secondary"
              // style={{ position: 'sticky', top: '1rem', zIndex: 3 }}
              >
                {title}
              </h1>
              <hr />
              <PostContent content={content} className="has-text-centered is-size-5" />

            </div>
          </div>
        </div>
      </section>
      {/* Testimonial */}
      {!!featuredTestimonial ? <TestimonialBlock
        text={featuredTestimonial.quote}
        author={featuredTestimonial.author + " - " + featuredTestimonial.location}
        image={featuredTestimonial.image.childImageSharp.fluid}
      /> :
        <TestimonialBlock
          text={""}
          author={""}
          image={gallery[3].photo.childImageSharp.fluid}
        />}
      {/* How it works */}
      {!!howItWorks && <Element name="howItWorks" >
        <div className="section is-medium has-background-white-ter" ref={howItWorksRef}>
          <div className="container content overflow-x-hidden">
            <SlideX animateCondition={howItWorksInView} amount={200}>
              <Subtitle>How it works</Subtitle>
            </SlideX>
            <SlideX animateCondition={howItWorksInView} amount={0}>
              <HTMLBlock content={howItWorks} />
            </SlideX>

          </div>
        </div>
      </Element>}
      {/* Pricing */}
      <Element name="pricing" className="section is-medium" >
        <div className="container content overflow-x-hidden" ref={pricingRef}>
          <SlideX animateCondition={pricingInView} amount={200}>
            <Subtitle >Pricing</Subtitle>
          </SlideX>
          <SlideX animateCondition={pricingInView} amount={0}>
            <HTMLBlock content={pricing.description} />
          </SlideX>

          <motion.div
            className="columns is-centered"
            variants={pricingVariants}
            initial="hidden"
            animate={pricingInView ? "visible" : "hidden"}
          >
            {pricing.tables.map((item, index) => (
              <motion.div
                className={`column is-one-third`}
                key={item.title}
                variants={pricingBlockVariants}
              >
                <div className={`card has-background-white-ter ${index > 0 && "mt-3"}`}>
                  <header className="card-header">
                    <p className="card-header-title has-text-weight-semibold is-size-3">
                      {item.title}
                    </p>
                  </header>
                  <div className="card-image">
                    <PreviewCompatibleImage imageInfo={gallery[index].photo} borderRadius={0} aspectRatio={16 / 9} style={{ objectPosition: 'center 20%' }} />
                  </div>
                  <div className="card-content content">
                    <p className={`is-size-3 has-text-centered ${index === 0 ? "has-text-primary has-text-weight-bold" : "has-text-weight-semibold"}`}>
                      {Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, }).format(item.price)}
                    </p>
                    {item.features &&
                      <>
                        <hr className="has-background-grey-lighter" />
                        <ul style={{ listStyleType: 'none', marginLeft: '0rem' }}>
                          {item.features.map(feature => (
                            <li key={feature} >
                              <IconContext.Provider value={{ size: '1rem', className: "mr-2" }}>

                                <FaCheck />

                              </IconContext.Provider>
                              {/* <span className="icon">
                                <i style={{ height: '1rem', width: '1rem' }}><FaCheck /></i>
                              </span> */}
                              <span>{feature}</span>
                            </li>

                          ))}
                        </ul>
                        <hr className="has-background-grey-lighter" />
                      </>
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* {!!pricing.afterDescription && <HTMLBlock content={pricing.afterDescription} />} */}
        </div>
      </Element>
      <Banner backgroundColor="light" />
      {/* Gallery */}
      {(title === "Headshots" || title === "Prom Package") &&
        <Element name="gallery">
          <section className="section">
            <div className="container content">
              {/* <SlideX animateCondition={faqsInView} amount={200}> */}
              <Subtitle >Gallery</Subtitle>
              {/* </SlideX> */}
              <div className="is-hidden-touch">
                <Gallery gallery={gallery} desktop={"one-third"} objectPosition="20%" />
              </div>
              <div className="is-hidden-desktop">
                <Gallery gallery={gallery} mobile={"half"} aspectRatio={1} objectPosition="20%" />
              </div>
            </div>
          </section>
        </Element>}
      {/* FAQs */}
      <Element name="faqs">
        <div className="section is-medium has-background-white-ter overflow-x-hidden" ref={faqsRef}>
          <div className="container content">
            <SlideX animateCondition={faqsInView} amount={200}>
              <Subtitle >FAQs</Subtitle>
            </SlideX>
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <SlideX animateCondition={faqsInView} amount={0}>
                  <Accordian data={faqs} />
                </SlideX>
              </div>
            </div>
          </div>
        </div>
      </Element>
      {/* Testimonials */}
      {testimonials.length > 1 &&
        <Element name="testimonials">
          <div className="section is-medium overflow-x-hidden" ref={testimonialsRef}>
            <div className="content container">
              <SlideX animateCondition={testimonialsInView} amount={200}>
                <Subtitle >Testimonials</Subtitle>
              </SlideX>
            </div>
            <motion.div
              className="columns is-multiline"
              variants={pricingVariants}
              animate={testimonialsInView ? "visible" : "hidden"}
              initial="hidden"
            >
              {testimonials.filter(x => x.featured !== true).map(testimonial => (
                <motion.div variants={pricingBlockVariants} className="column is-half-tablet" key={v4()}>
                  <TestimonialCard testimonial={testimonial} alt={true} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Element>}
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
        helmet={<Helmet
          titleTemplate="%s Sessions">
          <title>{`${post.frontmatter.title}`}</title>
          <meta
            name="description"
            content={`${post.html || post.frontmatter.howItWorks}`}
          ></meta>
        </Helmet>}
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
        pricing {
          description
          tables{
            title
            price
            features
          }
          # afterDescription
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
