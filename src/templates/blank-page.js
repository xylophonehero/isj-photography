import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
// import MovingImages from '../components/MovingImages'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'


const AnimatedPicture = ({ delay }) =>
{
  const newVarients = {
    // hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      transition: {
        duration: 7,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 9
      }
    }
  }

  return (
    <motion.div
      className='has-background-primary mb-5'
      style={{ width: '100%', height: '150px' }}
      // initial="hidden"
      animate="visible"
      variants={newVarients}
    >

    </motion.div>
  )
}


export const BlankPageTemplate = ({ title, content, contentComponent }) =>
{
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

  const galleryImages = []
  for (var i = 0; i < 30; i++)
  {
    galleryImages[i] = i;
  }

  // const variants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { duration: 4 }
  //   },
  // }

  const PageContent = contentComponent || Content

  const [galleryRef, galleryInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  // useEffect(() =>
  // {
  //   galleryControls.start({ opacity: 1 })
  // }, [galleryInView, galleryControls])

  return (
    <section className="section section--gradient">
      <div className="container is-fullhd">
        <div className="columns">
          <div className='column is-2' >
            <div className='movingimagewrapper' >
              <AnimatedPicture delay={0} />
              <AnimatedPicture delay={8} />
              <AnimatedPicture delay={4} />
              <AnimatedPicture delay={12} />
            </div>

          </div>
          <div className="column is-8">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light has-text-centered">
                {title}
              </h2>
              <PageContent className="content" content={content} />
              <div style={{ height: '100vh' }} />
            </div>
          </div>
          <div className='column is-2'>
            <div className='movingimagewrapper'>
              <AnimatedPicture delay={14} />
              <AnimatedPicture delay={2} />
              <AnimatedPicture delay={10} />
              <AnimatedPicture delay={6} />
            </div>
          </div>
        </div>


        <motion.div
          ref={galleryRef}
          animate={galleryInView ? 'visible' : ''}
          variants={galleryVariants}
          initial='hidden'
        >
          <h3 className='title is-size-2 has-text-weight-bold has-text-centered is-family-secondary'>Gallery</h3>
          <div className='columns is-multiline'>
            {galleryImages.map(item => (
              <div key={item} className='column is-one-quarter-desktop is-half-tablet'>
                <motion.div variants={galleryItemVariants} className='has-background-primary' style={{ width: '100%', height: '200px' }}></motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const BlankPage = ({ data }) =>
{
  const { markdownRemark: post } = data

  return (
    <Layout>
      {/* <MovingImages /> */}
      <BlankPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

BlankPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BlankPage

export const BlankPageQuery = graphql`
  query BlankPage($id: String!){
    markdownRemark(id: {eq: $id}){
      html
      frontmatter {
        title
      }
    }
  }
`