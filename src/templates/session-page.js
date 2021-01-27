import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
// import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
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
// import ScrollLock from 'react-scrolllock'
import BackgroundImage from 'gatsby-background-image'
import { Link as AnchorLink, Element } from 'react-scroll'
import { SlideX } from '../components/Animations'

import HTMLBlock from '../components/Transform'

const TestimonialBlock = ({ image, text, author }) =>
{
  const [offset, setOffset] = useState(0)

  const [featuredTestimonialRef, featuredTestimonialInView] = useInView({ threshold: 0, triggerOnce: true })

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
          <div className="columns" ref={featuredTestimonialRef}>
            <motion.div
              className="column is-6 is-offset-3 has-text-white is-size-5 is-invisible-touch"
              whileHover={{ opacity: 0 }}
            >
              <SlideX

                style={{ backgroundColor: 'rgba(0,0,0,0.5)', userSelect: 'none' }}
                className="p-3"
                amount={0}
                animateCondition={featuredTestimonialInView}
              >
                <p className="is-italic ">"{text}"</p>
                <p className="has-text-centered">{author}</p>
              </SlideX>
            </motion.div>


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
  howItWorks,

  // helmet,
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
      {/* <div className="navbar" style={{ position: 'sticky', top: 0, zIndex: 4, backgroundColor: 'white' }}>
        <div className="navbar-menu is-active">
          <div className="navbar-start" style={{ marginLeft: 'auto' }}>
            <div className="navbar-item">
              <AnchorLink activeClass="activeAnchor" to="howItWorks" spy={true} smooth={true}>How It Works</AnchorLink>
            </div>
            <div className="navbar-item">
              <AnchorLink activeClass="activeAnchor" to="pricing" spy={true} smooth={true}>Pricing</AnchorLink>
            </div>
            <div className="navbar-item">
              <AnchorLink activeClass="activeAnchor" to="faqs" spy={true} smooth={true}>FAQs</AnchorLink>
            </div>
            <div className="navbar-item">
              <Link to={`/galleries/${kebabCase(title)}`}>Gallery</Link>
            </div>
          </div>
        </div>
      </div> */}
      <div className="" style={{ position: 'sticky', top: 0, zIndex: 4, backgroundColor: 'white' }}>
        <div className="columns is-centered is-multiline is-mobile py-2 m-0" style={{ width: '100%' }}>
          {/* <div className="column is-hidden-mobile" /> */}
          <div className="column is-narrow is-half-mobile has-text-centered">
            <AnchorLink activeClass="activeAnchor" to="howItWorks" spy={true} smooth={true}>
              How It Works
            </AnchorLink>
          </div>
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
          <div className="column is-narrow is-half-mobile has-text-centered">

            <Link to={`/galleries/${kebabCase(title)}`}>Gallery</Link>

          </div>
          {/* <div className="column is-hidden-mobile" /> */}
        </div>
      </div>

      <section className="section" style={{ perspective: '2px' }}>
        {/* {helmet || ''} */}
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
      <TestimonialBlock
        text={featuredTestimonial.quote}
        author={featuredTestimonial.author + " - " + featuredTestimonial.location}
        image={featuredTestimonial.image.childImageSharp.fluid}
      />
      {/* How it works */}
      <Element name="howItWorks" >
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
      </Element>
      {/* Pricing */}
      <Element name="pricing" className="section is-medium" >
        <div className="container content overflow-x-hidden" ref={pricingRef}>
          <SlideX animateCondition={pricingInView} amount={200}>
            <Subtitle >Pricing</Subtitle>
          </SlideX>

          {pricings.map(pricing => (
            <React.Fragment key={v4()}>
              <HTMLBlock content={pricing.description} />
              {/* {pricing.description.split("\n").map(item => <p key={item}>{item}</p>)} */}
              <motion.div
                className="columns"
                variants={pricingVariants}
                initial="hidden"
                animate="visible"
              >
                {pricing.tables.map((item, index) => (
                  <motion.div
                    className={`column is-one-third ${pricing.tables.length === 1 && "is-offset-4"}`}
                    key={item.title}
                    variants={pricingBlockVariants}
                  >
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
                        {item.features &&
                          <>
                            <hr />
                            {item.features.map(feature => (
                              <p key={feature}><FaCheck /> {feature}</p>
                            ))}
                            <hr />
                          </>
                        }
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              {!!pricing.afterDescription && <HTMLBlock content={pricing.afterDescription} />}
            </React.Fragment>
          ))}
        </div>
      </Element>
      <div className="hero has-background-light">
        <div className="hero-body has-text-centered">
          <p className="is-size-4 pb-3">Let's chat about your photoshoot.</p>
          <Link to="/contact"><button className="button is-primary">Contact me</button></Link>
        </div>
      </div>
      {/* FAQs */}
      <Element name="faqs">
        <div className="section content is-medium has-background-white-ter overflow-x-hidden" ref={faqsRef}>
          <SlideX animateCondition={faqsInView} amount={200}>
            <Subtitle >FAQs</Subtitle>
          </SlideX>
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <Accordian data={faqs} />
            </div>
          </div>
        </div>
      </Element>
      {/* Testimonials */}
      {testimonials.length > 1 &&
        <Element name="testimonials">
          <div className="section container is-medium overflow-x-hidden" ref={testimonialsRef}>
            <SlideX animateCondition={testimonialsInView} amount={200}>
              <Subtitle >Testimonials</Subtitle>
            </SlideX>
            <div className="columns is-multiline">
              {testimonials.filter(x => x.featured !== true).map(testimonial => (
                <div className="column is-half-tablet" key={v4()}>
                  <TestimonialCard testimonial={testimonial} alt={true} />
                </div>
              ))}
            </div>
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
