import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import PreviewCompatibleImage from './PreviewCompatibleImage'
import { useInView } from 'react-intersection-observer'
import { motion, } from 'framer-motion'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'

const SessionParallax = ({ images, title, description, handleSessionInView }) =>
{


  const [sessionRef, sessionInView] = useInView({
    threshold: 0.5
  })

  useEffect(() =>
  {
    if (sessionInView)
    {
      handleSessionInView(title)
    }

  }, [sessionInView, title, handleSessionInView])


  const variants = {
    inView: {
      opacity: 1,
      transition: {
        duration: 1,
      }
    },
    notInView: {
      opacity: 0,
      transition: {
        duration: 1
      }
    }
  }

  const imageVariants = {
    notInView: i => ({
      y: i * 50,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0
      }
    }),
    inView: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  }

  return (
    <div id={kebabCase(title)} ref={sessionRef} style={{ height: '100vh', paddingTop: '5rem' }}>
      <motion.div
        variants={variants}
        className="content"
        style={{ position: 'relative' }}
        animate={sessionInView ? "inView" : "notInView"}
      >
        <motion.div
          custom={-1}
          variants={imageVariants}
          animate={sessionInView ? "inView" : "notInView"}
          style={{ backgroundColor: 'red', width: '50%', height: '100px', zIndex: 1, position: 'absolute' }}
        />
        <motion.div
          custom={1}
          variants={imageVariants}
          animate={sessionInView ? "inView" : "notInView"}
          style={{ backgroundColor: 'red', width: '50%', height: '100px', zIndex: 1, position: 'absolute', bottom: 0, right: 0 }}
        />
        <div className="section">
          <div className="container has-background-light py-6 px-2" style={{ minWidth: '200px' }}>
            <h2 className="title has-text-centered is-family-secondary mt-4">{title}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, atque minus. Mollitia doloremque esse doloribus obcaecati labore sunt sapiente cum unde eveniet veritatis.</p>
            <Link to="/">See more</Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

SessionParallax.propTypes = {
  image: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  handleSessionInView: PropTypes.func
}

export default SessionParallax